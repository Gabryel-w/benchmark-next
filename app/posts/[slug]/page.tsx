import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PostContent from '@/components/PostContent'
import CommentList from '@/components/CommentList'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
  })
  return post
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const slug = (await params).slug
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found',
    }
  }

  return {
    title: `${post.title} - DevBlog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: new Date(post.published_at).toISOString(),
      authors: [post.author],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const slug = (await params).slug
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="w-full max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
        <div className="flex gap-4 text-gray-600 text-sm">
          <span>By {post.author}</span>
          <span>
            {new Date(post.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </header>

      <PostContent content={post.content} />

      <hr className="my-12" />

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Comments</h2>
        <CommentList postSlug={slug} />
      </section>
    </article>
  )
}
