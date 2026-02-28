import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const perPage = Math.max(1, parseInt(searchParams.get('perPage') || '10', 10))
    const q = searchParams.get('q')
    const category = searchParams.get('category')

    // Build where clause for search and category filtering
    const where: any = {}

    if (q) {
      // Search in title, excerpt, content, and author (case-insensitive)
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { excerpt: { contains: q, mode: 'insensitive' } },
        { content: { contains: q, mode: 'insensitive' } },
        { author: { contains: q, mode: 'insensitive' } },
      ]
    }

    if (category) {
      // Filter by exact category match
      where.category = category
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { published_at: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.post.count({ where }),
    ])

    return NextResponse.json({ posts, total })
  } catch (error) {
    console.error('GET /api/posts error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const verified = verifyToken(token)
    if (!verified) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const { title, slug, content, excerpt, author, category } = body

    if (!title || !slug || !content || !excerpt || !author) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        author,
        category: category || 'Geral',
      },
    })

    return NextResponse.json({ post }, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/posts error:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
