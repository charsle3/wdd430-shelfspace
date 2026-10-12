This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Contributors

James Kingsley
Andrea Ramos

## Setup

After cloning the repository, run npm install to get all the dependencies such as neon, bcryptjs, and zod.
run the following command: "npx auth secret" and save the resulting string in .env.local as 'AUTH_SECRET'.
To connect your local deployment to Vercel for database functionality please do the following:
Login to vercel.com.
Select Add New → Project and import the Shelfsapce GitHub repository.
Confirm the framework preset is detected as Next.js.
Select Deploy and wait for the deployment to complete.
Open your project on vercel.com.
In the left sidebar, click Storage, then click Create Database.
Select Neon (Serverless Postgres) and click Continue.
On the next screen, choose the recommended database region or the region that is closest to your location.
Leave the Auth (built-in authentication) unselected, which should be the default.
Under the installation plan, confirm that you have the free, hobby-tier plan selected.
Give the Resource Name (database name) a name (for example, shelfspace-db).
Click Create. The data provisioning process will run and may take a minute.
Click Continue to view the Connect a Project settings. You do not need to change any of the default settings.
Click Connect Project. Vercel will automatically add database environment variables to the project.

Then link your local project folder and pull the variables:
(terminal commands in local repository)
    vercel link          (select your shelfspace project when prompted)
    vercel env pull .env.local
Confirm that .env.local now contains a POSTGRES_URL and VERCEL_OIDC_TOKEN variables before continuing.
Add .env.local to your .gitignore file if it is not already listed.

Please refer to the Data Models to build the appropriate schema for your Vercel Postgres database before initial use.

Required .env variables:
  - VERCEL_OIDC_TOKEN
  - POSTGRES_URL
  - AUTH_SECRET


## Description

ShelfSpace is a personal reading tracker that helps readers organize books they want to read, are currently reading, or have completed. Users manage their personal library, update reading progress, and leave ratings or reviews for completed books.  

## Deployment on Vercel

https://wdd430-shelfspace.vercel.app/


## API Documentation

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
