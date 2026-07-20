import type { Metadata } from 'next'
import { ReactNode } from 'react'

import './globals.css'

export const metadata: Metadata = {
  title: 'Lorem Ipsum',
  description: 'Dolor Sit Amet',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
