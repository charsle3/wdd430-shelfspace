import Link from "next/link";
import ProgressBar from "./ProgressBar";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  progress: number;
  status?: "reading" | "completed" | "want-to-read";
}

export default function BookCard({
  id,
  title,
  author,
  progress,
  status = "reading",
}: BookCardProps) {
  const statusText = {
    reading: "Currently Reading",
    completed: "Completed",
    "want-to-read": "Want to Read",
  };

  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link href={`/books/${id}`}>
        <div className="flex h-64 items-center justify-center bg-[#355E3B] p-8">
          <div className="flex h-full w-36 items-center justify-center rounded-sm border border-white/30 px-5 text-center shadow-xl">
            <span className="font-[var(--font-playfair)] text-xl text-white">
              {title}
            </span>
          </div>
        </div>

        <div className="p-6">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#A2674A]">
            {statusText[status]}
          </span>

          <h2 className="mt-2 line-clamp-1 text-xl text-[#24452A]">{title}</h2>

          <p className="mt-1 text-sm text-gray-500">{author}</p>

          <div className="mt-5">
            <ProgressBar progress={progress} />
          </div>
        </div>
      </Link>
    </article>
  );
}