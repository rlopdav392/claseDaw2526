import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";
import { verifySessionToken, type SessionUser } from "@/lib/auth/jwt";

export type { SessionUser } from "@/lib/auth/jwt";
export { signSessionToken } from "@/lib/auth/jwt";
export { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

/**
 * Autenticación por JWT en cookie httpOnly (ARCHITECTURE.md — Autenticación).
 * Sin localStorage/sessionStorage. Lectura solo en servidor con cookies().
 */
export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
