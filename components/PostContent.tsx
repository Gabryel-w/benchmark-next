'use client'

import { parseMarkdown } from '@/lib/markdown'

interface PostContentProps {
  content: string
}

export default function PostContent({ content }: PostContentProps) {
  const htmlContent = parseMarkdown(content)

  return (
    <div
      className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 prose-a:hover:underline prose-code:bg-gray-100 prose-code:text-red-600 prose-pre:bg-gray-100 prose-ul:list-disc prose-ol:list-decimal"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
