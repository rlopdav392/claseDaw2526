import { describe, expect, it } from "@jest/globals";
import { isResetNonceValid } from "@/lib/password-reset-nonce";

describe("isResetNonceValid", () => {
  it("es true cuando coincide", () => {
    expect(isResetNonceValid("abc", "abc")).toBe(true);
  });

  it("es false cuando no coincide", () => {
    expect(isResetNonceValid("a", "b")).toBe(false);
  });

  it("es false cuando stored es null", () => {
    expect(isResetNonceValid(null, "x")).toBe(false);
  });

  it("es false cuando stored es undefined", () => {
    expect(isResetNonceValid(undefined, "x")).toBe(false);
  });
});
