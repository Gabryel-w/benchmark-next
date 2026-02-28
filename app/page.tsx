import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import PostList from '@/components/PostList'
import Pagination from '@/components/Pagination'

export const metadata: Metadata = {
  title: 'Home - DevBlog',
  description: 'Welcome to DevBlog, a high-performance blog platform',
  openGraph: {
    title: 'DevBlog',
    description: 'Welcome to DevBlog, a high-performance blog platform',
    type: 'website',
  },
}

export const revalidate = 60

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || '1', 10))
  const postsPerPage = 10

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
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to DevBlog</h1>
        <p className="text-lg text-gray-600">
          Discover articles about web development, performance optimization, and modern technologies.
        </p>
      </section>

      {posts.length > 0 ? (
        <>
          <PostList posts={posts} />
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                current={currentPage}
                total={totalPages}
                perPage={postsPerPage}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts available yet.</p>
        </div>
      )}
    </div>
  )
}
