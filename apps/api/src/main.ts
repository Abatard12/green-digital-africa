import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Autorise le frontend Next.js (dev local) à appeler l'API.
  app.enableCors({
    origin: process.env.WEB_ORIGIN ?? "http://localhost:3000",
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`API NestJS démarrée sur http://localhost:${port}`);
}

bootstrap();