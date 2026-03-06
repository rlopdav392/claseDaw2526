import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParser = {
  search: parseAsString.withDefault("").withOptions({
    shallow: false,
    clearOnDefault: true,
  }),
};

export const sortParser = {
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
};

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const paginationParser = {
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(5),
};

export const paginationOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const searchParamsCache = createSearchParamsCache({
  ...searchParser,
  ...sortParser,
  ...paginationParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
