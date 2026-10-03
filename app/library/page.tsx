import Link from "next/link";
import BookList from "@/components/BookList";

const books = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    progress: 64,
    status: "reading" as const,
  },
  {
    id: "2",
    title: "Circe",
    author: "Madeline Miller",
    progress: 32,
    status: "reading" as const,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    progress: 100,
    status: "completed" as const,
  },
  {
    id: "4",
    title: "The Secret History",
    author: "Donna Tartt",
    progress: 0,
    status: "want-to-read" as const,
  },
];

export default function LibraryPage() {
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
        <BookList books={books} />
      </div>
    </section>
  );
}