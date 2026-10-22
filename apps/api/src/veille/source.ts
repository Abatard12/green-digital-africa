import { promises as fs } from "fs";
import path from "path";
import { DIRS, slug } from "./store";

export type Found = { id: string; title: string; url: string };

// 1. Détection : flux RSS/Atom, sinon liens PDF d'une page.
// Adaptez cette fonction à la structure réelle de votre site si besoin.
async function detectStatic(sourceUrl: string): Promise<Found[]> {
  const res = await fetch(sourceUrl, { cache: "no-store" });
  if (!res.ok) throw new Error(`Source inaccessible (${res.status})`);
  const body = await res.text();
  const out: Found[] = [];

  if (/<rss|<feed/i.test(body)) {
    for (const m of body.matchAll(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi)) {
      const b = m[0];
      const title = (b.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "journal").replace(/<!\[CDATA\[|\]\]>/g, "").trim();
      const url =
        b.match(/<enclosure[^>]*url=["']([^"']+)/i)?.[1] ||
        b.match(/<link[^>]*href=["']([^"']+)/i)?.[1] ||
        b.match(/<link[^>]*>([^<]+)<\/link>/i)?.[1]?.trim();
      if (url) out.push({ id: url, title, url });
    }
  } else {
    for (const m of body.matchAll(/href=["']([^"']+\.pdf)["']/gi)) {
      const url = new URL(m[1], sourceUrl).toString();
      out.push({ id: url, title: decodeURIComponent(url.split("/").pop() || "journal"), url });
    }
  }
  return out;
}

// 2. Téléchargement dans le dossier dédié + 3. copie dans le dossier de dépôt
export async function download(f: Found) {
  const res = await fetch(f.url);
  if (!res.ok) throw new Error(`Téléchargement impossible (${res.status})`);
  const isPdf = /pdf/i.test(res.headers.get("content-type") || "") || /\.pdf($|\?)/i.test(f.url);
  const file = `${new Date().toISOString().slice(0, 10)}_${slug(f.title)}.${isPdf ? "pdf" : "html"}`;
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(path.join(DIRS.inbox, file), buf);
  await fs.copyFile(path.join(DIRS.inbox, file), path.join(DIRS.depot, file));
  return file;
}

// 4. Lecture du journal depuis le dossier de stockage
export async function readText(file: string): Promise<string> {
  const p = path.join(DIRS.inbox, file);
  if (file.endsWith(".pdf")) {
    // @ts-expect-error import direct pour éviter le mode debug de pdf-parse
    const pdf = (await import("pdf-parse/lib/pdf-parse.js")).default;
    return (await pdf(await fs.readFile(p))).text;
  }
  return (await fs.readFile(p, "utf8"))
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

// --- Sites dynamiques ---------------------------------------------------

// Mode "json" : l'API interne du site renvoie la liste des journaux.
// Réglages : JSON_LIST_PATH (ex. "data.items", vide si la réponse est un tableau),
// JSON_TITLE_FIELD (ex. "title"), JSON_URL_FIELD (ex. "fileUrl").
async function detectJson(sourceUrl: string): Promise<Found[]> {
  const res = await fetch(sourceUrl, { cache: "no-store", headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`API inaccessible (${res.status})`);
  let data: any = await res.json();
  for (const k of (process.env.JSON_LIST_PATH || "").split(".").filter(Boolean)) data = data?.[k];
  if (!Array.isArray(data)) throw new Error("JSON_LIST_PATH ne pointe pas vers un tableau");
  const tf = process.env.JSON_TITLE_FIELD || "title";
  const uf = process.env.JSON_URL_FIELD || "url";
  return data
    .filter((x) => x?.[uf])
    .map((x) => {
      const url = new URL(String(x[uf]), sourceUrl).toString();
      return { id: url, title: String(x[tf] || url.split("/").pop()), url };
    });
}

// Mode "browser" : Playwright affiche la page puis lit les liens.
// Réglage : LINK_SELECTOR (ex. "a.journal-link" ou "a[href$='.pdf']").
async function detectBrowser(sourceUrl: string): Promise<Found[]> {
  const modName = "playwright"; // chargé seulement en mode browser
  const { chromium } = (await import(modName)) as any;
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(sourceUrl, { waitUntil: "networkidle", timeout: 60000 });
    const sel = process.env.LINK_SELECTOR || "a[href$='.pdf']";
    await page.waitForSelector(sel, { timeout: 15000 }).catch(() => {});
    const links: { href: string; text: string }[] = await page.$$eval(sel, (as: any[]) =>
      as.map((a: any) => ({ href: a.href, text: (a.textContent || "").trim() })));
    return links.map((l) => ({ id: l.href, title: l.text || l.href.split("/").pop() || "journal", url: l.href }));
  } finally { await browser.close(); }
}

export async function detect(sourceUrl: string): Promise<Found[]> {
  const mode = process.env.SOURCE_MODE || "static";
  if (mode === "json") return detectJson(sourceUrl);
  if (mode === "browser") return detectBrowser(sourceUrl);
  return detectStatic(sourceUrl);
}
