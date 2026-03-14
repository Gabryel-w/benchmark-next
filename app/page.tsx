import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { fetchRssPosts, mergeAndPaginate } from '@/lib/rss'
import PostList from '@/components/PostList'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'

export const metadata: Metadata = {
  title: 'DevBlog - Seu portal de notícias e artigos',
  description: 'Acompanhe as principais notícias sobre tecnologia, economia, saúde, ciência, esportes, cultura, política e meio ambiente.',
  openGraph: {
    title: 'DevBlog',
    description: 'Acompanhe as principais notícias sobre tecnologia, economia, saúde, ciência, esportes, cultura, política e meio ambiente.',
    type: 'website',
  },
}

export const revalidate = 60

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string; category?: string }>
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || '1', 10))
  const searchQuery = params.q || ''
  const categoryQuery = params.category || ''
  const postsPerPage = 9

  const [rssPosts, dbPosts] = await Promise.all([
    fetchRssPosts(),
    prisma.post.findMany({ orderBy: { published_at: 'desc' } }),
  ])

  const { posts, total: totalCount } = mergeAndPaginate(rssPosts, dbPosts, {
    page: currentPage,
    perPage: postsPerPage,
    q: searchQuery || undefined,
    category: categoryQuery || undefined,
  })

  const totalPages = Math.ceil(totalCount / postsPerPage)

  return (
    <div className="w-full">
      {/* Hero Section */}
      {currentPage === 1 && !searchQuery && !categoryQuery && (
        <div className="bg-gray-50 border-b border-gray-100 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
                DevBlog<span className="text-indigo-600">.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 font-normal max-w-2xl mb-2">
                Seu portal de notícias e artigos
              </p>
              <p className="text-base text-gray-400">
                As principais notícias sobre tecnologia, economia, saúde, ciência, esportes, cultura, política e meio ambiente, tudo em um só lugar.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <SearchBar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Filter Info */}
        {(searchQuery || categoryQuery) && (
          <div className="mb-8 p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
            <p className="text-indigo-800">
              {searchQuery && categoryQuery ? (
                <>
                  Mostrando resultados para <strong>&quot;{searchQuery}&quot;</strong> na categoria <strong>{categoryQuery}</strong>
                </>
              ) : searchQuery ? (
                <>
                  Mostrando resultados para <strong>&quot;{searchQuery}&quot;</strong>
                </>
              ) : (
                <>
                  Mostrando artigos da categoria <strong>{categoryQuery}</strong>
                </>
              )}
            </p>
          </div>
        )}

        {posts.length > 0 ? (
          <>
            <PostList posts={posts} featured={currentPage === 1 && !searchQuery && !categoryQuery} />
            {totalPages > 1 && (
              <div className="mt-16">
                <Pagination
                  current={currentPage}
                  total={totalPages}
                  totalCount={totalCount}
                  searchQuery={searchQuery}
                  categoryQuery={categoryQuery}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H9l-4 4v-4z" />
            </svg>
            <p className="text-gray-500 text-lg">
              {searchQuery || categoryQuery
                ? 'Nenhum artigo encontrado. Tente uma busca diferente.'
                : 'Nenhum artigo disponível no momento.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
