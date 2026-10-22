import { Controller, Get, Param } from "@nestjs/common";
import { ActualitesService } from "./actualites.service";

@Controller("actualites")
export class ActualitesController {
  constructor(private readonly actualitesService: ActualitesService) {}

  @Get()
  findAll() {
    return this.actualitesService.findAll();
  }

  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.actualitesService.findOne(slug);
  }
}
