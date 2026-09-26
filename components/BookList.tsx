import BookCard from "./BookCard";

interface Book {
  id: string;
  title: string;
  author: string;
  progress: number;
  status: "reading" | "completed" | "want-to-read";
}

interface BookListProps {
  books: Book[];
}

export default function BookList({ books }: BookListProps) {
  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </div>
  );
}