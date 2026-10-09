import { sql } from '@vercel/postgres';

import type { LibraryBook, BookDetail, Book } from './types';

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

export async function getReviewsByBookAndUser(bookId: number, userId: number): Promise<{ rating: number, content: string } | null> {
    const result = await sql<{ rating: number, content: string }>`
        SELECT rating, content
        FROM reviews
        WHERE book_id = ${bookId} AND user_id = ${userId}`;

    return result.rows[0] ?? null;
}

export async function createBook(book: Omit<Book, 'id'>): Promise<Book> {
    // Insert the new book into the books table and create a corresponding library entry for the user
    // The user_id is hardcoded as 1 for now, to be replaced with the actual user ID once the authentication system is implemented.
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
        SELECT 1, id, 0
        FROM new_book;`;
    return result.rows[0];
}

export async function updateBook(id: number, book: Omit<Book, 'id'>): Promise<Book | null> {
    // Update the book details and set the progress to 50 for the corresponding library entry for user_id = 1
    const result = await sql<Book>`
        WITH updated_book AS (
            UPDATE books
            SET title = ${book.title}, author = ${book.author}, total_pages = ${book.total_pages}, description = ${book.description}
            WHERE id = ${id}
            RETURNING id
        )
        UPDATE library
        SET progress = ${book.progress}
        WHERE book_id IN (SELECT id FROM updated_book) AND user_id = 1;`;
    return result.rows[0] ?? null;
}

export async function createReview(review: { user_id: number, book_id: number, rating: number, content: string }): Promise<{ rating: number, content: string }> {
    const result = await sql<{ rating: number, content: string }>`
        INSERT INTO reviews (user_id, book_id, rating, content)
        VALUES (
            ${review.user_id},
            ${review.book_id},
            ${review.rating},
            ${review.content}
        )
        RETURNING rating, content`;
    return result.rows[0];
}

export async function deleteBook(id: number): Promise<boolean> {
    const result = await sql<Book>`
        DELETE FROM books
        WHERE id = ${id}
        RETURNING *`;
    return result.rows.length > 0;
}

export async function getUsers(): Promise<{ id: number, name: string, email: string }[]> {
    const result = await sql<{ id: number, name: string, email: string }>`SELECT * FROM users`;
    return result.rows;
}