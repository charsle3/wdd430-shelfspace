"use client";

import { useState } from "react";
import BookList from "@/components/BookList";
import type { LibraryBook } from "@/lib/types";

type Filter = "all" | LibraryBook["status"];

interface LibraryFiltersProps {
  books: LibraryBook[];
}

const filters: { label: string; value: Filter }[] = [
  { label: "All Books", value: "all" },
  { label: "Reading", value: "reading" },
  { label: "Completed", value: "completed" },
  { label: "Want to Read", value: "want-to-read" },
];

export default function LibraryFilters({
  books,
}: LibraryFiltersProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filteredBooks =
    activeFilter === "all"
      ? books
      : books.filter((book) => book.status === activeFilter);

  return (
    <>
      <div
        className="mt-10 flex flex-wrap gap-3"
        role="group"
        aria-label="Filter books by reading status"
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              aria-pressed={isActive}
              className={
                isActive
                  ? "rounded-full bg-[#355E3B] px-5 py-2 text-sm font-medium text-white"
                  : "rounded-full bg-white px-5 py-2 text-sm font-medium text-gray-600 hover:bg-[#D8C7A3]/30"
              }
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        {filteredBooks.length === 0 ? (
          <p className="text-gray-500" role="status">
            {activeFilter === "all"
              ? "You have no books in your library."
              : `No books found in ${filters.find(
                  (filter) => filter.value === activeFilter
                )?.label}.`}
          </p>
        ) : (
          <BookList books={filteredBooks} />
        )}
      </div>
    </>
  );
}
