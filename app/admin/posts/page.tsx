import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import AdminPostsList from '@/components/AdminPostsList'

export const metadata: Metadata = {
  title: 'Manage Posts - Admin - DevBlog',
  description: 'Admin panel for managing blog posts',
  robots: {
    index: false,
    follow: false,
  },
}

export const revalidate = 0

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function AdminPostsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || '1', 10))
  const postsPerPage = 20

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      orderBy: { published_at: 'desc' },
      skip: (currentPage - 1) * postsPerPage,
      take: postsPerPage,
    }),
    prisma.post.count(),
  ])

  const totalPages = Math.ceil(totalCount / postsPerPage)

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Post
        </Link>
      </div>

      <AdminPostsList
        posts={posts}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  )
}
