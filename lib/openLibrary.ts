// Types for the API response
export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
}

export interface SearchResponse {
  docs: Book[];
  numFound: number;
  start: number;
}

// How many books to fetch per page
export const PAGE_SIZE = 20;

// Get cover image URL with fallback
export function getCoverUrl(coverId: number | undefined): string {
  if (!coverId) return "";
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
}

// Main fetcher function
export async function fetchBooks(
  query: string,
  page: number
): Promise<SearchResponse> {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    query
  )}&page=${page}&limit=${PAGE_SIZE}`;

  const response = await fetch(url);

  // Handle HTTP errors
  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  const data = await response.json();
  return data;
}