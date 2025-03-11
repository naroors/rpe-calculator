import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RPE 1RM Calculator',
  description: 'Created by @naroors.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
