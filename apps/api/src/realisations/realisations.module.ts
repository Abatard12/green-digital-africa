import { Module } from "@nestjs/common";
import { RealisationsController } from "./realisations.controller";
import { RealisationsService } from "./realisations.service";

@Module({
  controllers: [RealisationsController],
  providers: [RealisationsService],
})
export class RealisationsModule {}
