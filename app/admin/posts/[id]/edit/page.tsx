import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AdminPostForm from '@/components/AdminPostForm'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getPost(id: string) {
  try {
    const postId = parseInt(id, 10)
    return await prisma.post.findUnique({
      where: { id: postId },
    })
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const id = (await params).id
  const post = await getPost(id)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found',
    }
  }

  return {
    title: `Edit "${post.title}" - Admin - DevBlog`,
    description: `Edit the blog post: ${post.title}`,
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function EditPostPage({ params }: PageProps) {
  const id = (await params).id
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Edit Post</h1>
      <AdminPostForm initialPost={post} />
    </div>
  )
}
