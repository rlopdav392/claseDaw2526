"use server";

import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { registerSchema } from "@/lib/validations/register";
import { prisma } from "@/lib/prisma";

export type RegisterState = {
  error?: string;
  fieldErrors?: Partial<Record<"email" | "username" | "password", string>>;
  success?: boolean;
};

export async function registerAction(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const raw = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const parsed = registerSchema.safeParse({
    email: typeof raw.email === "string" ? raw.email : "",
    username: typeof raw.username === "string" ? raw.username : "",
    password: typeof raw.password === "string" ? raw.password : "",
  });

  if (!parsed.success) {
    const fieldErrors: RegisterState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (
        key === "email" ||
        key === "username" ||
        key === "password"
      ) {
        fieldErrors[key] = issue.message;
      }
    }
    return { fieldErrors };
  }

  const { email, username, password } = parsed.data;
  const hash = await bcrypt.hash(password, 12);

  try {
    await prisma.user.create({
      data: {
        email,
        username,
        password: hash,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      const target = e.meta?.target;
      const fields = Array.isArray(target) ? target : target ? [target] : [];
      if (fields.some((f) => String(f).includes("email"))) {
        return { error: "Ya existe una cuenta con ese email." };
      }
      if (fields.some((f) => String(f).includes("username"))) {
        return { error: "Ese nombre de usuario ya está en uso." };
      }
      return { error: "Ese email o nombre de usuario ya está registrado." };
    }
    console.error(e);
    return { error: "No se pudo completar el registro. Inténtalo de nuevo." };
  }

  return { success: true };
}
