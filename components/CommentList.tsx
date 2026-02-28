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
        setError('Failed to load comments')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [postSlug])

  if (loading) {
    return <div className="text-gray-500 text-center py-8">Loading comments...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>
  }

  if (comments.length === 0) {
    return <div className="text-gray-500 text-center py-8">No comments yet.</div>
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
