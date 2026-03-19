import { Inter } from 'next/font/google'
import './globals.css'
import SessionWrapper from '@/components/shared/SessionWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HPCAA | Hamdard Public College Alumni Association',
  description:
    'Hamdard Public College Alumni Association (HPCAA) — হামদর্দ পাবলিক কলেজের প্রাক্তন শিক্ষার্থীদের অফিসিয়াল প্ল্যাটফর্ম। Events, news, jobs এবং alumni network।',
  keywords: [
    // ── Short forms ──
    'HPCAA',
    'hpcaa',
    'HPC Alumni',
    'hpc alumni',

    // ── English - Full name variations ──
    'Hamdard Public College',
    'Hamdard Public College Alumni',
    'Hamdard Public College Alumni Association',
    'Hamdard Alumni Association',
    'Hamdard College Alumni',
    'Hamdard Alumni Bangladesh',
    'Hamdard Public College Dhaka',
    'Hamdard College Dhaka',
    'Hamdard Alumni Network',
    'Hamdard Public College Old Students',
    'Hamdard Ex Students',
    'Hamdard Former Students',
    'HPCAA Bangladesh',
    'HPCAA Dhaka',
    'HPCAA Official',
    'HPCAA Website',
    'HPCAA Members',
    'HPCAA Events',
    'HPCAA News',

    // ── Bangla - Full name ──
    'হামদর্দ পাবলিক কলেজ',
    'হামদর্দ কলেজ',
    'হামদর্দ পাবলিক কলেজ অ্যালামনাই',
    'হামদর্দ অ্যালামনাই অ্যাসোসিয়েশন',
    'হামদর্দ প্রাক্তন শিক্ষার্থী',
    'হামদর্দ পুরনো ছাত্র',
    'হামদর্দ পাবলিক কলেজ ঢাকা',
    'হামদর্দ কলেজ ঢাকা',
    'হামদর্দ অ্যালামনাই নেটওয়ার্ক',
    'এইচপিসিএএ',

    // ── Mixed / Common search terms ──
    'Hamdard Public College alumni website',
    'HPCAA official website',
    'হামদর্দ কলেজ alumni',
    'হামদর্দ alumni association',
    'Hamdard college er purano chatra',
    'হামদর্দ কলেজের প্রাক্তন ছাত্র',
    'হামদর্দ কলেজের alumni',

    // ── General alumni terms ──
    'alumni association bangladesh',
    'college alumni bangladesh',
    'alumni network dhaka',
    'প্রাক্তন শিক্ষার্থী সংগঠন',
    'অ্যালামনাই অ্যাসোসিয়েশন বাংলাদেশ',
  ],
  openGraph: {
    title: 'HPCAA | Hamdard Public College Alumni Association',
    description: 'হামদর্দ পাবলিক কলেজের প্রাক্তন শিক্ষার্থীদের অফিসিয়াল প্ল্যাটফর্ম।',
    url: 'https://hamdard-public-college-alumni-assoc.vercel.app',
    siteName: 'HPCAA',
    locale: 'bn_BD',
    type: 'website',
  },
  verification: {
    google: 'LSMzcim9PDHqgsqGlWofceuIjnOMVJjNZmHX6eFw-e0',
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