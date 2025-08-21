import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple Landing Page',
  description: 'A modern, responsive landing page built with Next.js and TailwindCSS',
  keywords: 'landing page, next.js, tailwindcss, responsive design',
  authors: [{ name: 'Simple Landing Page Team' }],
  metadataBase: new URL('https://simple-landing-page.com'),
  openGraph: {
    title: 'Simple Landing Page',
    description: 'A modern, responsive landing page built with Next.js and TailwindCSS',
    type: 'website',
    siteName: 'Simple Landing Page',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simple Landing Page',
    description: 'A modern, responsive landing page built with Next.js and TailwindCSS',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* WCAG 2.1 AA Compliance - Skip to main content link */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${inter.className} min-h-screen antialiased`}>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="absolute left-[-999px] top-0 z-50 bg-white px-4 py-3 text-sm text-black focus:left-0"
        >
          Skip to main content
        </a>
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main id="main-content" className="relative">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}