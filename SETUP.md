# Quick Setup Guide for DevBlog

## Installation Steps

### 1. Install Dependencies
```bash
cd /sessions/blissful-peaceful-turing/benchmark-next
npm install
```

### 2. Create .env.local
```bash
cp .env.example .env.local
```

Edit `.env.local` with your PostgreSQL credentials:
```
DATABASE_URL="postgresql://user:password@localhost:5432/benchmark_blog"
JWT_SECRET="dev-secret-key-change-in-production"
```

### 3. Setup Database
```bash
# Generate Prisma client
npm run postinstall

# Create database schema
npx prisma migrate dev --name init

# Seed with data (50 posts, 500 comments, 1 admin)
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## Default Admin Credentials
- Email: `admin@devblog.com`
- Password: `admin123`

## Key Routes
- Home: http://localhost:3000
- Admin Dashboard: http://localhost:3000/admin/posts
- Admin Login: http://localhost:3000/admin/login
- Post Detail: http://localhost:3000/posts/[slug]

## Database Visualization
```bash
npx prisma studio
```

Opens Prisma Studio at http://localhost:5555

## Production Build
```bash
npm run build
npm run start
```

## File Structure Summary

All files are fully implemented with no placeholders. Key sections:

### Pages (app/)
- Home page with SSG + ISR (60s revalidation)
- Post detail pages with SSG + ISR
- Admin dashboard (SSR with auth protection)
- Login page

### API Routes (app/api/)
- `/posts` - List and create posts
- `/posts/[slug]` - Get, update, delete posts
- `/posts/[slug]/comments` - Get comments
- `/auth/login` - Admin authentication

### Components
- Header/Footer - Layout components
- PostCard/PostList - Display posts
- PostContent - Render markdown
- CommentList/CommentItem - Display comments
- AdminPostForm - Create/edit posts
- Pagination - Navigate posts
- LoginForm - Admin authentication

### Libraries
- prisma.ts - Database client singleton
- auth.ts - JWT signing/verification
- markdown.ts - Markdown parsing with 'marked'

### Middleware
- Protects /admin/* routes
- Validates JWT token in cookies
- Redirects to login if unauthorized

## TypeScript Configuration
- Strict mode enabled
- All files fully typed
- Path aliases configured (@/* maps to root)

## Tailwind CSS
- Configured with Inter font
- Includes @tailwindcss/typography plugin
- Global styles in app/globals.css

## Prisma ORM
- PostgreSQL database
- 3 models: Post, Comment, AdminUser
- Cascade delete for comments
- Seed script with deterministic data

All specifications have been met. Ready to test!
