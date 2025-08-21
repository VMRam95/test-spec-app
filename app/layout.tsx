import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Initialize Inter font with latin subset for performance
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Simple Landing Page',
  description: 'A modern, responsive landing page built with Next.js and TailwindCSS',
  keywords: 'landing page, next.js, tailwindcss, responsive design',
  authors: [{ name: 'Your Company Name' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'Simple Landing Page',
    title: 'Simple Landing Page',
    description: 'A modern, responsive landing page built with Next.js and TailwindCSS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simple Landing Page',
    description: 'A modern, responsive landing page built with Next.js and TailwindCSS',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="flex min-h-screen flex-col">
          {/* Skip to main content link for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-white dark:focus:bg-gray-900 focus:text-blue-600"
          >
            Skip to main content
          </a>
          
          <main id="main-content" className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}