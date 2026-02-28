'use client'

import { parseMarkdown } from '@/lib/markdown'

interface PostContentProps {
  content: string
}

export default function PostContent({ content }: PostContentProps) {
  const htmlContent = parseMarkdown(content)

  return (
    <div
      className="prose prose-lg max-w-4xl mx-auto prose-headings:font-bold prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-4 prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-h4:text-xl prose-h4:mt-4 prose-h4:mb-2 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-a:underline prose-strong:font-bold prose-em:italic prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-4 prose-pre:overflow-x-auto prose-pre:border prose-pre:border-gray-800 prose-pre code:text-gray-100 prose-pre code:bg-transparent prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-gray-50 prose-blockquote:rounded prose-blockquote:my-4 prose-ul:ml-6 prose-ol:ml-6 prose-li:text-gray-700 prose-li:mb-2"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
