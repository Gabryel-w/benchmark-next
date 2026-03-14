import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ slug: string }>
}

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const slug = (await params).slug

    // Fetch all pool comments
    const allComments = await prisma.comment.findMany({
      orderBy: { id: 'asc' },
    })

    if (allComments.length === 0) {
      return NextResponse.json({ comments: [] })
    }

    // Select 50 deterministic comments based on slug hash
    const hash = hashCode(slug)
    const count = Math.min(50, allComments.length)
    const selected = []
    const used = new Set<number>()

    for (let i = 0; i < count; i++) {
      let index = (hash + i * 7 + i * i) % allComments.length
      while (used.has(index)) {
        index = (index + 1) % allComments.length
      }
      used.add(index)
      selected.push(allComments[index])
    }

    // Sort by created_at desc
    selected.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

    return NextResponse.json({ comments: selected })
  } catch (error) {
    console.error('GET /api/posts/[slug]/comments error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}
