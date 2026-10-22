import { BadRequestException, Body, Controller, Post } from "@nestjs/common";

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const phonePattern = /^\+?[0-9\s().-]{6,20}$/;

@Controller("contact")
export class ContactController {
  @Post()
  submit(@Body() body: ContactPayload) {
       const { firstName, lastName, email, phone, message } = body ?? {};

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
      throw new BadRequestException("Tous les champs sont obligatoires.");
    }

    if (!phonePattern.test(phone.trim())) {
      throw new BadRequestException("Numéro de téléphone invalide.");
    }

    // Pour l'instant, le site Next.js gère l'envoi réel via Resend
    // (app/api/contact/route.ts). Cet endpoint existe pour qu'on
    // puisse, plus tard, centraliser cette logique ici et faire
    // pointer le site vers cette API à la place.
    console.log("Nouveau message de contact reçu :", { firstName, lastName, email, message });

    return { success: true };
  }
}
