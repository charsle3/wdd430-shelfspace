import Link from "next/link";
import BookList from "@/components/BookList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Library",
  description:
    "View and manage your ShelfSpace library, including books you are reading, completed books, and books you want to read.",
};

export default async function LibraryPage() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/library`, {
      cache: 'no-store',
  });

  if (!response.ok) {
      throw new Error('Failed to fetch library');
  }
  const books = await response.json();

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="font-semibold text-[#A2674A]">Your collection</p>

          <h1 className="mt-2 text-5xl text-[#24452A]">My Library</h1>

          <p className="mt-3 max-w-xl text-gray-500">
            Keep track of everything you&apos;re reading, finished, or planning
            to read next.
          </p>
        </div>

        <Link
          href="/books/add"
          className="w-fit rounded-full bg-[#355E3B] px-6 py-3 font-semibold text-white hover:bg-[#24452A]"
        >
          + Add a book
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {["All Books", "Reading", "Completed", "Want to Read"].map(
          (filter, index) => (
            <button
              key={filter}
              className={
                index === 0
                  ? "rounded-full bg-[#355E3B] px-5 py-2 text-sm font-medium text-white"
                  : "rounded-full bg-white px-5 py-2 text-sm font-medium text-gray-600 hover:bg-[#D8C7A3]/30"
              }
            >
              {filter}
            </button>
          ),
        )}
      </div>

      <div className="mt-10">
        {books.length === 0 ? (
          <p className="text-gray-500">You have no books in your library.</p>
        ) : (
          <BookList books={books} />
        )}
      </div>
    </section>
  );
}