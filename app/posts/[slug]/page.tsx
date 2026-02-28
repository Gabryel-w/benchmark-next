import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PostContent from '@/components/PostContent'
import CommentList from '@/components/CommentList'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
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
      title: 'Artigo não encontrado',
      description: 'O artigo solicitado não pôde ser encontrado',
    }
  }

  return {
    title: `${post.title} - PulseNews`,
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

  const publishDate = new Date(post.published_at).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200)
  const categoryColor = getCategoryColor(post.category)
  const initials = getAuthorInitials(post.author)
  const avatarColor = getAvatarColor(post.author)

  return (
    <div className="w-full bg-white">
      {/* Article Header */}
      <article className="w-full max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para início
        </Link>

        {/* Category Badge */}
        <div className="mb-6">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${categoryColor.bg} ${categoryColor.text}`}>
            {post.category}
          </span>
        </div>

        {/* Title */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            {post.title}
          </h1>

          {/* Author Info */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                {initials}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">{publishDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 md:ml-auto">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readingTime} min de leitura
              </span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="mb-12 prose-wrapper">
          <PostContent content={post.content} />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-12"></div>

        {/* Comments Section */}
        <section className="mt-12">
          <CommentList postSlug={slug} />
        </section>
      </article>
    </div>
  )
}
