"use client";

import { useQueryState } from "nuqs";
import { searchParser } from "../search-params";

type Props = { placeholder: string };

const TicketSearchInput = ({ placeholder }: Props) => {
  const [search, setSearch] = useQueryState("search", searchParser.search);

  return (
    <input
      value={search}
      placeholder={placeholder}
      onChange={(e) => setSearch(e.target.value)}
      style={{ flex: 1, padding: 8, border: "1px solid #ddd" }}
    />
  );
};

export { TicketSearchInput };
