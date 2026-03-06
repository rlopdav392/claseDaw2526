import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { searchParamsCache } from "@/features/ticket/search-params";

type TicketsPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function TicketsPage({ searchParams }: TicketsPageProps) {
  // Simula el userId “real” (en tu proyecto viene de getAuth)..
  const userId = "user_1";

  return (
    <main style={{ maxWidth: 520, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 22, marginBottom: 12 }}>My Tickets</h1>

      <Suspense fallback={<Spinner />}>
        <TicketList
          userId={userId}
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
    </main>
  );
}
