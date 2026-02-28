import Link from 'next/link'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const publishDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden h-full flex flex-col">
      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-600">
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 text-sm mb-4 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{post.author}</span>
          <span>{publishDate}</span>
        </div>
      </div>
    </article>
  )
}
