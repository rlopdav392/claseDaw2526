import { ParsedSearchParams } from "../search-params";
import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";
import { TicketPagination } from "./ticket-pagination";
import { TicketSearchInput } from "./ticket-search-input";
import { TicketSortSelect } from "./ticket-sort-select";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const { list: tickets, metadata } = await getTickets(userId, searchParams);

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <TicketSearchInput placeholder="Search tickets..." />
        <TicketSortSelect
          options={[
            { sortKey: "createdAt", sortValue: "desc", label: "Newest" },
            { sortKey: "createdAt", sortValue: "asc", label: "Oldest" },
            { sortKey: "bounty", sortValue: "desc", label: "Bounty" },
          ]}
        />
      </div>

      <div style={{ opacity: 0.8, fontSize: 12 }}>
        <div>
          URL state: page={searchParams.page} size={searchParams.size} search="
          {searchParams.search}" sortKey={searchParams.sortKey} sortValue=
          {searchParams.sortValue}
        </div>
      </div>

      {tickets.length ? (
        tickets.map((t) => <TicketItem key={t.id} ticket={t} />)
      ) : (
        <div style={{ padding: 12, border: "1px solid #ddd" }}>
          No tickets found
        </div>
      )}

      <TicketPagination paginatedTicketMetadata={metadata} />
    </section>
  );
};

export { TicketList };
