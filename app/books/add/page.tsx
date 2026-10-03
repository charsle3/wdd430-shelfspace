import Link from "next/link";

export default function AddBookPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-14">
      <Link
        href="/library"
        className="text-sm font-medium text-[#355E3B] hover:underline"
      >
        ← Back to library
      </Link>

      <div className="mt-6">
        <p className="font-semibold text-[#A2674A]">New book</p>

        <h1 className="mt-2 text-5xl text-[#24452A]">
          Add to your ShelfSpace
        </h1>

        <p className="mt-3 text-gray-500">
          Add a book to your personal reading collection.
        </p>
      </div>

      <form className="mt-10 space-y-7 rounded-3xl bg-white p-8 shadow-sm">
        <div>
          <label htmlFor="title" className="mb-2 block font-semibold">
            Book title
          </label>

          <input
            id="title"
            type="text"
            placeholder="The Great Gatsby"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#355E3B]"
          />
        </div>

        <div>
          <label htmlFor="author" className="mb-2 block font-semibold">
            Author
          </label>

          <input
            id="author"
            type="text"
            placeholder="F. Scott Fitzgerald"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#355E3B]"
          />
        </div>

        <div>
          <label htmlFor="pages" className="mb-2 block font-semibold">
            Total pages
          </label>

          <input
            id="pages"
            type="number"
            placeholder="180"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#355E3B]"
          />
        </div>

        <div>
          <label htmlFor="status" className="mb-2 block font-semibold">
            Reading status
          </label>

          <select
            id="status"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#355E3B]"
          >
            <option>Want to Read</option>
            <option>Currently Reading</option>
            <option>Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block font-semibold">
            Description
          </label>

          <textarea
            id="description"
            rows={5}
            placeholder="Add a description..."
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#355E3B]"
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
          <Link
            href="/library"
            className="rounded-full border border-gray-300 px-6 py-3 font-semibold"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-full bg-[#355E3B] px-6 py-3 font-semibold text-white hover:bg-[#24452A]"
          >
            Add Book
          </button>
        </div>
      </form>
    </section>
  );
}