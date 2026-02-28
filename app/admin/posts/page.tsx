import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import AdminPostsList from '@/components/AdminPostsList'

export const metadata: Metadata = {
  title: 'Gerenciar Artigos - Admin - PulseNews',
  description: 'Painel administrativo para gerenciar artigos do PulseNews',
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
  const postsPerPage = 15

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
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gerenciar Artigos</h1>
          <p className="text-gray-600">Total de {totalCount} artigos publicados</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Artigo
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
