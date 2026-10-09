'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createBook, updateBook } from './connect';

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