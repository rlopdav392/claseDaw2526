"use client";

//import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import { ticketsPath } from "@/paths";
import { signIn2 } from "../actions/sing-in2";
const SignInForm2 = () => {
  //const router = useRouter();
  const [actionState, action, isPending] = useActionState(signIn2, {
    message: "",
    fieldErrors: {},
  });

  useEffect(() => {
    if (actionState?.status === "ERROR2") {
      toast.error(actionState.message);
    }
  }, [actionState]);

  //router.push(ticketsPath());
  return (
    <form action={action} className="flex flex-1 flex-col gap-y-2">
      <Input
        name="email"
        placeholder="email"
        defaultValue={actionState?.payload?.get("email") as string}
      />

      {actionState?.fieldErrors?.email && (
        <p className="text-sm text-red-500">
          {actionState.fieldErrors.email[0]}
        </p>
      )}
      <Input
        name="password"
        placeholder="username"
        type="password"
        defaultValue={actionState?.payload?.get("password") as string}
      />
      {actionState?.fieldErrors?.password && (
        <p className="text-sm text-red-500">
          {actionState.fieldErrors.password[0]}
        </p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};

export { SignInForm2 };
