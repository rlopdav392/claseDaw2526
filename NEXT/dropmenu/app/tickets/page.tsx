import { Suspense } from "react";

import { Spinner } from "@/components/spinner";

import { TicketList } from "../_tickets/components/ticket-list";
import { RedirectToast } from "@/components/redirect-toast";
export const dynamic = "force-dynamic";
const TicketsPage = async () => {
  return (
    <>
      <div className="flex-1 flex flex-col gap-y-8 animate-fade-from-top">
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </div>
      <RedirectToast />
    </>
  );
};

export default TicketsPage;
