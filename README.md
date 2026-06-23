# Digital Wedding Invitation & Management Platform 💍

A premium, production-ready digital wedding platform built with modern web technologies. This application serves as a dynamic, interactive, and elegant wedding invitation, featuring a fully functional RSVP system, event timelines, multi-language support, and bespoke animations.

## Key Features

- **Elegant UI & Typography**: Custom-styled with Tailwind CSS v4, utilizing elegant font pairings (Playfair Display, Great Vibes, Montserrat) for a luxurious feel.
- **Dynamic Animations**: Smooth, sophisticated micro-animations and scroll effects powered by Framer Motion.
- **Comprehensive RSVP System**: Integrated with Supabase, handling attendance, event selection, dietary requirements, and party sizes with robust validation.
- **Event Timeline & Details**: Interactive schedule timeline, dress code guidelines, and location maps.
- **Multi-Language Support**: Built-in context provider (`WeddingContext`) to seamlessly switch between languages (e.g., English, Italian, German).
- **Interactive Elements**: Dynamic countdown timer to the big day, integrated image galleries, and a "Wedding Gift" section.
- **Maintenance Mode**: Config-driven maintenance toggle (`wedding-config.ts`) to easily hide the site while updates are being made.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend/Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Audio**: [Howler.js](https://howlerjs.com/) (For background ambient audio)
- **Language**: TypeScript

## 📁 Project Structure

```text
├── app/                  # Next.js App Router pages and API routes
│   ├── api/rsvp/         # API endpoint for handling RSVP submissions
│   ├── layout.tsx        # Root layout with global fonts and styles
│   └── page.tsx          # Main landing page assembling all sections
├── components/           # Reusable React components
│   ├── providers/        # Context providers (e.g., WeddingContext)
│   ├── sections/         # Page sections (Hero, RSVP, Timeline, etc.)
│   └── ui/               # Core UI components (Buttons, Animated wrappers)
├── lib/                  # Utility functions and configurations
│   ├── supabase.ts       # Supabase client initialization
│   ├── wedding-config.ts # Global configuration and feature flags
│   └── utils.ts          # Helper functions
├── public/               # Static assets (images, fonts, audio)
└── tailwind.config.ts    # Tailwind configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun
- A Supabase account and project

### 1. Clone the repository

```bash
git clone <repository-url>
cd wedding-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup (Supabase)

Create a table named `rsvp_responses` in your Supabase database with the following schema:
- `id` (uuid, primary key)
- `guest_name` (text)
- `email` (text)
- `attending` (boolean)
- `events` (text array)
- `num_guests` (integer)
- `children` (boolean)
- `children_details` (jsonb)
- `meal_preference` (text)
- `message` (text)
- `created_at` (timestamp)

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##  Configuration

Global settings such as event dates, maintenance mode, and feature flags can be toggled inside `lib/wedding-config.ts`.

##  Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/):

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the Vercel Environment Variables.
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

##  License

This project is proprietary and confidential. All rights reserved.
