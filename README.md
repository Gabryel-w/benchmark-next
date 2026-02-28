# DevBlog - Next.js 14 Blog Application

A high-performance blog application built with Next.js 14, TypeScript, Tailwind CSS, and Prisma ORM. This application is designed for benchmarking Next.js performance against Nuxt.

## Features

- Full-stack blog application with admin dashboard
- Server-side rendering and static generation
- JWT-based authentication for admin users
- PostgreSQL database with Prisma ORM
- Markdown support for blog posts
- Comment system
- Responsive design with Tailwind CSS
- TypeScript for type safety

## Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and update it with your database credentials:

```bash
cp .env.example .env.local
```

Update `.env.local`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/benchmark_blog"
JWT_SECRET="your-secret-key-here"
```

### 3. Setup Database

Generate Prisma client:
```bash
npm run postinstall
```

Create and seed the database:
```bash
npx prisma migrate dev --name init
npm run seed
```

This will:
- Create all database tables
- Seed 50 blog posts with realistic content
- Add 10 comments per post (500 total comments)
- Create an admin user (email: `admin@devblog.com`, password: `admin123`)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Access Admin Dashboard

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Login with:
   - Email: `admin@devblog.com`
   - Password: `admin123`

## Project Structure

```
benchmark-next/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── posts/[slug]/            # Post detail pages
│   ├── admin/                   # Admin dashboard
│   └── api/                     # API routes
├── components/                  # React components
├── lib/                        # Utility functions
├── prisma/                     # Database schema and seed
├── types/                      # TypeScript type definitions
├── middleware.ts               # Next.js middleware
├── tailwind.config.ts          # Tailwind CSS config
└── next.config.js             # Next.js configuration
```

## API Routes

### Posts
- `GET /api/posts` - List all published posts with pagination
- `GET /api/posts/:slug` - Get a single post
- `GET /api/posts/:slug/comments` - Get comments for a post
- `POST /api/posts` - Create a new post (admin only)
- `PUT /api/posts/:slug` - Update a post (admin only)
- `DELETE /api/posts/:slug` - Delete a post (admin only)

### Authentication
- `POST /api/auth/login` - Admin login

## Rendering Strategies

- **Home Page** (`/`): Static generation with revalidation every 60 seconds
- **Post Detail** (`/posts/[slug]`): Static generation with incremental static regeneration
- **Admin Pages** (`/admin/*`): Server-side rendering with authentication
- **Comments Section**: Client-side rendering with fetch

## Authentication

- Admin authentication uses JWT (JSON Web Tokens)
- Tokens are stored in httpOnly cookies for security
- Middleware automatically protects `/admin/*` routes
- Default admin credentials are provided for testing

## Performance Considerations

- Server Components for static content
- Client Components only where necessary (forms, interactivity)
- Image optimization with Next.js Image component
- Font optimization with Next.js Font module
- CSS-in-JS with Tailwind CSS for minimal runtime overhead
- ISR for frequently accessed posts
- Database query optimization with Prisma

## Database Schema

### Posts
- `id`: Unique identifier
- `title`: Post title (max 100 characters)
- `slug`: URL-friendly identifier (unique)
- `content`: Post content in Markdown format
- `excerpt`: Short description (max 200 characters)
- `published_at`: Publication timestamp
- `updated_at`: Last update timestamp
- `author`: Author name

### Comments
- `id`: Unique identifier
- `post_id`: Reference to Post
- `author_name`: Comment author
- `content`: Comment text (max 500 characters)
- `created_at`: Creation timestamp

### AdminUsers
- `id`: Unique identifier
- `email`: Admin email (unique)
- `password_hash`: Bcrypt hashed password

## Building for Production

```bash
npm run build
npm run start
```

## Development Tools

- **TypeScript**: For type safety
- **Prisma Studio**: Inspect database visually
  ```bash
  npx prisma studio
  ```
- **Prisma Migrations**: Manage schema changes
  ```bash
  npx prisma migrate dev
  ```

## Notes for Benchmarking

This application is optimized for consistent performance measurement:

- Deterministic seed data (50 posts, 500 comments)
- No external API dependencies
- Local PostgreSQL database recommended
- Production build recommended for accurate benchmarks
- Use lighthouse or similar tools for performance metrics

## License

MIT
