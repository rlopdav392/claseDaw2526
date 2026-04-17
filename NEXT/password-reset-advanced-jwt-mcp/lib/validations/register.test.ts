import { describe, expect, it } from "@jest/globals";
import { registerSchema } from "@/lib/validations/register";

describe("registerSchema", () => {
  it("acepta datos válidos", () => {
    const r = registerSchema.safeParse({
      email: "a@b.co",
      username: "user_1",
      password: "password1",
    });
    expect(r.success).toBe(true);
  });

  it("rechaza email inválido", () => {
    const r = registerSchema.safeParse({
      email: "no-email",
      username: "user",
      password: "password1",
    });
    expect(r.success).toBe(false);
  });

  it("rechaza username duplicado de formato (caracteres no permitidos)", () => {
    const r = registerSchema.safeParse({
      email: "a@b.co",
      username: "user space",
      password: "password1",
    });
    expect(r.success).toBe(false);
  });

  it("rechaza password corta", () => {
    const r = registerSchema.safeParse({
      email: "a@b.co",
      username: "user",
      password: "short",
    });
    expect(r.success).toBe(false);
  });
});
