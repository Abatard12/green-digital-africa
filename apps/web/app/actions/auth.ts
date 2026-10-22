"use server";

import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

type SignupResult = { ok: true } | { ok: false; error: string };

export async function signup(formData: FormData): Promise<SignupResult> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof name !== "string" || name.trim().length < 2) {
    return { ok: false, error: "invalid_name" };
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "invalid_email" };
  }
  if (typeof password !== "string" || password.length < 8) {
    return { ok: false, error: "weak_password" };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "email_taken" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, passwordHash },
  });

  return { ok: true };
}