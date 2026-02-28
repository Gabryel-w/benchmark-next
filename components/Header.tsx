import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            DevBlog
          </Link>
          <div className="flex gap-6 items-center">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/admin/posts"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Admin
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
