import { getBookById, getReviewsByBookAndUser } from "@/lib/connect";

interface BookPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, { params }: BookPageProps) {
  const { id } = await params;
  const book = await getBookById(Number(id), 1); // Replace 1 with the actual user ID when authentication is implemented
  const review = await getReviewsByBookAndUser(Number(id), 1); // Replace 1 with the actual user ID when authentication is implemented

  return new Response(JSON.stringify({ book, review }), {
    headers: { "Content-Type": "application/json" },
  });
}