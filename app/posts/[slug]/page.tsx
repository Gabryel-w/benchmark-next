import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { fetchRssPosts, findRssPostBySlug } from '@/lib/rss'
import PostContent from '@/components/PostContent'
import CommentList from '@/components/CommentList'
import BackButton from '@/components/BackButton'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
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

async function getPost(slug: string) {
  const dbPost = await prisma.post.findUnique({
    where: { slug },
  })
  if (dbPost) return { ...dbPost, source: 'db' as const }

  await fetchRssPosts()
  const rssPost = findRssPostBySlug(slug)
  return rssPost || null
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
        <BackButton />

        {/* Cover Image */}
        {post.image && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        {/* Category Badge */}
        <div className="mb-6">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColor.bg} ${categoryColor.text}`}>
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

        {/* Comments Section */}
        <div className="border-t border-gray-200 my-12"></div>
        <section className="mt-12">
          <CommentList postSlug={slug} />
        </section>
      </article>
    </div>
  )
}
