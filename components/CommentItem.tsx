import type { Comment } from '@/types'

interface CommentItemProps {
  comment: Comment
}

const getAvatarColor = (name: string): string => {
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-green-500', 'bg-red-500']
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function CommentItem({ comment }: CommentItemProps) {
  const createdDate = new Date(comment.created_at).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const avatarColor = getAvatarColor(comment.author_name)
  const initials = getInitials(comment.author_name)

  return (
    <div className="bg-white rounded-lg p-5 border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900">{comment.author_name}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{createdDate}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed text-sm">{comment.content}</p>
    </div>
  )
}
