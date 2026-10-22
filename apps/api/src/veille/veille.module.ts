import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { VeilleController } from "./veille.controller";
import { VeilleService } from "./veille.service";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [VeilleController],
  providers: [VeilleService],
})
export class VeilleModule {}
