import type { Comment } from '@/types'

interface CommentItemProps {
  comment: Comment
}

export default function CommentItem({ comment }: CommentItemProps) {
  const createdDate = new Date(comment.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-gray-900">{comment.author_name}</span>
        <span className="text-sm text-gray-500">{createdDate}</span>
      </div>
      <p className="text-gray-700">{comment.content}</p>
    </div>
  )
}
