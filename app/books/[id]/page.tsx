import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import ProgressBar from "@/components/ProgressBar";
import { headers } from "next/headers";
import { handleRemoveBook } from "@/lib/actions";
import { getBookById, getReviewsByBookAndUser, getUserByName } from "@/lib/connect";

import ReviewSection from "@/components/ReviewSection";

interface BookPageProps {
  params: Promise<{
    id: string;
  }>;
}

const statusLabels: Record<string, string> = {
  reading: "Currently Reading",
  completed: "Completed",
  "want-to-read": "Want to Read",
};

function getValidBookId(id: string): number | null {
  const bookId = Number(id);

  if (!Number.isSafeInteger(bookId) || bookId < 1) {
    return null;
  }

  return bookId;
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { id } = await params;
  const bookId = getValidBookId(id);

  const session = await auth();
  const user = await getUserByName(session?.user?.name || '');

  const USER_ID = (user[0]?.id || 0);

  if (bookId === null) {
    return {
      title: "Book Not Found",
      description:
        "The requested book could not be found in ShelfSpace.",
    };
  }

  const book = await getBookById(bookId, USER_ID);

  if (!book) {
    return {
      title: "Book Not Found",
      description:
        "The requested book could not be found in ShelfSpace.",
    };
  }

  return {
    title: book.title,
    description: `${book.title} by ${book.author}. View book details and reading progress on ShelfSpace.`,
    openGraph: {
      title: `${book.title} by ${book.author}`,
      description:
        book.description ||
        `View ${book.title} by ${book.author} on ShelfSpace.`,
    },
  };
}

export default async function BookPage({
  params,
}: BookPageProps) {
  const { id } = await params;
  const bookId = getValidBookId(id);

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  const cookie = (await headers()).get('cookie');
  const response = await fetch(`${baseUrl}/api/books/${id}`, {
      cache: 'no-store',
      headers: {
        cookie: cookie || '',
      },
  });

  if (response.status === 404) {
      return (
        <section className="mx-auto max-w-6xl px-6 py-14">
          <Link
            href="/library"
            className="text-sm font-medium text-[#355E3B] hover:underline"
          >
            ← Back to library
          </Link>
          <p className="text-red-500">Book not found</p>
        </section>
      );
  }

  const session = await auth();
  const user = await getUserByName(session?.user?.name || '');

  const USER_ID = (user[0]?.id || 0);

  if (bookId === null) {
    notFound();
  }

  const book = await getBookById(bookId, USER_ID);

  if (!book) {
    notFound();
  }

  const review = await getReviewsByBookAndUser(
    bookId,
    USER_ID
  );

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
            <h2 className="text-center text-3xl text-white">
              {book.title}
            </h2>
          </div>
        </div>

        <div>
          <span className="inline-block rounded-full bg-[#D8C7A3]/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#24452A]">
            {statusLabels[book.status] ?? book.status}
          </span>

          <h1 className="mt-5 text-5xl text-[#24452A]">
            {book.title}
          </h1>

          <p className="mt-2 text-xl text-gray-500">
            {book.author}
          </p>

          <div className="mt-8">
            <ProgressBar progress={book.progress} />

            <p className="mt-2 text-sm text-gray-500">
              Page {book.current_page} of {book.total_pages}
            </p>
          </div>

          <div className="mt-8 flex gap-3">
            <Link
              href={`/books/${book.id}/edit`}
              className="rounded-full bg-[#355E3B] px-6 py-3 font-semibold text-white hover:bg-[#24452A]"
            >
              Edit Book
            </Link>
            <form action={handleRemoveBook}>
              <input type="hidden" name="id" value={id} />
              <button type="submit" className="rounded-full border border-[#B44C4C] cursor-pointer px-6 py-3 font-semibold text-[#B44C4C]">
                Remove
              </button>
            </form>
          </div>

          <div className="mt-12 border-t border-[#D8C7A3]/50 pt-8">
            <h2 className="text-2xl text-[#24452A]">
              About this book
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-600">
              {book.description}
            </p>
          </div>

          <ReviewSection bookId={book.id} review={review} />

        </div>
      </div>
    </section>
  );
}
