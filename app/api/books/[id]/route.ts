import { getBookById, getReviewsByBookAndUser, getUserByName } from "@/lib/connect";
import { auth } from "@/auth";

interface BookPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, { params }: BookPageProps) {
  const session = await auth();

  if (!session?.user?.name) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userId = await getUserByName(session.user.name);

  const { id } = await params;
  const book = await getBookById(Number(id), userId[0].id);
  const review = await getReviewsByBookAndUser(Number(id), userId[0].id);

  if (!book) {
    return Response.json(
      { message: "Book not found" },
      { status: 404 }
    );
  }

  return new Response(JSON.stringify({ book, review }), {
    headers: { "Content-Type": "application/json" },
  });
}