import { BadRequestException, Body, Controller, Get, Headers, NotFoundException, Patch, UnauthorizedException } from "@nestjs/common";
import { VeilleService } from "./veille.service";

@Controller("veille")
export class VeilleController {
  constructor(private readonly veille: VeilleService) {}

  private check(auth?: string) {
    if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`)
      throw new UnauthorizedException();
  }

  // Déclenchement manuel : GET /veille/run  (Authorization: Bearer <CRON_SECRET>)
  @Get("run")
  async run(@Headers("authorization") auth?: string) {
    this.check(auth);
    return { log: await this.veille.run() };
  }

  // Renommer un résumé : PATCH /veille/rename  { "from": "ancien.md", "to": "nouveau nom" }
  @Patch("rename")
  async rename(@Headers("authorization") auth: string | undefined, @Body() body: { from?: string; to?: string }) {
    this.check(auth);
    if (!body?.from || !body?.to) throw new BadRequestException("from et to requis");
    try { return { renamed: await this.veille.rename(body.from, body.to) }; }
    catch { throw new NotFoundException("Résumé introuvable"); }
  }
}
