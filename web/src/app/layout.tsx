import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { SnackbarContextProvider } from '@/contexts/Snackbar'
import { Snackbar } from '@/components/parts/Snackbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kitchy Kitchen Buddy',
  description: 'A recipe sharing site and kitchen assistant',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SnackbarContextProvider>
          <Snackbar />
          <main>{children}</main>
        </SnackbarContextProvider>
      </body>
    </html>
  )
}
