"use client";

import { useQueryStates } from "nuqs";
import { paginationOptions, paginationParser } from "../search-params";

type Props = {
  paginatedTicketMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

const TicketPagination = ({ paginatedTicketMetadata }: Props) => {
  const [{ page, size }, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
      <button
        disabled={page === 0}
        onClick={() => setPagination({ page: page - 1 })}
      >
        Previous
      </button>

      <div style={{ alignSelf: "center", fontSize: 12, opacity: 0.8 }}>
        size={size} · hasNextPage={String(paginatedTicketMetadata.hasNextPage)}
      </div>

      <button
        disabled={!paginatedTicketMetadata.hasNextPage}
        onClick={() => setPagination({ page: page + 1 })}
      >
        Next
      </button>
    </div>
  );
};

export { TicketPagination };
