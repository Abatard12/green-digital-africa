import { Controller, Get, Param } from "@nestjs/common";
import { RealisationsService } from "./realisations.service";

@Controller("realisations")
export class RealisationsController {
  constructor(private readonly realisationsService: RealisationsService) {}

  @Get()
  findAll() {
    return this.realisationsService.findAll();
  }

  @Get(":slug")
  findOne(@Param("slug") slug: string) {
    return this.realisationsService.findOne(slug);
  }
}
