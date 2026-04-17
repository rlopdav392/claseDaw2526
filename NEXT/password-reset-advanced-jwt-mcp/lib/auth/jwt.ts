import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";

export type SessionUser = {
  userId: string;
  email: string;
  username: string;
};

function getSecret(): Uint8Array {
  const s = process.env.AUTH_SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error(
      "AUTH_SESSION_SECRET debe existir y tener al menos 32 caracteres",
    );
  }
  return new TextEncoder().encode(s);
}

export async function signSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({
    email: user.email,
    username: user.username,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.userId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    const sub = payload.sub;
    const email = payload.email;
    const username = payload.username;
    if (
      typeof sub !== "string" ||
      typeof email !== "string" ||
      typeof username !== "string"
    ) {
      return null;
    }
    return { userId: sub, email, username };
  } catch {
    return null;
  }
}
