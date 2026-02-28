'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Post } from '@/types'

interface AdminPostsListProps {
  posts: Post[]
  currentPage: number
  totalPages: number
}

export default function AdminPostsList({
  posts,
  currentPage,
  totalPages,
}: AdminPostsListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (slug: string, id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return
    }

    setDeletingId(id)
    setError(null)

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete post')
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post')
      setDeletingId(null)
    }
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr
                  key={post.id}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {post.author}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2 flex gap-2">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug, post.id)}
                      disabled={deletingId === post.id}
                      className="text-red-600 hover:text-red-700 font-medium disabled:text-gray-400"
                    >
                      {deletingId === post.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          {currentPage > 1 ? (
            <Link
              href={`/admin/posts?page=${currentPage - 1}`}
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

          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Link
              href={`/admin/posts?page=${currentPage + 1}`}
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
      )}
    </>
  )
}
