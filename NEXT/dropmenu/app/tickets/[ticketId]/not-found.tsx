import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ticketsPath } from "@/paths";
export default function NotFound() {
  return (
    <Placeholder
      label="ticket not found"
      button={
        <Button asChild variant="outline">
          <Link href={ticketsPath()}>Go to tickets</Link>
        </Button>
      }
    />
  );
}
