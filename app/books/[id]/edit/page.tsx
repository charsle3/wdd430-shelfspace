import Link from "next/link";
import EditBookForm from "@/components/EditForm";
import { headers } from "next/headers";

interface EditBookPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBookPage({
  params,
}: EditBookPageProps) {
  const { id } = await params;

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

  if (!response.ok) {
      throw new Error('Failed to fetch book');
  }

  const { book, review } = await response.json();

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

      <EditBookForm book={book} />
    </section>
  );
}