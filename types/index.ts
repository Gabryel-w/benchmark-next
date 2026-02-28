export interface Post {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  published_at: Date | string
  updated_at: Date | string
  author: string
}

export interface Comment {
  id: number
  post_id: number
  author_name: string
  content: string
  created_at: Date | string
}

export interface AdminUser {
  id: number
  email: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PostsListResponse {
  posts: Post[]
  total: number
}

export interface CommentsListResponse {
  comments: Comment[]
}

export interface AuthResponse {
  token: string
}

export interface PostCreateInput {
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
}

export interface PostUpdateInput {
  title?: string
  slug?: string
  content?: string
  excerpt?: string
  author?: string
}
