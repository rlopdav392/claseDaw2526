"use client";

import { useQueryStates } from "nuqs";
import { sortOptions, sortParser } from "../search-params";

type Option = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type Props = {
  options: Option[];
};

const TicketSortSelect = ({ options }: Props) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const value = `${sort.sortKey}:${sort.sortValue}`;

  return (
    <select
      value={value}
      onChange={(e) => {
        const [sortKey, sortValue] = e.target.value.split(":");
        setSort({ sortKey, sortValue });
      }}
      style={{ padding: 8, border: "1px solid #ddd" }}
    >
      {options.map((o) => (
        <option
          key={`${o.sortKey}:${o.sortValue}`}
          value={`${o.sortKey}:${o.sortValue}`}
        >
          {o.label}
        </option>
      ))}
    </select>
  );
};

export { TicketSortSelect };
