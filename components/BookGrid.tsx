"use client";

import { useEffect, useRef } from "react";
import { useInfiniteBooks } from "@/hooks/useInfiniteBooks";
import BookCard from "@/components/BookCard";
import BookSkeleton from "@/components/BookSkeleton";

interface BookGridProps {
  query: string;
}

export default function BookGrid({ query }: BookGridProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteBooks(query);

  // Sentinel ref — the invisible div at the bottom
  const sentinelRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver — watches the sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // When sentinel is visible and more pages exist → fetch next
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "200px", // Start fetching 200px before sentinel is visible
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages into one array of books
  const books = data?.pages.flatMap((page) => page.docs) ?? [];

  // --- STATES ---

  // Initial loading — show skeleton grid
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <BookSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-5xl mb-4">⚠️</p>
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Something went wrong
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {(error as Error).message}
        </p>
      </div>
    );
  }

  // Empty state — no results found
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-5xl mb-4">📭</p>
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          No books found
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Try searching for something else
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}

        {/* Skeleton rows while fetching next page */}
        {isFetchingNextPage &&
          Array.from({ length: 10 }).map((_, i) => (
            <BookSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {/* Sentinel — IntersectionObserver watches this */}
      <div ref={sentinelRef} className="h-10 mt-6" />

      {/* End of results message */}
      {!hasNextPage && books.length > 0 && (
        <p className="text-center text-sm text-gray-400 py-8">
          You've reached the end · {books.length} books loaded
        </p>
      )}
    </div>
  );
}