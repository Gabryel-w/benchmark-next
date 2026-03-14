'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth/me')
        const data = await response.json()
        setIsAdmin(data.authenticated || false)
      } catch (error) {
        console.error('Error checking auth status:', error)
        setIsAdmin(false)
      }
    }

    checkAuthStatus()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      window.location.href = '/'
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl font-bold tracking-tight text-gray-900">DevBlog<span className="text-indigo-600">.</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Início
            </Link>

            {/* Auth Section */}
            {isAdmin ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                  title="Menu do Admin"
                >
                  A
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/admin/posts"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Painel Admin
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={() => {
                        setDropdownOpen(false)
                        handleLogout()
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Entrar
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200/60 flex flex-col gap-4 bg-white/80 backdrop-blur-md">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>

            {isAdmin ? (
              <>
                <Link
                  href="/admin/posts"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Painel Admin
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    handleLogout()
                  }}
                  className="text-left text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/admin/login"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Entrar
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
