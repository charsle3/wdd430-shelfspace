import { getBooksByUserId } from "@/lib/connect";

export async function GET() {
  const books = await getBooksByUserId(1); // Replace 1 with the actual user ID when authentication is implemented
  return new Response(JSON.stringify(books), {
    headers: { "Content-Type": "application/json" },
  });
}