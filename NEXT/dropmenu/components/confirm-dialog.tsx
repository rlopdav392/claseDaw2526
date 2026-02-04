import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useActionState, useEffect } from "react";
import { SubmitButton } from "./form/submit-button";
import { toast } from "sonner";
import { cloneElement } from "react";

type ActionState = {
  status?: "IDLE" | "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldErrors?: Record<string, string[] | undefined>;
};

type useConfirmDialog = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger: React.ReactElement;
};
const useConfirmDialog = ({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  action,
  trigger,
}: useConfirmDialog) => {
  const [actionState, formAction] = useActionState(action, {
    status: "IDLE",
    message: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const dialogTrigger = cloneElement(
    trigger as React.ReactElement<{ onClick?: () => void }>,
    {
      onClick: () => {
        setIsOpen((state) => !state);
      },
    },
  );
  useEffect(() => {
    if (actionState.status === "ERROR") {
      if (actionState.message) toast.error(actionState.message);
    }
  }, [actionState]);

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={formAction}>
              <SubmitButton label="Confirm" />
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return [dialogTrigger, dialog] as const;
};

export { useConfirmDialog };
