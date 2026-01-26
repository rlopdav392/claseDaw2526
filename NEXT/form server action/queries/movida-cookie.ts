import { cookies } from "next/headers";
export const movidaCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "authToken",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};
