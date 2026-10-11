import { sql } from '@vercel/postgres';
import type { LibraryBook, BookDetail, Book } from './types';
export interface Review {
  rating: number;
  content: string;
}

export async function getBooksByUserId(id: number): Promise<LibraryBook[]> {
    const result = await sql<LibraryBook>`
        SELECT 
            b.id,
            b.title,
            b.author,
            b.total_pages,
            l.progress,
            CASE
                WHEN l.progress = 0 THEN 'want-to-read'
                WHEN l.progress = 100 THEN 'completed'
                ELSE 'reading'
            END AS status
        FROM books as b
        JOIN library as l ON b.id = l.book_id
        WHERE l.user_id = ${id}`;

    return result.rows;
}

export async function getBookById(bookId: number, userId: number): Promise<BookDetail | null> {
    const result = await sql<BookDetail>`
        SELECT 
            b.id,
            b.title,
            b.author,
            b.total_pages,
            l.progress,
            CASE
                WHEN l.progress = 0 THEN 'want-to-read'
                WHEN l.progress = 100 THEN 'completed'
                ELSE 'reading'
            END AS status,
            b.description
        FROM books as b
            JOIN library as l ON b.id = l.book_id
        WHERE b.id = ${bookId} AND l.user_id = ${userId}`;

    if (result.rows[0]) {

        result.rows[0].current_page = Math.round(result.rows[0].progress * result.rows[0].total_pages / 100);
        
    }
    return result.rows[0] ?? null;
}

export async function getReviewsByBookAndUser(
  bookId: number,
  userId: number
): Promise<Review | null> {
  const result = await sql<Review>`
    SELECT rating, content
    FROM reviews
    WHERE book_id = ${bookId}
      AND user_id = ${userId};
  `;

  return result.rows[0] ?? null;
}

export async function createBook(userId: number, book: Omit<Book, 'id'>): Promise<Book> {
    // Insert the new book into the books table and create a corresponding library entry for the user
    const result = await sql<Book>`
        WITH new_book AS (
            INSERT INTO books (title, author, total_pages, description)
            VALUES (
                ${book.title},
                ${book.author},
                ${book.total_pages},
                ${book.description}
            )
            RETURNING id
        )
        INSERT INTO library (user_id, book_id, progress)
        SELECT ${userId}, id, 0
        FROM new_book;`;
    return result.rows[0];
}

export async function updateBook(id: number, book: Book): Promise<Book | null> {
    // Update the book details and set the progress to 50 for the corresponding library entry for user with the given ID
    const result = await sql<Book>`
        WITH updated_book AS (
            UPDATE books
            SET title = ${book.title}, author = ${book.author}, total_pages = ${book.total_pages}, description = ${book.description}
            WHERE id = ${book.id}
            RETURNING id, title, author, total_pages, description
        ),
        updated_library AS (
            UPDATE library
            SET progress = ${book.progress}
            WHERE book_id IN (SELECT id FROM updated_book)
            AND user_id = ${id}
            RETURNING book_id, progress
        )
        SELECT
        b.id,
        b.title,
        b.author,
        b.total_pages,
        b.description,
        l.progress
        FROM updated_book as b
        JOIN updated_library as l ON b.id = l.book_id;`;
    return result.rows[0] ?? null;
}

export async function createReview(review: {
  user_id: number;
  book_id: number;
  rating: number;
  content: string;
}): Promise<Review | null> {
  const result = await sql<Review>`
    INSERT INTO reviews (
      user_id,
      book_id,
      rating,
      content
    )
    SELECT
      ${review.user_id},
      ${review.book_id},
      ${review.rating},
      ${review.content}
    WHERE EXISTS (
      SELECT 1
      FROM library
      WHERE user_id = ${review.user_id}
        AND book_id = ${review.book_id}
    )
    AND NOT EXISTS (
      SELECT 1
      FROM reviews
      WHERE user_id = ${review.user_id}
        AND book_id = ${review.book_id}
    )
    RETURNING rating, content;
  `;

  return result.rows[0] ?? null;
}

export async function updateReview(
  bookId: number,
  userId: number,
  rating: number,
  content: string
): Promise<Review | null> {
  const result = await sql<Review>`
    UPDATE reviews
    SET
      rating = ${rating},
      content = ${content}
    WHERE book_id = ${bookId}
      AND user_id = ${userId}
      AND EXISTS (
        SELECT 1
        FROM library
        WHERE book_id = ${bookId}
          AND user_id = ${userId}
      )
    RETURNING rating, content;
  `;

  return result.rows[0] ?? null;
}

export async function deleteReview(
  bookId: number,
  userId: number
): Promise<boolean> {
  const result = await sql`
    DELETE FROM reviews
    WHERE book_id = ${bookId}
      AND user_id = ${userId}
    RETURNING book_id;
  `;

  return result.rows.length > 0;
}

export async function getUserByName(name: string): Promise<{ id: number, name: string, pass_hash: string }[]> {
    const result = await sql<{ id: number, name: string, pass_hash: string }>`SELECT * FROM users WHERE name = ${name}`;
    return result.rows;
}

export async function createUser(user: { name: string, pass_hash: string }): Promise<{ id: number, name: string}> {
    const result = await sql<{ id: number, name: string }>`
        INSERT INTO users (name, pass_hash)
        VALUES (
            ${user.name},
            ${user.pass_hash}
        )
        RETURNING id, name`;
    return result.rows[0];
}

export async function deleteBook(userId: number, bookId: number): Promise<void> {
    await sql`
        DELETE FROM library
        WHERE user_id = ${userId} AND book_id = ${bookId}`;
}