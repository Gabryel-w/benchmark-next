import Link from 'next/link'

interface PaginationProps {
  current: number
  total: number
  perPage?: number
  searchQuery?: string
  categoryQuery?: string
}

export default function Pagination({ current, total, perPage = 10, searchQuery, categoryQuery }: PaginationProps) {
  const hasPrev = current > 1
  const hasNext = current < total
  const prevPage = current - 1
  const nextPage = current + 1

  // Build links that preserve query parameters
  const buildLink = (page: number) => {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    if (searchQuery) params.set('q', searchQuery)
    if (categoryQuery) params.set('category', categoryQuery)
    return `/?${params.toString()}`
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 px-6 bg-gray-50 rounded-lg border border-gray-100">
      <div className="order-2 md:order-1">
        {hasPrev ? (
          <Link
            href={buildLink(prevPage)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </Link>
        ) : (
          <button
            disabled
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed font-medium opacity-60"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>
        )}
      </div>

      <div className="order-1 md:order-2 text-center">
        <div className="text-gray-700 font-medium">
          Página <span className="font-bold text-gray-900">{current}</span> de{' '}
          <span className="font-bold text-gray-900">{total}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{total * perPage} artigos no total</p>
      </div>

      <div className="order-3">
        {hasNext ? (
          <Link
            href={buildLink(nextPage)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Próxima
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <button
            disabled
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed font-medium opacity-60"
          >
            Próxima
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
