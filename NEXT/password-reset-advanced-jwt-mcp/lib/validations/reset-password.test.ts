import { describe, expect, it } from "@jest/globals";
import { resetPasswordFormSchema } from "@/lib/validations/reset-password";

describe("resetPasswordFormSchema", () => {
  it("acepta contraseñas coincidentes", () => {
    const r = resetPasswordFormSchema.safeParse({
      password: "newpass12",
      passwordConfirm: "newpass12",
    });
    expect(r.success).toBe(true);
  });

  it("rechaza si no coinciden", () => {
    const r = resetPasswordFormSchema.safeParse({
      password: "newpass12",
      passwordConfirm: "otherpass",
    });
    expect(r.success).toBe(false);
  });

  it("rechaza contraseña corta", () => {
    const r = resetPasswordFormSchema.safeParse({
      password: "short",
      passwordConfirm: "short",
    });
    expect(r.success).toBe(false);
  });
});
