import Link from 'next/link'

interface PaginationProps {
  current: number
  total: number
  totalCount?: number
  searchQuery?: string
  categoryQuery?: string
}

function getPageNumbers(current: number, total: number): (number | null)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | null)[] = []

  pages.push(1)

  if (current > 3) {
    pages.push(null)
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push(null)
  }

  pages.push(total)

  return pages
}

export default function Pagination({ current, total, totalCount, searchQuery, categoryQuery }: PaginationProps) {
  const hasPrev = current > 1
  const hasNext = current < total
  const pages = getPageNumbers(current, total)

  const buildLink = (page: number) => {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    if (searchQuery) params.set('q', searchQuery)
    if (categoryQuery) params.set('category', categoryQuery)
    return `/?${params.toString()}`
  }

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="flex items-center gap-1.5">
        {hasPrev ? (
          <Link
            href={buildLink(current - 1)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
            aria-label="Página anterior"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-100 text-gray-300 cursor-not-allowed">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </span>
        )}

        {pages.map((page, idx) =>
          page === null ? (
            <span key={`ellipsis-${idx}`} className="inline-flex items-center justify-center w-10 h-10 text-gray-400 text-sm">
              ...
            </span>
          ) : page === current ? (
            <span
              key={page}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white font-semibold text-sm"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={buildLink(page)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm"
            >
              {page}
            </Link>
          )
        )}

        {hasNext ? (
          <Link
            href={buildLink(current + 1)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
            aria-label="Próxima página"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-100 text-gray-300 cursor-not-allowed">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </div>

      {totalCount !== undefined && (
        <p className="text-sm text-gray-500">
          {totalCount} artigos no total
        </p>
      )}
    </div>
  )
}
