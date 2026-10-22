"use server";

import { Resend } from "resend";
import { resources } from "../lib/resources";

const resend = new Resend(process.env.RESEND_API_KEY);

type SubscribeResult = { ok: true } | { ok: false; error: string };

export async function subscribeAndSend(formData: FormData): Promise<SubscribeResult> {
  const email = formData.get("email");
  const slug = formData.get("slug");

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "invalid_email" };
  }
  if (typeof slug !== "string") {
    return { ok: false, error: "invalid_resource" };
  }

  const resource = resources.find((r) => r.slug === slug);
  if (!resource) {
    return { ok: false, error: "not_found" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const downloadUrl = `${siteUrl}${resource.file}`;

  try {
    await resend.emails.send({
      from: "Green Digital Africa <onboarding@resend.dev>",
      to: email,
      subject: `Votre document : ${resource.title.fr}`,
      html: `
        <p>Bonjour,</p>
        <p>Voici le document demandé :</p>
        <p><a href="${downloadUrl}">${resource.title.fr}</a></p>
      `,
    });

    await resend.emails.send({
      from: "Green Digital Africa <onboarding@resend.dev>",
      to: "lawsonruben18@gmail.com",
      subject: `Nouvelle demande : ${resource.title.fr}`,
      html: `<p>${email} a demandé « ${resource.title.fr} ».</p>`,
    });

    return { ok: true };
  } catch {
    return { ok: false, error: "send_failed" };
  }
}