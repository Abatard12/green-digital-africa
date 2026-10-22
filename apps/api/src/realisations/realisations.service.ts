import { Injectable, NotFoundException } from "@nestjs/common";
import { realisations } from "./realisations.data";

@Injectable()
export class RealisationsService {
  findAll() {
    return realisations;
  }

  findOne(slug: string) {
    const found = realisations.find((r) => r.slug === slug);
    if (!found) {
      throw new NotFoundException(`Réalisation "${slug}" introuvable.`);
    }
    return found;
  }
}
