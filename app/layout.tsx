import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Simple Landing Page - Modern Solutions for Your Business',
  description: 'Discover our innovative features and solutions. Get started with our simple, powerful platform designed to help your business grow.',
  keywords: 'landing page, business solutions, features, contact, modern platform',
  authors: [{ name: 'Simple Landing Page Team' }],
  creator: 'Simple Landing Page',
  publisher: 'Simple Landing Page',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://simple-landing-page.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Simple Landing Page - Modern Solutions for Your Business',
    description: 'Discover our innovative features and solutions. Get started with our simple, powerful platform designed to help your business grow.',
    url: 'https://simple-landing-page.com',
    siteName: 'Simple Landing Page',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Simple Landing Page Preview',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simple Landing Page - Modern Solutions for Your Business',
    description: 'Discover our innovative features and solutions. Get started with our simple, powerful platform.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50">
          Skip to main content
        </a>
        <main id="main-content" className="relative">
          {children}
        </main>
      </body>
    </html>
  )
}