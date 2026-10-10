'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createBook, updateBook } from './connect';
import { createReview, updateReview, deleteReview } from "@/lib/connect";

const bookSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(1),
  author: z.string().min(1),
  description: z.string().min(1),
  total_pages: z.number().min(1),
  progress: z.number().min(0).max(100)
});

export type State = {
  message: string | null;
  errors: {
    title?: string;
    author?: string;
    description?: string;
    total_pages?: string;
    progress?: string;
  };
};

export async function handleAddBook(prevState: State, formData: FormData): Promise<State> {
  const raw = {
    id: 1, // Hardcoded for validation, value is not passed on add, only used to satisfy the schema
    title: formData.get('title') as string,
    author: String(formData.get('author')),
    description: String(formData.get('description')),
    total_pages: Number(formData.get('total_pages')),
    progress: 0
  }

  const parsed = bookSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    } as State;
  }

  await createBook(parsed.data);

  revalidatePath("/library");
  redirect("/library");
}

export async function handleUpdateBook(prevState: State, formData: FormData): Promise<State> {
  const raw = {
    id: Number(formData.get('id')),
    title: formData.get('title') as string,
    author: String(formData.get('author')),
    description: String(formData.get('description')),
    total_pages: Number(formData.get('total_pages')),
    progress: Number(formData.get('progress')),
  }

  const parsed = bookSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    } as State;
  }

  await updateBook(parsed.data.id, parsed.data);

  revalidatePath("/library");
  redirect(`/books/${parsed.data.id}`);
}

export type ReviewState = {
  message: string | null;
  success: boolean;
};


const USER_ID = 1; // Temporary until authentication is implemented

const reviewSchema = z.object({
  bookId: z.number().int().positive(),
  rating: z.number().int().min(1).max(5),
  content: z.string().trim().min(1, "Review cannot be empty"),
  mode: z.enum(["create", "update"]),
});

export async function saveReviewAction(
  prevState: ReviewState,
  formData: FormData
): Promise<ReviewState> {
  const parsed = reviewSchema.safeParse({
    bookId: Number(formData.get("bookId")),
    rating: Number(formData.get("rating")),
    content: String(formData.get("content") ?? ""),
    mode: formData.get("mode"),
  });

  if (!parsed.success) {
    return {
      message: parsed.error.issues[0]?.message ?? "Invalid review",
      success: false,
    };
  }

  const { bookId, rating, content, mode } = parsed.data;

  try {
    if (mode === "create") {
      const saved = await createReview({
        user_id: USER_ID,
        book_id: bookId,
        rating,
        content,
      });

      if (!saved) {
        return {
          message: "Could not create review.",
          success: false,
        };
      }
    } else {
      const saved = await updateReview(
        bookId,
        USER_ID,
        rating,
        content
      );

      if (!saved) {
        return {
          message: "Review not found.",
          success: false,
        };
      }
    }

    revalidatePath(`/books/${bookId}`);

    return {
      message: null,
      success: true,
    };
  } catch {
    return {
      message: "An error occurred while saving your review.",
      success: false,
    };
  }
}

export async function deleteReviewAction(
  bookId: number
): Promise<ReviewState> {
  if (!Number.isSafeInteger(bookId) || bookId < 1) {
    return {
      message: "Invalid book ID.",
      success: false,
    };
  }

  try {
    const deleted = await deleteReview(bookId, USER_ID);

    if (!deleted) {
      return {
        message: "Review not found.",
        success: false,
      };
    }

    revalidatePath(`/books/${bookId}`);

    return {
      message: null,
      success: true,
    };
  } catch {
    return {
      message: "An error occurred while deleting your review.",
      success: false,
    };
  }
}
