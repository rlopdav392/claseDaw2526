"use client";

import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cloneElement } from "react";

type SubmitButtonProps = {
  label: string;
  icon?: React.ReactElement<{ className?: string }>;
};
const SubmitButton = ({ label, icon }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending && <LucideLoaderCircle className="mr-2 animate-spin h-4 w-4" />}
      {label}
      {icon && (
        <span className="ml-2">
          {cloneElement(icon, { className: "h-4 w-4" })}
        </span>
      )}
    </Button>
  );
};

export { SubmitButton };
