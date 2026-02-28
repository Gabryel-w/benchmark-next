import Link from 'next/link'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
  featured?: boolean
}

const getCategoryColor = (category: string): { bg: string; text: string } => {
  const colors: Record<string, { bg: string; text: string }> = {
    'Tecnologia': { bg: 'bg-blue-100', text: 'text-blue-700' },
    'Economia': { bg: 'bg-green-100', text: 'text-green-700' },
    'Saúde': { bg: 'bg-red-100', text: 'text-red-700' },
    'Ciência': { bg: 'bg-purple-100', text: 'text-purple-700' },
    'Esportes': { bg: 'bg-orange-100', text: 'text-orange-700' },
    'Cultura': { bg: 'bg-pink-100', text: 'text-pink-700' },
    'Política': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    'Meio Ambiente': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  }
  return colors[category] || { bg: 'bg-gray-100', text: 'text-gray-700' }
}

const getAuthorInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const getAvatarColor = (name: string): string => {
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-green-500', 'bg-red-500']
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const publishDate = new Date(post.published_at).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const colors = getCategoryColor(post.category)
  const initials = getAuthorInitials(post.author)
  const avatarColor = getAvatarColor(post.author)

  if (featured) {
    return (
      <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mb-12 border border-gray-100">
        <div className="p-8 md:p-10">
          <div className="mb-4 flex items-center gap-3">
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}>
              {post.category}
            </div>
            <span className="text-xs text-gray-400">Destaque</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
              {post.title}
            </Link>
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-sm`}>
                {initials}
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">{publishDate}</p>
              </div>
            </div>
            <Link
              href={`/posts/${post.slug}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Ler mais
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="bg-white rounded-lg border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full group">
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
            {post.category}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{post.author}</p>
            <p className="text-xs text-gray-500">{publishDate}</p>
          </div>
        </div>
      </div>
    </article>
  )
}
