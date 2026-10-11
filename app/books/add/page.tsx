import type { Metadata } from "next";
import AddBookForm from "@/components/AddBookForm";

export const metadata: Metadata = {
  title: "Add Book",
  description:
    "Add a new book to your ShelfSpace library and start tracking your reading progress.",
};

export default function AddBookPage() {
  return <AddBookForm />;
}