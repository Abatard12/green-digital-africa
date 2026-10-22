import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s().-]{6,20}$/;

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { firstName, lastName, email, phone, message } = body;

  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !phone?.trim() ||
    !message?.trim()
  ) {
    return NextResponse.json({ error: "Tous les champs sont obligatoires." }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  if (!phonePattern.test(phone.trim())) {
    return NextResponse.json({ error: "Numéro de téléphone invalide." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Green Digital Africa <onboarding@resend.dev>", // à remplacer par ton domaine vérifié
      to: process.env.CONTACT_EMAIL_TO ?? "contact@greendigital.africa",
      replyTo: email,
      subject: `Nouveau message de ${firstName} ${lastName}`,
      text: `Nom : ${firstName} ${lastName}\nEmail : ${email}\nTéléphone : ${phone}\n\nMessage :\n${message}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Erreur d'envoi d'email :", err);
    return NextResponse.json({ error: "Échec de l'envoi, réessayez plus tard." }, { status: 500 });
  }
}