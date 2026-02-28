import Link from 'next/link'

interface PaginationProps {
  current: number
  total: number
  perPage?: number
}

export default function Pagination({ current, total, perPage = 10 }: PaginationProps) {
  const hasPrev = current > 1
  const hasNext = current < total
  const prevPage = current - 1
  const nextPage = current + 1

  return (
    <div className="flex items-center justify-center gap-4">
      {hasPrev ? (
        <Link
          href={`/?page=${prevPage}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Previous
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed"
        >
          Previous
        </button>
      )}

      <div className="flex items-center gap-2">
        <span className="text-gray-600">
          Page <span className="font-bold text-gray-900">{current}</span> of{' '}
          <span className="font-bold text-gray-900">{total}</span>
        </span>
      </div>

      {hasNext ? (
        <Link
          href={`/?page=${nextPage}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Next
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed"
        >
          Next
        </button>
      )}
    </div>
  )
}
