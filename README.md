# Portfolio

Personal portfolio website built with Next.js, React, and Tailwind CSS.

## Live Website

https://portfolio-tsr1.vercel.app/

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Nodemailer

## Features

- Responsive portfolio pages
- Project showcase
- Skills section
- Contact form API with email sending (owner + auto-reply)
- Smooth animations

## Project Structure

```
src/
	app/
		api/send/route.ts
		page.tsx
		about/page.tsx
		projects/page.tsx
		work/page.tsx
		certifications/page.tsx
		contact/page.tsx
	components/
public/
```

## Prerequisites

- Node.js 18.18+ (Node.js 20 recommended)
- pnpm (recommended) or npm

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

If pnpm is not installed, you can use:

```bash
npm install
```

2. Create a local environment file named `.env.local` in the project root.

3. Add required environment variables:

```env
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Note: `EMAIL_PASS` must be an App Password when using Gmail.

4. Run the development server:

```bash
pnpm dev
```

Or with npm:

```bash
npm run dev
```

Open http://localhost:3000

## Available Scripts

- `pnpm dev` / `npm run dev` - Start development server
- `pnpm build` / `npm run build` - Build production bundle
- `pnpm start` / `npm run start` - Start production server
- `pnpm lint` / `npm run lint` - Run ESLint checks

## Contact API

- Endpoint: `POST /api/send`
- File: `src/app/api/send/route.ts`
- Behavior:
	- Sends incoming contact message to site owner
	- Sends confirmation email to sender

## Email Flow Verification

This project includes a tested email flow using `EMAIL_USER` and `EMAIL_PASS` from `.env.local`.

1. Start the app:

```bash
pnpm dev
```

or

```bash
npm run dev
```

2. Test the API with a sample request:

```bash
curl -sS -w "\nHTTP_STATUS:%{http_code}\n" \
	-X POST http://localhost:3000/api/send \
	-H "Content-Type: application/json" \
	-d '{"name":"Flow Test","email":"your_email@gmail.com","message":"Testing contact API flow"}'
```

3. Expected result:

- Response contains `{"success":true}`
- HTTP status is `200`
- Dev server logs show `POST /api/send 200`

If email is not visible in inbox, check Spam/Promotions and confirm Gmail App Password is correct.

## Deployment

The app is deployment-ready for Vercel.

For production deployment, configure the same environment variables:

- `EMAIL_USER`
- `EMAIL_PASS`
