import { marked } from 'marked'

export function parseMarkdown(content: string): string {
  try {
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
