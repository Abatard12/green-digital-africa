import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { promises as fs } from "fs";
import path from "path";
import { runVeille } from "./pipeline";
import { DIRS, loadState, saveState, slug } from "./store";

@Injectable()
export class VeilleService {
  private readonly logger = new Logger("Veille");
  private running = false;

  // Exécution automatique chaque jour à 7h et 17h (modifiez l'expression si besoin)
  @Cron("0 7,17 * * *")
  async scheduled() {
    await this.run();
  }

  async run(): Promise<string[]> {
    if (this.running) return ["Exécution déjà en cours"];
    this.running = true;
    try {
      const log = await runVeille();
      log.forEach((l) => this.logger.log(l));
      return log;
    } catch (e) {
      this.logger.error((e as Error).message);
      throw e;
    } finally {
      this.running = false;
    }
  }

  async rename(from: string, to: string) {
    const name = slug(to.replace(/\.md$/, "")) + ".md";
    await fs.rename(path.join(DIRS.resumes, path.basename(from)), path.join(DIRS.resumes, name));
    const s = await loadState();
    s.items.forEach((i) => { if (i.summaryFile === path.basename(from)) i.summaryFile = name; });
    await saveState(s);
    return name;
  }
}
