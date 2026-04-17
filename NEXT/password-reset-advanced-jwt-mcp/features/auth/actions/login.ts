"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/validations/login";
import { prisma } from "@/lib/prisma";
import { setSessionCookie, signSessionToken } from "@/lib/auth/session";

export type LoginState = {
  error?: string;
  fieldErrors?: Partial<Record<"email" | "password", string>>;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse({
    email: typeof raw.email === "string" ? raw.email : "",
    password: typeof raw.password === "string" ? raw.password : "",
  });

  if (!parsed.success) {
    const fieldErrors: LoginState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "email" || key === "password") {
        fieldErrors[key] = issue.message;
      }
    }
    return { fieldErrors };
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Email o contraseña incorrectos." };
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return { error: "Email o contraseña incorrectos." };
  }

  const token = await signSessionToken({
    userId: user.id,
    email: user.email,
    username: user.username,
  });
  await setSessionCookie(token);
  redirect("/dashboard");
}
