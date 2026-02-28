import type { Post } from '@/types'
import PostCard from './PostCard'

interface PostListProps {
  posts: Post[]
  featured?: boolean
}

export default function PostList({ posts, featured = false }: PostListProps) {
  if (featured && posts.length > 0) {
    const [firstPost, ...restPosts] = posts
    return (
      <div>
        <PostCard post={firstPost} featured={true} />
        {restPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
