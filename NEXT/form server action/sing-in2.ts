"use server";

import { redirect } from "next/navigation";
import { z, ZodError } from "zod";
import { homePage } from "@/paths";
import { getToken } from "../queries/get-token";
import { movidaCookie } from "../queries/movida-cookie";
import { ActionState } from "../types";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signIn2 = async (
  _actionState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData)
    );
    const token = await getToken(email, password);
    await movidaCookie(token);
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "ERROR",
        message: "error en la validación  de campos",
        payload: formData,
        fieldErrors: error.flatten().fieldErrors,
      };
    } else if (error instanceof Error) {
      return {
        status: "ERROR2",
        message: error.message,
        payload: formData,
        fieldErrors: {},
      };
    } else {
      return {
        status: "ERROR2",
        message: "something went wrong",
        payload: formData,
        fieldErrors: {},
      };
    }
  }
  /*  return {
      status: "SUCCESS",
      message: "Sign in successful!",
      payload: formData,
    }; */
  redirect(homePage());
};
export { signIn2 };
