'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Post } from '@/types'

interface AdminPostsListProps {
  posts: Post[]
  currentPage: number
  totalPages: number
}

export default function AdminPostsList({
  posts: initialPosts,
  currentPage,
  totalPages,
}: AdminPostsListProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean
    slug: string
    id: number
    title: string
  } | null>(null)

  const openDeleteModal = (slug: string, id: number, title: string) => {
    setConfirmModal({ open: true, slug, id, title })
  }

  const closeDeleteModal = () => {
    setConfirmModal(null)
  }

  const handleDelete = async () => {
    if (!confirmModal) return

    const { slug, id } = confirmModal
    closeDeleteModal()
    setDeletingId(id)
    setError(null)

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Falha ao excluir artigo')
      }

      // Remove post from local state
      setPosts((prev) => prev.filter((p) => p.id !== id))
      setDeletingId(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao excluir artigo')
      setDeletingId(null)
    }
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 mb-6 flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Título
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Categoria
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Autor
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H9l-4 4v-4z" />
                    </svg>
                    <p>Nenhum artigo encontrado</p>
                  </td>
                </tr>
              ) : (
                posts.map((post, index) => (
                  <tr
                    key={post.id}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium max-w-xs truncate">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {post.author}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(post.published_at).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-3">
                      <a
                        href={`/admin/posts/${post.id}/edit`}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </a>
                      <button
                        onClick={() => openDeleteModal(post.slug, post.id, post.title)}
                        disabled={deletingId === post.id}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-medium transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        {deletingId === post.id ? 'Excluindo...' : 'Excluir'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between gap-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div>
            {currentPage > 1 ? (
              <Link
                href={`/admin/posts?page=${currentPage - 1}`}
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

          <span className="text-gray-700 font-medium">
            Página {currentPage} de {totalPages}
          </span>

          <div>
            {currentPage < totalPages ? (
              <Link
                href={`/admin/posts?page=${currentPage + 1}`}
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
      )}

      {/* Delete Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Excluir Artigo</h3>
            </div>

            <p className="text-gray-600 mb-2">
              Tem certeza de que deseja excluir o artigo:
            </p>
            <p className="text-gray-900 font-semibold mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
              &ldquo;{confirmModal.title}&rdquo;
            </p>
            <p className="text-sm text-red-600 mb-6">
              Esta ação não pode ser desfeita.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
