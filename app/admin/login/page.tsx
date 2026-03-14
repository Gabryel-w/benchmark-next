import type { Metadata } from 'next'
import LoginForm from '@/components/LoginForm'

export const metadata: Metadata = {
  title: 'Painel Admin - DevBlog',
  description: 'Página de login do painel administrativo',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold tracking-tight text-gray-900">DevBlog<span className="text-indigo-600">.</span></span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Painel Administrativo
            </h1>
            <p className="text-gray-600 text-sm mt-2">Faça login para gerenciar artigos</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
