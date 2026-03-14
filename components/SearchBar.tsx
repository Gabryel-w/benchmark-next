'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = [
    'Tecnologia',
    'Economia',
    'Saúde',
    'Ciência',
    'Esportes',
    'Cultura',
    'Política',
    'Meio Ambiente',
  ]

  // Initialize from URL params
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '')
    setSelectedCategory(searchParams.get('category') || '')
  }, [searchParams])

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (searchQuery) {
      params.append('q', searchQuery)
    }

    if (selectedCategory) {
      params.append('category', selectedCategory)
    }

    const queryString = params.toString()
    router.push(queryString ? `/?${queryString}` : '/')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="w-full bg-white border-b border-gray-100 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Search Input */}
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Pesquisar Artigos
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Procure por títulos, autores ou conteúdo..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute right-3 top-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-48">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="">Todas as categorias</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
          >
            Pesquisar
          </button>
        </div>
      </div>
    </div>
  )
}
