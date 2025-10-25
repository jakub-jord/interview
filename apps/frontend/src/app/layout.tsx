import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RecycleCo - Waste Tracking',
  description: 'Waste tracking and traceability platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

