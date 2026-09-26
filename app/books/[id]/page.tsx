import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";

interface BookPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;

  const book = {
    id,
    title: "The Midnight Library",
    author: "Matt Haig",
    totalPages: 304,
    currentPage: 195,
    progress: 64,
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever.",
    rating: 4,
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <Link
        href="/library"
        className="text-sm font-medium text-[#355E3B] hover:underline"
      >
        ← Back to library
      </Link>

      <div className="mt-8 grid gap-12 md:grid-cols-[300px_1fr]">
        <div>
          <div className="flex aspect-[2/3] items-center justify-center rounded-xl bg-[#355E3B] p-10 shadow-xl">
            <h2 className="text-center text-3xl text-white">{book.title}</h2>
          </div>
        </div>

        <div>
          <span className="inline-block rounded-full bg-[#D8C7A3]/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#24452A]">
            Currently Reading
          </span>

          <h1 className="mt-5 text-5xl text-[#24452A]">{book.title}</h1>

          <p className="mt-2 text-xl text-gray-500">{book.author}</p>

          <div className="mt-8">
            <ProgressBar progress={book.progress} />

            <p className="mt-2 text-sm text-gray-500">
              Page {book.currentPage} of {book.totalPages}
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            <Link
              href={`/books/${id}/edit`}
              className="rounded-full bg-[#355E3B] px-6 py-3 font-semibold text-white hover:bg-[#24452A]"
            >
              Edit Book
            </Link>

            <button className="rounded-full border border-[#B44C4C] px-6 py-3 font-semibold text-[#B44C4C]">
              Remove
            </button>
          </div>

          <div className="mt-12 border-t border-[#D8C7A3]/50 pt-8">
            <h2 className="text-2xl text-[#24452A]">About this book</h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-600">
              {book.description}
            </p>
          </div>

          <div className="mt-10 rounded-2xl bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#A2674A]">
              Your rating
            </p>

            <div className="mt-3 text-2xl text-[#A2674A]">★★★★☆</div>

            <p className="mt-4 text-gray-600">
              A thoughtful story about choices, regrets, and the possibilities
              that shape our lives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}