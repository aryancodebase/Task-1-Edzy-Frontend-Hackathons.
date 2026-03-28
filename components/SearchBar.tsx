"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  // Local state for instant input feel
  const [localValue, setLocalValue] = useState(value);

  // Sync if parent value changes (e.g. chip selected)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce — wait 400ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 400);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <div className="relative w-full max-w-xl">
      {/* Search icon */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

      <Input
        type="text"
        placeholder="Search books..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="pl-9 rounded-xl border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
      />
    </div>
  );
}