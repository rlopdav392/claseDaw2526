"use client";

import { useQueryState } from "nuqs";
import { searchParser } from "../search-params";

const CommentSearchInput = () => {
  const [search, setSearch] = useQueryState("search", searchParser.search);

  return (
    <input
      value={search}
      placeholder="Buscar comentarios..."
      onChange={(e) => setSearch(e.target.value)}
      style={{ flex: 1, padding: 8, border: "1px solid #ddd", borderRadius: 4 }}
    />
  );
};

export { CommentSearchInput };
