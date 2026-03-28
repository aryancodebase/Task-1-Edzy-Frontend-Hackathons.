"use client";

import { Button } from "@/components/ui/button";

// Quick filter options
const CHIPS = [
  "science",
  "mathematics",
  "history",
  "biology",
  "astronomy",
];

interface FilterChipsProps {
  activeQuery: string;
  onSelect: (query: string) => void;
}

export default function FilterChips({
  activeQuery,
  onSelect,
}: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CHIPS.map((chip) => {
        const isActive = activeQuery.toLowerCase() === chip;

        return (
          <Button
            key={chip}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(chip)}
            className={`rounded-full capitalize text-xs transition-all ${
              isActive
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "border-gray-200 text-gray-600 hover:border-gray-900 dark:border-gray-700 dark:text-gray-300"
            }`}
          >
            {chip}
          </Button>
        );
      })}
    </div>
  );
}