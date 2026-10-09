'use client'
import Link from "next/link";

import { handleUpdateBook, State } from "@/lib/actions";
import { useActionState } from "react";
import type { BookDetail } from "@/lib/types";

const initialState: State = { message: null, errors: {} };

export default function EditBookForm({ book }: { book: BookDetail }) {
  const bookId = book.id;
  const [state, formAction] = useActionState(handleUpdateBook, initialState);

  return (
    <form action={formAction} className="mt-10 space-y-7 rounded-3xl bg-white p-8">
      <input type="hidden" name="id" value={bookId} />
      <div>
        <label htmlFor="title" className="mb-2 block font-semibold">
          Title
        </label>

        <input
          id="title"
          type="text"
          name="title"
          defaultValue={book.title}
          className="w-full rounded-xl border border-gray-200 px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="author" className="mb-2 block font-semibold">
          Author
        </label>

        <input
          id="author"
          type="text"
          name="author"
          defaultValue={book.author}
          className="w-full rounded-xl border border-gray-200 px-4 py-3"
        />
      </div>

      <div>
          <label htmlFor="description" className="mb-2 block font-semibold">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Add a description..."
            defaultValue={book.description}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#355E3B]"
          />
        </div>

      <div>
        <label htmlFor="total_pages" className="mb-2 block font-semibold">
          Total pages
        </label>

        <input
          id="total_pages"
          type="number"
          name="total_pages"
          defaultValue={book.total_pages}
          className="w-full rounded-xl border border-gray-200 px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="progress" className="mb-2 block font-semibold">
          Reading progress
        </label>

        <input
          id="progress"
          type="number"
          name="progress"
          min="0"
          max="100"
          defaultValue={book.progress}
          className="w-full rounded-xl border border-gray-200 px-4 py-3"
        />
      </div>

      <div className="flex justify-end gap-3">
        <Link
          href={`/books/${bookId}`}
          className="rounded-full border border-gray-300 px-6 py-3 font-semibold"
        >
          Cancel
        </Link>

        <button type="submit" className="rounded-full bg-[#355E3B] px-6 py-3 font-semibold text-white">
          Save Changes
        </button>
      </div>
    </form>
  );
}