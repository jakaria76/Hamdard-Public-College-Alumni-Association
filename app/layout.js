import { Inter } from 'next/font/google'
import './globals.css'
import SessionWrapper from '@/components/shared/SessionWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hamdard Public College Alumni Association (HPCAA)',
  description: 'Official website of Hamdard Public College Alumni Association. প্রাক্তন শিক্ষার্থীদের একটি বিশেষ platform।',
  keywords: 'Hamdard Public College, HPCAA, Alumni Association, হামদর্দ পাবলিক কলেজ, alumni bangladesh',
  verification: {
    google: 'LSMzcim9PDHqgsqGlWofceuIjnOMVJjNZmHX6eFw-e0',  // ← HTML tag এর content value বসাও
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={inter.className}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}