import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { fetchRssPosts, findRssPostBySlug } from '@/lib/rss'

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
      // Try RSS cache, fetch if needed
      await fetchRssPosts()
      const rssPost = findRssPostBySlug(slug)
      if (!rssPost) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }
      return NextResponse.json({ post: rssPost })
    }

    return NextResponse.json({ post: { ...post, source: 'db' } })
  } catch (error) {
    console.error('GET /api/posts/[slug] error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const verified = verifyToken(token)
    if (!verified) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const slug = (await params).slug
    const body = await request.json()
    const { title, content, excerpt, author, category } = body

    const existingPost = await prisma.post.findUnique({
      where: { slug },
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const post = await prisma.post.update({
      where: { id: existingPost.id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(excerpt && { excerpt }),
        ...(author && { author }),
        ...(category && { category }),
      },
    })

    return NextResponse.json({ post })
  } catch (error: any) {
    console.error('PUT /api/posts/[slug] error:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const verified = verifyToken(token)
    if (!verified) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const slug = (await params).slug

    const post = await prisma.post.findUnique({
      where: { slug },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    await prisma.post.delete({
      where: { id: post.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/posts/[slug] error:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
