"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, getCoverUrl } from "@/lib/openLibrary";
import { BookOpen } from "lucide-react";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const coverUrl = getCoverUrl(book.cover_i);

  // Show only first 3 subjects
  const subjects = book.subject?.slice(0, 3) ?? [];

  return (
    <Card className="group overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full">

      {/* Book Cover Image */}
      <div className="aspect-[2/3] relative w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={(e) => {
              // Hide broken image and show placeholder
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          // Placeholder when no cover image
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
            <BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center px-2">
              No Cover
            </p>
          </div>
        )}
      </div>

      {/* Card Content */}
      <CardContent className="p-3 flex flex-col gap-2">

        {/* Title — 2 line clamp */}
        <h3 className="font-bold text-sm leading-tight line-clamp-2 text-gray-900 dark:text-gray-100">
          {book.title}
        </h3>

        {/* Author */}
        {book.author_name && book.author_name.length > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
            {book.author_name[0]}
            {book.author_name.length > 1 && ` +${book.author_name.length - 1}`}
          </p>
        )}

        {/* Year */}
        {book.first_publish_year && (
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {book.first_publish_year}
          </p>
        )}

        {/* Subject chips */}
        {subjects.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {subjects.map((subject, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-[10px] px-2 py-0.5 rounded-full"
              >
                {subject.length > 20 ? subject.slice(0, 20) + "…" : subject}
              </Badge>
            ))}
          </div>
        )}

      </CardContent>
    </Card>
  );
}