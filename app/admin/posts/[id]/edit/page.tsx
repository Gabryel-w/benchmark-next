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
      title: 'Artigo não encontrado',
      description: 'O artigo solicitado não pôde ser encontrado',
    }
  }

  return {
    title: `Editar "${post.title}" - Admin - PulseNews`,
    description: `Editar o artigo: ${post.title}`,
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
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <a
          href="/admin/posts"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para artigos
        </a>
        <h1 className="text-4xl font-bold text-gray-900">Editar Artigo</h1>
        <p className="text-gray-600 mt-2">Atualize os dados do artigo "{post.title}"</p>
      </div>
      <AdminPostForm initialPost={post} />
    </div>
  )
}
