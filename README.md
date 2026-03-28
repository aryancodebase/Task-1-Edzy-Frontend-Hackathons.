# 📚 Open Library Explorer

An infinite-scrolling book explorer powered by the
[Open Library](https://openlibrary.org/) public API.
No API key required.

Built as part of a frontend hackathon task for **Edzy by Paraheights Technologies**.

---

## ✨ Features

- **Infinite Scroll** — loads next 20 books automatically as you scroll
- **Search** — debounced 400ms search bar with live results
- **Filter Chips** — quick filters: science, mathematics, history, biology, astronomy
- **Book Cards** — cover image, title, author, year, subject badges
- **Skeleton Loading** — placeholder cards while fetching
- **Dark / Light Mode** — toggle with preference saved to localStorage
- **Back to Top** — floating button appears after scrolling 400px
- **URL Persistence** — query synced to `?q=` param, restored on reload
- **Error & Empty States** — graceful handling of API failures and no results

---

## 🛠 Tech Stack

| Layer              | Choice                        |
|--------------------|-------------------------------|
| Framework          | Next.js 14 (App Router)       |
| Language           | TypeScript                    |
| Styling            | TailwindCSS                   |
| UI Components      | shadcn/ui                     |
| Data Fetching      | TanStack Query (infinite)     |
| Scroll Detection   | IntersectionObserver          |
| Icons              | Lucide React                  |
| Fonts              | Geist                         |

---

## 📦 Dependencies

1. **TanStack Query** — infinite query fetching, caching, pagination
2. **shadcn/ui** — Card, Badge, Skeleton, Input, Button components
3. **TailwindCSS** — utility-first styling + dark mode
4. **Lucide React** — icons (Search, Moon, Sun, ArrowUp, BookOpen)

---

## 📁 Project Structure
```
open-library-explorer/
├── app/
│   ├── library/
│   │   └── page.tsx          # /library route — main page
│   ├── globals.css
│   ├── layout.tsx            # Root layout with QueryProvider
│   └── page.tsx              # Redirects / → /library
├── components/
│   ├── ui/                   # shadcn auto-generated components
│   ├── BookCard.tsx          # Single book card
│   ├── BookGrid.tsx          # Grid + infinite scroll logic
│   ├── BookSkeleton.tsx      # Loading placeholder card
│   ├── SearchBar.tsx         # Debounced search input
│   ├── FilterChips.tsx       # Quick filter buttons
│   ├── ThemeToggle.tsx       # Dark/Light mode toggle
│   ├── BackToTop.tsx         # Floating scroll-to-top button
│   └── QueryProvider.tsx     # TanStack Query client provider
├── hooks/
│   └── useInfiniteBooks.ts   # Infinite query hook
├── lib/
│   ├── openLibrary.ts        # API fetcher + types
│   └── utils.ts              # shadcn utility
└── public/
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/open-library-explorer.git
cd open-library-explorer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:3000/library
```

---

## 🌐 Data Source

All data comes from the free **Open Library API** — no API key needed.

| Endpoint | Usage |
|---|---|
| `https://openlibrary.org/search.json?q=<query>&page=<n>` | Paginated book search |
| `https://covers.openlibrary.org/b/id/<cover_i>-L.jpg` | Book cover images |

Fields used per book: `title`, `author_name[]`, `first_publish_year`, `cover_i`, `subject[]`

---

## 🔑 Key Implementation Decisions

### Infinite Scroll
Used native `IntersectionObserver` on an invisible sentinel `<div>` at the
bottom of the grid. When it enters the viewport (with 200px early trigger),
the next page is fetched automatically via TanStack Query's `fetchNextPage`.

### Data Fetching
TanStack Query's `useInfiniteQuery` handles pagination, caching, and
background refetching. Results are cached for 5 minutes — switching between
queries is instant if previously searched.

### Debounced Search
Search input uses a local `useState` with a `useEffect` timer (400ms).
The parent query state only updates after the user stops typing,
preventing unnecessary API calls on every keystroke.

### URL Persistence
The active query is synced to the URL using `router.replace` with
`?q=<query>` on every query change. On page reload, the query is
restored from `searchParams` — defaulting to `"science"` if absent.

### Dark Mode
Implemented via Tailwind's `darkMode: "class"` strategy. The toggle
adds/removes the `dark` class on `document.documentElement` and
saves the preference to `localStorage`.

---

## 📄 Submission Notes

- See `PROMPTS.md` for AI tools and prompts used during development.
- No API key is required — the Open Library API is completely free and public.
- The app is fully functional as a prototype demonstrating infinite scroll,
  virtualized data fetching, and clean component architecture.