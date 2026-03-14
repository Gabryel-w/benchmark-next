import { marked } from 'marked'

export function parseMarkdown(content: string): string {
  try {
    // If content already contains HTML tags, pass through as-is
    if (/<[a-z][\s\S]*>/i.test(content)) {
      return content
    }
    return marked(content) as string
  } catch (error) {
    console.error('Error parsing markdown:', error)
    return `<p>${content}</p>`
  }
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, maxLength).trim() + '...'
}
