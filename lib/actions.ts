'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createBook, updateBook, createUser, getUserByName, deleteBook, createReview, updateReview, deleteReview } from './connect';
import bcrypt from 'bcryptjs';
import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';

const bookSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(1),
  author: z.string().min(1),
  description: z.string().min(1),
  total_pages: z.number().min(1),
  progress: z.number().min(0).max(100)
});

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type State = {
  message: string | null;
  errors: {
    title?: string;
    author?: string;
    description?: string;
    total_pages?: string;
    progress?: string;
    name?: string;
    password?: string;
  };
};

async function requireOwnerSession() {
  const session = await auth();
  if (!session?.user) throw new Error('Not authenticated');
  return session;
}

export async function handleAddBook(prevState: State, formData: FormData): Promise<State> {
  const session = await requireOwnerSession();

  if (!session?.user?.name) throw new Error('Not authenticated');
  const userId = Number((await getUserByName(session.user.name))[0].id); 
  
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

  await createBook(userId, parsed.data);

  revalidatePath("/library");
  redirect("/library");
}

export async function handleUpdateBook(prevState: State, formData: FormData): Promise<State> {
  const session = await requireOwnerSession();

  if (!session?.user?.name) throw new Error('Not authenticated');
  const userId = Number((await getUserByName(session.user.name))[0].id); 

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

  await updateBook(userId, parsed.data);

  revalidatePath("/library");
  redirect(`/books/${parsed.data.id}`);
}

export async function handleAddUser(prevState: State, formData: FormData): Promise<State> {
  await requireOwnerSession();
  const raw = {
    name: String(formData.get('name')),
    password: String(formData.get('password')),
  }

  const parsed = userSchema.safeParse(raw);


  if (!parsed.success) {
    return {
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    } as State;
  }

  const userExists = await getUserByName(parsed.data.name);
  if (userExists.length > 0) {
    return {
      message: "User already exists",
      errors: {
        name: "User with this name already exists"
      }
    } as State;
  }

  const newUser = {
    name: parsed.data.name,
    pass_hash: bcrypt.hashSync(parsed.data.password, bcrypt.genSaltSync(10))
  }

  const createdUser = await createUser(newUser);
  console.log('createdUser', createdUser);

  revalidatePath("/library");
  redirect("/library");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error; // re-throw so Next.js handles redirects correctly
  }
}

export async function handleRemoveBook(formData: FormData) {
  const session = await requireOwnerSession();

  if (!session?.user?.name) throw new Error('Not authenticated');
  const userId = Number((await getUserByName(session.user.name))[0].id); 

  const bookId = Number(formData.get('id'));

  await deleteBook(userId, bookId);

  revalidatePath("/library");
  redirect("/library");
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

  const session = await auth();
  const user = await getUserByName(session?.user?.name || '');

  const USER_ID = (user[0]?.id || 0);

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

  const session = await auth();
  const user = await getUserByName(session?.user?.name || '');

  const USER_ID = (user[0]?.id || 0);

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
