import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const perPage = Math.max(1, parseInt(searchParams.get('perPage') || '10', 10))

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        orderBy: { published_at: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.post.count(),
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
    const { title, slug, content, excerpt, author } = body

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
