export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-gray-600 text-sm">
          <p>&copy; {currentYear} DevBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
