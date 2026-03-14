import Parser from 'rss-parser'
import type { Post } from '@/types'

const parser = new Parser({
  customFields: {
    item: [['media:content', 'mediaContent', { keepArray: false }]],
  },
})

const RSS_FEEDS: Record<string, string> = {
  'Tecnologia': 'https://g1.globo.com/rss/g1/tecnologia/',
  'Economia': 'https://g1.globo.com/rss/g1/economia/',
  'Saúde': 'https://g1.globo.com/rss/g1/saude/',
  'Ciência': 'https://g1.globo.com/rss/g1/ciencia-e-saude/',
  'Esportes': 'https://ge.globo.com/rss/ge/',
  'Cultura': 'https://g1.globo.com/rss/g1/pop-arte/',
  'Política': 'https://g1.globo.com/rss/g1/politica/',
  'Meio Ambiente': 'https://g1.globo.com/rss/g1/natureza/',
}

let cache: { posts: Post[]; fetchedAt: number } | null = null
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function formatRssContent(raw: string): string {
  if (!raw) return ''

  // If content has HTML tags, clean it up
  if (/<[a-z][\s\S]*>/i.test(raw)) {
    let cleaned = raw
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<img[^>]*>/gi, '')

    // Ensure paragraphs are properly separated
    cleaned = cleaned
      .replace(/<\/p>\s*<p/gi, '</p>\n<p')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/div>\s*<div/gi, '</div>\n<div')

    return cleaned
  }

  // Plain text: split into paragraphs
  const paragraphs = raw.split(/\n{2,}|\.\s{2,}/)
    .map(p => p.trim())
    .filter(p => p.length > 0)

  if (paragraphs.length <= 1) {
    // Try splitting long text by sentences
    const sentences = raw.split(/(?<=[.!?])\s+/)
    const chunks: string[] = []
    let current = ''
    for (const s of sentences) {
      current += (current ? ' ' : '') + s
      if (current.length > 200) {
        chunks.push(current)
        current = ''
      }
    }
    if (current) chunks.push(current)
    return chunks.map(c => `<p>${c}</p>`).join('\n')
  }

  return paragraphs.map(p => `<p>${p}</p>`).join('\n')
}

function makeSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

export async function fetchRssPosts(): Promise<Post[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL) {
    return cache.posts
  }

  const allPosts: Post[] = []

  const results = await Promise.allSettled(
    Object.entries(RSS_FEEDS).map(async ([category, url]) => {
      const feed = await parser.parseURL(url)
      return { category, items: feed.items }
    })
  )

  for (const result of results) {
    if (result.status !== 'fulfilled') continue
    const { category, items } = result.value

    for (const item of items) {
      if (!item.title) continue

      const slug = makeSlug(item.title)
      if (!slug) continue

      // Extract image from enclosure or media:content
      const mediaContent = (item as unknown as Record<string, unknown>).mediaContent as Record<string, Record<string, string>> | undefined
      const image =
        item.enclosure?.url ||
        mediaContent?.['$']?.url ||
        ''

      allPosts.push({
        id: 0,
        title: item.title,
        slug,
        content: formatRssContent(item.content || item.contentSnippet || item.summary || ''),
        excerpt: (item.contentSnippet || item.summary || '').slice(0, 200),
        published_at: item.pubDate || new Date().toISOString(),
        updated_at: item.pubDate || new Date().toISOString(),
        author: item.creator || 'Redação',
        category,
        source: 'rss',
        link: item.link || '',
        image,
      })
    }
  }

  // Remove duplicates by slug (keep first occurrence)
  const seen = new Set<string>()
  const unique = allPosts.filter(p => {
    if (seen.has(p.slug)) return false
    seen.add(p.slug)
    return true
  })

  unique.sort((a, b) =>
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  )

  cache = { posts: unique, fetchedAt: Date.now() }
  return unique
}

export function findRssPostBySlug(slug: string): Post | null {
  if (!cache) return null
  return cache.posts.find(p => p.slug === slug) || null
}

export function mergeAndPaginate(
  rssPosts: Post[],
  dbPosts: Post[],
  options: {
    page?: number
    perPage?: number
    q?: string
    category?: string
  }
): { posts: Post[]; total: number } {
  const { page = 1, perPage = 9, q, category } = options

  // Filter out pool post from DB results
  const filteredDb = dbPosts.filter(p => p.slug !== '__comment-pool__')

  // DB posts take priority by slug
  const dbSlugs = new Set(filteredDb.map(p => p.slug))
  const uniqueRss = rssPosts.filter(p => !dbSlugs.has(p.slug))

  let merged: Post[] = [
    ...filteredDb.map(p => ({ ...p, source: 'db' as const })),
    ...uniqueRss,
  ]

  // Sort by date
  merged.sort((a, b) =>
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  )

  // Filter by category
  if (category) {
    merged = merged.filter(p => p.category === category)
  }

  // Search
  if (q) {
    const query = q.toLowerCase()
    merged = merged.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.excerpt.toLowerCase().includes(query) ||
      p.author.toLowerCase().includes(query)
    )
  }

  const total = merged.length
  const start = (page - 1) * perPage
  const paginatedPosts = merged.slice(start, start + perPage)

  return { posts: paginatedPosts, total }
}
