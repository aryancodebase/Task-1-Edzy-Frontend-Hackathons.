"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BookGrid from "@/components/BookGrid";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import ThemeToggle from "@/components/ThemeToggle";
import BackToTop from "@/components/BackToTop";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function LibraryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read query from URL — default to "science"
  const initialQuery = searchParams.get("q") || "science";
  const [query, setQuery] = useState(initialQuery);

  // Sync query to URL whenever it changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("q", query);
    router.replace(`/library?${params.toString()}`, { scroll: false });
  }, [query, router]);

  // When chip is selected → update query + reset
  function handleChipSelect(chip: string) {
    setQuery(chip);
  }

  // When search bar changes → update query
  function handleSearchChange(value: string) {
    if (value.trim()) {
      setQuery(value);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
          {/* Top row — logo + search + toggle */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-gray-900 text-sm">
                📚
              </div>
              <span className="font-bold text-gray-900 dark:text-white hidden sm:block">
                Library
              </span>
            </div>

            {/* Search bar — takes remaining space */}
            <div className="flex-1">
              <SearchBar value={query} onChange={handleSearchChange} />
            </div>

            {/* Theme toggle */}
            <ThemeToggle />
          </div>

          {/* Filter chips row */}
          <FilterChips activeQuery={query} onSelect={handleChipSelect} />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Results label */}
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
          Showing results for{" "}
          <span className="font-semibold text-gray-600 dark:text-gray-300">
            {query}
          </span>
        </p>

        {/* Book grid with infinite scroll */}
        <BookGrid query={query} />
      </main>

      {/* Back to top floating button */}
      <BackToTop />
    </div>
  );
}
