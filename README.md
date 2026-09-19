This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
├── profile/
│   └── page.tsx
│
└── api/
    ├── library/
    │   └── route.ts
    │
    ├── books/
    │   ├── route.ts
    │   └── [id]/
    │       └── route.ts
    │
    └── profile/

        └── route.ts

components/
│
├── Header.tsx
├── NavBar.tsx
├── Footer.tsx
├── ProgressBar.tsx
├── BookCard.tsx
├── BookList.tsx
└── error.tsx

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

User

{
    "id": string required,
    "name": string required,
    "library?": [ {
        "bookId": string required,
        "progress": number required
    } ],
    "passHash": string required
}

Book
{
    "id": string required,
    "title": string required,
    "author": string required,
    "totalPages?": number,
    "description?": string,
    "createdAt": Date
}

Review
{
    "id": string required,
    "userId": string required,
    "bookId": string required,
    "rating": number required,
    "content": string required
}

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributors

James Kingsley
Andrea Ramos