import type { Metadata } from 'next'
import { AuthProvider } from '@/contexts/AuthContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'BookBridge - Online Bookstore',
  description: 'Buy and sell books online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
