import type { Metadata } from 'next'
import AdminPostForm from '@/components/AdminPostForm'

export const metadata: Metadata = {
  title: 'Novo Artigo - Admin - DevBlog',
  description: 'Criar um novo artigo no DevBlog',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NewPostPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <a
          href="/admin/posts"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-4 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para artigos
        </a>
        <h1 className="text-4xl font-bold text-gray-900">Criar Novo Artigo</h1>
        <p className="text-gray-600 mt-2">Preencha os campos abaixo para publicar um novo artigo no DevBlog</p>
      </div>
      <AdminPostForm />
    </div>
  )
}
