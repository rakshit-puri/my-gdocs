# My Docs

This is a collaborative document editing app built with [Next.js](https://nextjs.org), powered by [Convex](https://convex.dev) for real-time backend data and [Clerk](https://clerk.com) for authentication. The app enables multiple users to edit documents together in real time, making it ideal for teams and individuals who need seamless, collaborative text editing.

## Features

- ✍️ **Collaborative Text Editing:** Multiple users can edit documents simultaneously with real-time updates.
- 🔒 **Authentication:** Secure sign-in and user management with Clerk.
- ⚡ **Realtime Backend:** Uses Convex for instant data sync and storage.
- 🖥️ **Modern UI:** Built with Next.js and Tailwind CSS for a fast, responsive experience.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, start the Convex backend in a separate terminal:

```bash
npx convex dev
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Configuration

Create a `.env.local` file and set the following environment variables:

- `NEXT_PUBLIC_CONVEX_URL` – Your Convex deployment URL.
- Clerk environment variables as required by [Clerk's Next.js integration](https://clerk.com/docs/quickstarts/nextjs).

## Project Structure

- `src/` – Main application source code.
- `convex/` – Convex backend functions and schema.
- `public/` – Static assets and SVG icons.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Clerk Documentation](https://clerk.com/docs)

## Deploy

The easiest way to deploy your Next.js app is with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.