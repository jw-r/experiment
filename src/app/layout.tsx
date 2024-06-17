import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { cn } from '@/lib/utils'
import VisualViewport from '@/components/visual-viewport'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Design System',
  description: '',
}

export const viewport: Viewport = {
  initialScale: 1.0,
  userScalable: false,
  maximumScale: 1.0,
  minimumScale: 1.0,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(fontSans.variable)}>
        <VisualViewport hideYScrollbar>{children}</VisualViewport>
      </body>
    </html>
  )
}
