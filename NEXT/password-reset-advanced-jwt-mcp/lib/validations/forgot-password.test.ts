import { describe, expect, it } from "@jest/globals";
import { forgotPasswordSchema } from "@/lib/validations/forgot-password";

describe("forgotPasswordSchema", () => {
  it("acepta email válido", () => {
    const r = forgotPasswordSchema.safeParse({ email: "a@b.co" });
    expect(r.success).toBe(true);
  });

  it("rechaza email inválido", () => {
    const r = forgotPasswordSchema.safeParse({ email: "not-an-email" });
    expect(r.success).toBe(false);
  });
});
