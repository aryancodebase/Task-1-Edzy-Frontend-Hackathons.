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

export const PAGE_SIZE = 20;

export function getCoverUrl(coverId: number | undefined): string {
  if (!coverId) return "";
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
}

export async function fetchBooks(
  query: string,
  page: number
): Promise<SearchResponse> {
  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
      query
    )}&page=${page}&limit=${PAGE_SIZE}`;

    const response = await fetch(url, {
      cache: "no-store", // 🔥 VERY IMPORTANT (prevents build crash)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.status}`);
    }

    const data = await response.json();

    // ✅ Safety fallback
    return {
      docs: data.docs || [],
      numFound: data.numFound || 0,
      start: data.start || 0,
    };
  } catch (error) {
    console.error("FetchBooks Error:", error);

    // ✅ NEVER crash build
    return {
      docs: [],
      numFound: 0,
      start: 0,
    };
  }
}