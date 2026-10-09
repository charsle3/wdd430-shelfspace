export interface LibraryBook {
    id: number,
    title: string,
    author: string,
    total_pages: number,
    progress: number,
    status: "reading" | "completed" | "want-to-read";
}

export interface BookDetail {
    id: number,
    title: string,
    author: string,
    total_pages: number,
    current_page: number,
    progress: number,
    description: string,
    rating: number,
    content: string,
}

export interface Book {
    id: number,
    title: string,
    author: string,
    total_pages: number,
    description: string,
    progress: number,
}