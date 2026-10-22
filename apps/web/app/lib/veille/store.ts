import { promises as fs } from "fs";
import path from "path";

export const ROOT = path.resolve(process.env.STORAGE_ROOT || "./storage");
export const DIRS = {
  inbox: path.join(ROOT, "telechargements"),
  depot: path.join(ROOT, "depot"),
  afgd: path.join(ROOT, "journaux-afgd"),
  resumes: path.join(ROOT, "resumes"),
};

export type Item = {
  id: string; title: string; file: string; url: string;
  depositedAt: string; matched: boolean;
  summaryFile?: string; warned?: boolean; deleted?: boolean;
};
export type State = { items: Item[] };

const STATE = path.join(ROOT, "state.json");

export async function init() {
  for (const d of Object.values(DIRS)) await fs.mkdir(d, { recursive: true });
}
export async function loadState(): Promise<State> {
  try { return JSON.parse(await fs.readFile(STATE, "utf8")); } catch { return { items: [] }; }
}
export async function saveState(s: State) {
  await fs.writeFile(STATE, JSON.stringify(s, null, 2));
}
export const slug = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "journal";