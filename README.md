This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
## Project Description

ShelfSpace is a personal reading tracker that helps readers organize books they want to read, are currently reading, or have completed. Users can manage their personal library, update reading progress, and leave ratings or reviews for completed books.

## Product Demo Summary

ShelfSpace is designed for readers who want a simple way to keep their reading activity organized in one place. Instead of tracking books through notes or separate tools, users can maintain a personal library containing books they want to read, are currently reading, or have completed.

The main user flow begins when a user signs in and opens their personal library. From there, they can add or select a book, update its progress and reading status, and leave a rating or review. This gives readers a centralized way to track their reading journey and preserve their thoughts about completed books.

## Contributors

- James Kingsley
- Andrea Ramos

## Setup

After cloning the repository, install the required dependencies:

```bash
npm install
```

Generate an Auth.js secret:

```bash
npx auth secret
```

Save the generated secret in a `.env.local` file:

```env
AUTH_SECRET=your-generated-secret
```

### Configure Vercel and Neon Postgres

To connect the project to Vercel and provision the database:

1. Log in to [Vercel](https://vercel.com/).

2. Select **Add New → Project** and import the **ShelfSpace** GitHub repository.

3. Confirm that the framework preset is detected as **Next.js**.

4. Select **Deploy** and wait for the initial deployment to complete.

5. Open the project in the Vercel dashboard.

6. In the left sidebar, select **Storage**, then choose **Create Database**.

7. Select **Neon (Serverless Postgres)** and click **Continue**.

8. Choose the recommended database region or the region closest to your location.

9. Leave Neon built-in authentication disabled.

10. Confirm that the free hobby-tier plan is selected.

11. Enter a resource name for the database, for example:

```text
shelfspace-db
```

12. Click **Create** and wait for the database provisioning process to finish.

13. Select **Continue** to open the **Connect a Project** settings.

14. Keep the default settings and select **Connect Project**.

Vercel will automatically add the required database environment variables to the deployed project.

### Connect the Local Project to Vercel

From the local repository, run:

```bash
vercel link
```

Select the ShelfSpace project when prompted.

Then pull the project's environment variables:

```bash
vercel env pull .env.local
```

Confirm that `.env.local` contains the following variables:

```env
VERCEL_OIDC_TOKEN=
POSTGRES_URL=
AUTH_SECRET=
```

If `.env.local` is not already ignored by Git, add it to `.gitignore`:

```text
.env.local
```

> Do not commit `.env.local` or any authentication or database credentials to the repository.

Please refer to the **Data Model** section below when creating the appropriate schema for the Vercel Postgres database before initial use.

### Required Environment Variables

- `VERCEL_OIDC_TOKEN`
- `POSTGRES_URL`
- `AUTH_SECRET`

## Deployment on Vercel

https://wdd430-shelfspace.vercel.app/

## Access Instructions

ShelfSpace uses **Auth.js v5 with a Credentials provider** for authentication. Users must be signed in to access their personal library and book information.

### Demo Account

Use the following credentials to test the application:

- **Username:** John Doe
- **Password:** qwerty

Alternatively, you may create your own account using the Sign Up page.

### Testing the Application

1. Open the deployed application: https://wdd430-shelfspace.vercel.app/

2. Select **Log In** and sign in using the demo credentials above.

3. Open **My Library** to view the books associated with the authenticated account.

4. Select **Add Book** to create a new book and add it to the user's library.

5. Select a book from the library to open its detail page and view:
   - Title and author
   - Description
   - Total pages
   - Current reading progress
   - Reading status
   - Rating and review, when available

6. Select **Edit Book** to update book information, reading progress, or reading status.

7. Test the review functionality by adding or updating a rating and review for a book.

8. Test the delete/remove functionality to confirm that a book can be removed from the user's library.

9. Log out to confirm that authenticated routes are no longer accessible without a valid session.

## API Documentation

ShelfSpace uses Next.js Route Handlers for retrieving book data. Create, update, and delete operations are handled through Next.js Server Actions.

- GET /api/library -- Requires logged in user
  - returns all books associated with authenticated user in the following format:
  - {id: number,
    title: string,
    author: string,
    total_pages: number,
    progress: number,
    status: "reading" | "completed" | "want-to-read";}

- GET /api/books/[id] -- requires logged in user
  - returns specified book and any review of said book, as associated with authenticated user in the following format:
  - {id: number,
    title: string,
    author: string,
    total_pages: number,
    current_page: number,
    progress: number,
    description: string,
    rating: number,
    content: string,
    status: "reading" | "completed" | "want-to-read";
    }, {
    rating: number;
    content: string;
    }

## Component Architecture

app/
│
├── layout.tsx
├── page.tsx
│
├── login/
│   └── page.tsx
│
├── signup/
│   └── page.tsx
│
├─  library/
│   ├── page.tsx
│   ├── loading.tsx
│   └── error.tsx
│
├── books/
│   │
│   ├── add/
│   │   └── page.tsx
│   │
│   └── [id]/
│       ├── page.tsx
│       └── edit/
│           └── page.tsx
│
└── api/
    ├── library/
    │   └── route.ts
    │
    └── books/
        └── [id]/
            └── route.ts
    

lib/
│
├── actions.ts
├── types.ts
└── connect.ts

components/
├── Header.tsx
├── NavBar.tsx
├── Footer.tsx
├── ProgressBar.tsx
├── EditForm.tsx
├── AddBookForm.tsx
├── LibraryFilters.tsx
├── ReviewSection.tsx
├── BookCard.tsx
└── BookList.tsx

## Design Theme & Branding
Color palette
Primary        #355E3B   Forest Green
Primary Dark   #24452A
Background     #F7F4ED   Warm Cream
Surface        #FFFFFF
Secondary      #D8C7A3   Soft Beige
Accent         #A2674A   Warm Terracotta
Text Primary   #2B2B2B
Success        #4F7C59
Error          #B44C4C

Typography
Headings:
Playfair Display

Body/UI:
Inter

## Data Model

Library 
{
    "userId": number required
    "bookId": number required
    "progress": number 
}

User
{
    "id": number required,
    "name": string required,
    "passHash": string required
}

Book
{
    "id": number required,
    "title": string required,
    "author": string required,
    "totalPages?": number,
    "description?": string,
    "createdAt": Date
}

Review
{
    "id": number required,
    "userId": number required,
    "bookId": number required,
    "rating": number required,
    "content": string required
}

## Known Issues and Opportunities for Improvement

ShelfSpace currently provides the core functionality required for managing a personal reading library, but there are several opportunities for future improvement.

- Book cover images are not currently supported. A future version could allow users to upload covers or retrieve them from an external books API.
- Additional automated testing could be added for API routes, authentication, and CRUD operations.
- Accessibility could be further improved through additional keyboard navigation and screen-reader testing.
