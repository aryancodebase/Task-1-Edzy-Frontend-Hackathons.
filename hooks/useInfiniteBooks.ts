import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBooks, PAGE_SIZE } from "@/lib/openLibrary";

export function useInfiniteBooks(query: string) {
  return useInfiniteQuery({
    // Re-fetch automatically when query changes
    queryKey: ["books", query],

    // Fetch function — pageParam starts at 1
    queryFn: ({ pageParam }) => fetchBooks(query, pageParam as number),

    // First page is always 1
    initialPageParam: 1,

    // Tell TanStack Query what the next page number is
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * PAGE_SIZE;

      // If we've fetched all results, stop
      if (totalFetched >= lastPage.numFound) {
        return undefined;
      }

      // Otherwise return next page number
      return allPages.length + 1;
    },

    // Don't fetch if query is empty
    enabled: query.trim().length > 0,
  });
}