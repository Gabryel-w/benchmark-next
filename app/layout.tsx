import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevBlog - Seu portal de notícias e artigos',
  description: 'As principais notícias sobre tecnologia, economia, saúde, ciência, esportes, cultura, política e meio ambiente.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%234F46E5" /><circle cx="50" cy="50" r="30" fill="white" /><circle cx="50" cy="50" r="20" fill="%234F46E5" /></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-white">
          <Header />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
