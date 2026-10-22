import Anthropic from "@anthropic-ai/sdk";

export const keywords = () =>
  ["AfGD", ...(process.env.AFGD_KEYWORDS || "").split(",")].map((k) => k.trim()).filter(Boolean);

export function matchesDomain(text: string) {
  const t = text.toLowerCase();
  return keywords().filter((k) => t.includes(k.toLowerCase()));
}

export async function summarize(title: string, text: string) {
  const client = new Anthropic();
  const r = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5",
    max_tokens: 1000,
    messages: [{
      role: "user",
      content: `Résume en français, en 8 à 10 lignes, l'article suivant pour un client de l'entreprise. ` +
        `Mets en avant ce qui concerne le domaine AfGD.\n\nTitre : ${title}\n\n${text.slice(0, 60000)}`,
    }],
  });
  return r.content.map((c) => (c.type === "text" ? c.text : "")).join("").trim();
}