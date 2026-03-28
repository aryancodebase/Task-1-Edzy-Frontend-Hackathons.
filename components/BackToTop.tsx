"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling 400px
  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 400);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!visible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 rounded-full w-11 h-11 shadow-lg bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-all"
      size="icon"
    >
      <ArrowUp className="w-4 h-4" />
    </Button>
  );
}