import { describe, expect, it } from "@jest/globals";
import { loginSchema } from "@/lib/validations/login";

describe("loginSchema", () => {
  it("acepta email y password no vacío", () => {
    const r = loginSchema.safeParse({
      email: "u@example.com",
      password: "secret123",
    });
    expect(r.success).toBe(true);
  });

  it("rechaza email inválido", () => {
    const r = loginSchema.safeParse({
      email: "bad",
      password: "x",
    });
    expect(r.success).toBe(false);
  });

  it("rechaza password vacía", () => {
    const r = loginSchema.safeParse({
      email: "u@example.com",
      password: "",
    });
    expect(r.success).toBe(false);
  });
});
