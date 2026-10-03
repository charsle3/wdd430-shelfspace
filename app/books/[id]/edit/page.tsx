import Link from "next/link";

interface EditBookPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBookPage({
  params,
}: EditBookPageProps) {
  const { id } = await params;

  const book = {
    title: "The Midnight Library",
    author: "Matt Haig",
    totalPages: 304,
    progress: 64,
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-14">
      <Link
        href={`/books/${id}`}
        className="text-sm font-medium text-[#355E3B] hover:underline"
      >
        ← Back to book
      </Link>

      <div className="mt-6">
        <p className="font-semibold text-[#A2674A]">Book settings</p>

        <h1 className="mt-2 text-5xl text-[#24452A]">Edit Book</h1>
      </div>

      <form className="mt-10 space-y-7 rounded-3xl bg-white p-8">
        <div>
          <label htmlFor="title" className="mb-2 block font-semibold">
            Title
          </label>

          <input
            id="title"
            type="text"
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
            defaultValue={book.author}
            className="w-full rounded-xl border border-gray-200 px-4 py-3"
          />
        </div>

        <div>
          <label htmlFor="pages" className="mb-2 block font-semibold">
            Total pages
          </label>

          <input
            id="pages"
            type="number"
            defaultValue={book.totalPages}
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
            min="0"
            max="100"
            defaultValue={book.progress}
            className="w-full rounded-xl border border-gray-200 px-4 py-3"
          />
        </div>

        <div>
          <label htmlFor="status" className="mb-2 block font-semibold">
            Status
          </label>

          <select
            id="status"
            defaultValue="reading"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3"
          >
            <option value="want-to-read">Want to Read</option>
            <option value="reading">Currently Reading</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href={`/books/${id}`}
            className="rounded-full border border-gray-300 px-6 py-3 font-semibold"
          >
            Cancel
          </Link>

          <button className="rounded-full bg-[#355E3B] px-6 py-3 font-semibold text-white">
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}