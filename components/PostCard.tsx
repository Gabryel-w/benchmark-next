import Link from 'next/link'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
  featured?: boolean
}

const getCategoryColor = (category: string): { bg: string; text: string } => {
  const colors: Record<string, { bg: string; text: string }> = {
    'Tecnologia': { bg: 'bg-blue-50', text: 'text-blue-600' },
    'Economia': { bg: 'bg-emerald-50', text: 'text-emerald-600' },
    'Saúde': { bg: 'bg-rose-50', text: 'text-rose-600' },
    'Ciência': { bg: 'bg-violet-50', text: 'text-violet-600' },
    'Esportes': { bg: 'bg-amber-50', text: 'text-amber-600' },
    'Cultura': { bg: 'bg-pink-50', text: 'text-pink-600' },
    'Política': { bg: 'bg-sky-50', text: 'text-sky-600' },
    'Meio Ambiente': { bg: 'bg-teal-50', text: 'text-teal-600' },
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

const getCategoryGradient = (category: string): string => {
  const gradients: Record<string, string> = {
    'Tecnologia': 'from-blue-400 to-indigo-500',
    'Economia': 'from-emerald-400 to-teal-500',
    'Saúde': 'from-rose-400 to-pink-500',
    'Ciência': 'from-violet-400 to-purple-500',
    'Esportes': 'from-amber-400 to-orange-500',
    'Cultura': 'from-pink-400 to-rose-500',
    'Política': 'from-sky-400 to-blue-500',
    'Meio Ambiente': 'from-teal-400 to-green-500',
  }
  return gradients[category] || 'from-gray-400 to-gray-500'
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
      <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden mb-12 border border-gray-200/60 hover:border-gray-300">
        <div className="md:flex">
          {/* Featured Image */}
          <div className="md:w-2/5 relative">
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-full object-cover"
              />
            ) : (
              <div className={`w-full h-64 md:h-full bg-gradient-to-br ${getCategoryGradient(post.category)} flex items-center justify-center`}>
                <span className="text-white/30 text-8xl font-bold">{post.category[0]}</span>
              </div>
            )}
          </div>
          <div className="md:w-3/5 p-8 md:p-10">
            <div className="mb-4 flex items-center gap-3">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                {post.category}
              </div>
              <span className="text-xs text-gray-400">Destaque</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
              <Link href={`/posts/${post.slug}`} className="hover:text-indigo-600 transition-colors">
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
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
              >
                Ler mais
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="bg-white border border-gray-200/60 rounded-2xl hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300 transition-all duration-300 overflow-hidden flex flex-col h-full group">
      {/* Card Image */}
      <div className="relative h-48 overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(post.category)} flex items-center justify-center`}>
            <span className="text-white/30 text-6xl font-bold">{post.category[0]}</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} backdrop-blur-sm`}>
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold leading-snug mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
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
