import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const slug = (await params).slug

    const post = await prisma.post.findUnique({
      where: { slug },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const comments = await prisma.comment.findMany({
      where: { post_id: post.id },
      orderBy: { created_at: 'desc' },
    })

    return NextResponse.json({ comments })
  } catch (error) {
    console.error('GET /api/posts/[slug]/comments error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}
