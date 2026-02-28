import type { Metadata } from 'next'
import AdminPostForm from '@/components/AdminPostForm'

export const metadata: Metadata = {
  title: 'Create New Post - Admin - DevBlog',
  description: 'Create a new blog post',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NewPostPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Create New Post</h1>
      <AdminPostForm />
    </div>
  )
}
