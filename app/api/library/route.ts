import { getBooksByUserId, getUserByName } from "@/lib/connect";
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user?.name) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userId = await getUserByName(session.user.name);

  const books = await getBooksByUserId(Number(userId[0].id)); // Replace 1 with the actual user ID when authentication is implemented
  return new Response(JSON.stringify(books), {
    headers: { "Content-Type": "application/json" },
  });
}