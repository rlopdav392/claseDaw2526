"use server";
import { cookies } from "next/headers";
import { cache } from "react";

export const getAuth = cache(async () => {
  const cookieStore = await cookies();

  const authToken = cookieStore.get("authToken")?.value ?? null;

  if (!authToken) {
    return {
      user: null,
      session: null,
    };
  }
  return {
    user: { id: "123", email: "user@example.com" },
    session: { token: authToken },
  };
});
