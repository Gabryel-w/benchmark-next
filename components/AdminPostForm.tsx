'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Post } from '@/types'

interface AdminPostFormProps {
  initialPost?: Post
}

const CATEGORIES = [
  'Tecnologia',
  'Economia',
  'Saúde',
  'Ciência',
  'Esportes',
  'Cultura',
  'Política',
  'Meio Ambiente',
]

export default function AdminPostForm({ initialPost }: AdminPostFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: initialPost?.title || '',
    slug: initialPost?.slug || '',
    content: initialPost?.content || '',
    excerpt: initialPost?.excerpt || '',
    author: initialPost?.author || '',
    category: initialPost?.category || 'Tecnologia',
  })

  useEffect(() => {
    if (formData.title && !initialPost) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
      setFormData((prev) => ({ ...prev, slug: generatedSlug }))
    }
  }, [formData.title, initialPost])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (!formData.title || !formData.slug || !formData.content || !formData.excerpt || !formData.author || !formData.category) {
        setError('Todos os campos são obrigatórios')
        setIsLoading(false)
        return
      }

      const url = initialPost
        ? `/api/posts/${initialPost.slug}`
        : '/api/posts'
      const method = initialPost ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Falha ao salvar post')
      }

      router.push('/admin/posts')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Um erro ocorreu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg border border-gray-100">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            required
            disabled={isLoading}
            placeholder="Digite o título do artigo"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
            Categoria
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            required
            disabled={isLoading}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-semibold text-gray-900 mb-2">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-mono text-sm"
          required
          disabled={isLoading}
          placeholder="titulo-do-artigo"
        />
        <p className="text-xs text-gray-500 mt-1">Gerado automaticamente a partir do título</p>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-900 mb-2">
          Resumo
        </label>
        <input
          type="text"
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          maxLength={200}
          required
          disabled={isLoading}
          placeholder="Resumo breve do artigo (até 200 caracteres)"
        />
        <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/200</p>
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-semibold text-gray-900 mb-2">
          Autor
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          required
          disabled={isLoading}
          placeholder="Nome do autor"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-semibold text-gray-900 mb-2">
          Conteúdo (Markdown)
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={16}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-mono text-sm"
          required
          disabled={isLoading}
          placeholder="Escreva o conteúdo em Markdown..."
        />
        <p className="text-xs text-gray-500 mt-1">{formData.content.split(/\s+/).length} palavras</p>
      </div>

      <div className="flex gap-4 pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? 'Salvando...' : initialPost ? 'Atualizar Artigo' : 'Criar Artigo'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isLoading}
          className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed font-medium"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
