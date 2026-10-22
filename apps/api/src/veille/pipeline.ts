import { promises as fs } from "fs";
import path from "path";
import { DIRS, init, loadState, saveState, slug, Item } from "./store";
import { detect, download, readText } from "./source";
import { matchesDomain, summarize } from "./summarize";
import { sendArticle, sendWarning } from "./mail";

const DAY = 86_400_000;
const RETENTION = Number(process.env.RETENTION_DAYS || 30);
const WARN_BEFORE = Number(process.env.WARN_DAYS_BEFORE || 3);
const deleteDate = (i: Item) => new Date(new Date(i.depositedAt).getTime() + RETENTION * DAY);

export async function runVeille() {
  await init();
  const state = await loadState();
  const log: string[] = [];

  // Détection des nouveaux journaux sur le site
  const found = await detect(process.env.SOURCE_URL!);
  for (const f of found.filter((x) => !state.items.some((i) => i.id === x.id))) {
    try {
      const file = await download(f);                  // téléchargement + dépôt (doublon)
      const text = await readText(file);               // lecture depuis le dossier de stockage
      const hits = matchesDomain(text);                // mots-clés AfGD
      const item: Item = { id: f.id, title: f.title, file, url: f.url, depositedAt: new Date().toISOString(), matched: hits.length > 0 };
      state.items.push(item);

      if (item.matched) {
        await fs.copyFile(path.join(DIRS.inbox, file), path.join(DIRS.afgd, file)); // stockage domaine
        const summary = await summarize(f.title, text);                              // résumé IA
        const summaryFile = `${slug(f.title)}.md`;
        const summaryPath = path.join(DIRS.resumes, summaryFile);
        await fs.writeFile(summaryPath, `# ${f.title}\n\n${summary}\n`);             // espace dédié
        item.summaryFile = summaryFile;
        await sendArticle({
          title: f.title, summary, summaryPath,
          articlePath: path.join(DIRS.inbox, file),
          deleteOn: deleteDate(item).toLocaleDateString("fr-FR"),
        });
        log.push(`Envoyé : ${f.title} (${hits.join(", ")})`);
      } else log.push(`Ignoré (hors domaine) : ${f.title}`);
    } catch (e) { log.push(`Erreur ${f.title} : ${(e as Error).message}`); }
    await saveState(state);
  }

  // Purge du dossier de dépôt 1 mois après dépôt, avec avertissement préalable
  const now = Date.now();
  for (const i of state.items.filter((x) => !x.deleted)) {
    const left = deleteDate(i).getTime() - now;
    if (left <= 0) {
      // Suppression dans TOUS les dossiers : téléchargement, dépôt, domaine AfGD, résumé
      for (const d of [DIRS.inbox, DIRS.depot, DIRS.afgd])
        await fs.rm(path.join(d, i.file), { force: true });
      if (i.summaryFile) await fs.rm(path.join(DIRS.resumes, i.summaryFile), { force: true });
      i.deleted = true; log.push(`Supprimé de tous les dossiers : ${i.title}`);
    } else if (left <= WARN_BEFORE * DAY && !i.warned) {
      await sendWarning(i.title, deleteDate(i).toLocaleDateString("fr-FR"));
      i.warned = true; log.push(`Avertissement : ${i.title}`);
    }
  }
  await saveState(state);
  return log;
}
