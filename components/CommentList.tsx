'use client'

import { useEffect, useState } from 'react'
import type { Comment } from '@/types'
import CommentItem from './CommentItem'

interface CommentListProps {
  postSlug: string
}

export default function CommentList({ postSlug }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/posts/${postSlug}/comments`)
        if (!response.ok) {
          throw new Error('Failed to fetch comments')
        }
        const data = await response.json()
        setComments(data.comments || [])
      } catch (err) {
        setError('Falha ao carregar comentários')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [postSlug])

  if (loading) {
    return (
      <div className="text-gray-500 text-center py-12">
        <div className="inline-block">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-2">Carregando comentários...</p>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center py-8 bg-red-50 rounded-lg">{error}</div>
  }

  if (comments.length === 0) {
    return (
      <div className="text-gray-500 text-center py-12 bg-gray-50 rounded-lg">
        <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Comentários ({comments.length})
      </h3>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
