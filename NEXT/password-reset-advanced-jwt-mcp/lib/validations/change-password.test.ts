import { describe, expect, it } from "@jest/globals";
import { changePasswordFormSchema } from "@/lib/validations/change-password";

describe("changePasswordFormSchema", () => {
  it("acepta cambio válido", () => {
    const r = changePasswordFormSchema.safeParse({
      currentPassword: "oldpass12",
      newPassword: "newpass12",
      newPasswordConfirm: "newpass12",
    });
    expect(r.success).toBe(true);
  });

  it("rechaza si nueva y confirmación no coinciden", () => {
    const r = changePasswordFormSchema.safeParse({
      currentPassword: "oldpass12",
      newPassword: "newpass12",
      newPasswordConfirm: "different",
    });
    expect(r.success).toBe(false);
  });

  it("rechaza si nueva es igual a la actual", () => {
    const r = changePasswordFormSchema.safeParse({
      currentPassword: "samepass12",
      newPassword: "samepass12",
      newPasswordConfirm: "samepass12",
    });
    expect(r.success).toBe(false);
  });
});
