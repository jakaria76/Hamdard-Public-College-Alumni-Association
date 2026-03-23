import { Inter } from 'next/font/google'
import './globals.css'
import SessionWrapper from '@/components/shared/SessionWrapper'

const inter = Inter({ subsets: ['latin'] })

const BASE_URL = 'https://hamdard-public-college-alumni-assoc.vercel.app'

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'HPCAA | Hamdard Public College Alumni Association',
    template: '%s | HPCAA',
  },

  description:
    'Hamdard Public College Alumni Association (HPCAA) — হামদর্দ পাবলিক কলেজের প্রাক্তন শিক্ষার্থীদের অফিসিয়াল প্ল্যাটফর্ম। Events, news, jobs এবং alumni network।',

  applicationName: 'HPCAA',

  icons: {
    icon: '/images/hpcaa-icon.png',
    shortcut: '/images/hpcaa-icon.png',
    apple: '/images/hpcaa-icon.png',
  },

  keywords: [
    'HPCAA', 'hpcaa', 'HPC Alumni', 'hpc alumni',
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
    'HPCAA Bangladesh', 'HPCAA Dhaka',
    'HPCAA Official', 'HPCAA Website',
    'HPCAA Members', 'HPCAA Events', 'HPCAA News',
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
    'Hamdard Public College alumni website',
    'HPCAA official website',
    'হামদর্দ কলেজ alumni',
    'হামদর্দ alumni association',
    'হামদর্দ কলেজের প্রাক্তন ছাত্র',
    'হামদর্দ কলেজের alumni',
    'alumni association bangladesh',
    'college alumni bangladesh',
    'alumni network dhaka',
    'প্রাক্তন শিক্ষার্থী সংগঠন',
    'অ্যালামনাই অ্যাসোসিয়েশন বাংলাদেশ',
  ],

  openGraph: {
    title: 'HPCAA | Hamdard Public College Alumni Association',
    description:
      'হামদর্দ পাবলিক কলেজের প্রাক্তন শিক্ষার্থীদের অফিসিয়াল প্ল্যাটফর্ম। Events, news, jobs এবং alumni network।',
    url: BASE_URL,
    siteName: 'Hamdard Public College Alumni Association',
    locale: 'bn_BD',
    type: 'website',
    images: [
      {
        url: '/images/hpcaa-icon.png',
        width: 512,
        height: 512,
        alt: 'HPCAA Logo',
      },
    ],
  },

  twitter: {
    card: 'summary',
    title: 'HPCAA | Hamdard Public College Alumni Association',
    description: 'হামদর্দ পাবলিক কলেজের প্রাক্তন শিক্ষার্থীদের অফিসিয়াল প্ল্যাটফর্ম।',
    images: ['/images/hpcaa-icon.png'],
  },

  verification: {
    google: 'LSMzcim9PDHqgsqGlWofceuIjnOMVJjNZmHX6eFw-e0',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hamdard Public College Alumni Association',
  alternateName: 'HPCAA',
  url: BASE_URL,
  logo: `${BASE_URL}/images/hpcaa-icon.png`,
  description: 'হামদর্দ পাবলিক কলেজের প্রাক্তন শিক্ষার্থীদের অফিসিয়াল প্ল্যাটফর্ম।',
  foundingDate: '1975',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}