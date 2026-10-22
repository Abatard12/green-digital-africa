import { VeilleModule } from "./veille/veille.module";
import { Module } from "@nestjs/common";
import { RealisationsModule } from "./realisations/realisations.module";
import { ActualitesModule } from "./actualites/actualites.module";
import { ContactModule } from "./contact/contact.module";


@Module({
  imports: [RealisationsModule, ActualitesModule, ContactModule, VeilleModule],
})
export class AppModule {}
