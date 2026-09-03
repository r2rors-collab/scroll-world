import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Veloura Balloon Studio | Luxury Balloon Décor in Peterborough, Ontario',
  description:
    'Sculptural balloon experiences for weddings, milestone parties and bespoke events — designed around the people and memories at the heart of your celebration. Serving Peterborough, Ontario.',
  keywords: [
    'balloon studio',
    'luxury balloon decor',
    'wedding balloon arch',
    'Peterborough Ontario',
    'event styling',
  ],
  openGraph: {
    title: 'Veloura Balloon Studio',
    description: 'Make the moment impossible to miss. Sculptural balloon experiences in Peterborough, Ontario.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#2a1f28',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} bg-background`}>
      <body>{children}</body>
    </html>
  )
}
