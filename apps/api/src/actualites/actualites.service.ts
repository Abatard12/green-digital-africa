import { Injectable, NotFoundException } from "@nestjs/common";
import { actualites } from "./actualites.data";

@Injectable()
export class ActualitesService {
  findAll() {
    return actualites;
  }

  findOne(slug: string) {
    const found = actualites.find((a) => a.slug === slug);
    if (!found) {
      throw new NotFoundException(`Actualité "${slug}" introuvable.`);
    }
    return found;
  }
}
