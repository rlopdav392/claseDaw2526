"use client";

import { useQueryStates } from "nuqs";
import { sortOptions, sortParser } from "../search-params";

const CommentSortSelect = () => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);
  const value = `${sort.sortKey}:${sort.sortValue}`;

  return (
    <select
      value={value}
      onChange={(e) => {
        const [sortKey, sortValue] = e.target.value.split(":");
        setSort({ sortKey, sortValue });
      }}
      style={{ padding: 8, border: "1px solid #ddd", borderRadius: 4 }}
    >
      <option value="createdAt:desc">Más recientes</option>
      <option value="createdAt:asc">Más antiguos</option>
      <option value="username:asc">Usuario A-Z</option>
      <option value="username:desc">Usuario Z-A</option>
    </select>
  );
};

export { CommentSortSelect };
