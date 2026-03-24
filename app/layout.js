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

  // ── Favicon & Icons ──
  icons: {
    icon: [
      { url: '/images/hpcaa-icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/images/hpcaa-icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/hpcaa-icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/hpcaa-icon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: [{ url: '/images/hpcaa-icon.png', type: 'image/png' }],
    apple: [{ url: '/images/hpcaa-icon.png', sizes: '512x512', type: 'image/png' }],
    other: [
      { rel: 'apple-touch-icon-precomposed', url: '/images/hpcaa-icon.png' },
    ],
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

  // ── OpenGraph ── (absolute URL for logo)
  openGraph: {
    title: 'HPCAA | Hamdard Public College Alumni Association',
    description:
      'হামদর্দ পাবলিক কলেজের প্রাক্তন শিক্ষার্থীদের অফিসিয়াল প্ল্যাটফর্ম। Events, news, jobs এবং alumni network।',
    url: BASE_URL,
    siteName: 'HPCAA-Hamdard Public College Alumni Association',
    locale: 'bn_BD',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/images/hpcaa-icon.png`,  // ← absolute URL
        width: 512,
        height: 512,
        alt: 'HPCAA — Hamdard Public College Alumni Association Logo',
      },
    ],
  },

  // ── Twitter Card ──
  twitter: {
    card: 'summary',
    title: 'HPCAA | Hamdard Public College Alumni Association',
    description: 'হামদর্দ পাবলিক কলেজের প্রাক্তন শিক্ষার্থীদের অফিসিয়াল প্ল্যাটফর্ম।',
    images: [`${BASE_URL}/images/hpcaa-icon.png`],  // ← absolute URL
  },

  // ── Google Search Console ──
  verification: {
    google: 'LSMzcim9PDHqgsqGlWofceuIjnOMVJjNZmHX6eFw-e0',
  },

  // ── Canonical URL ──
  alternates: {
    canonical: BASE_URL,
  },

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// ── JSON-LD Schema ── (Google logo এর জন্য সবচেয়ে important)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HPCAA',
  alternateName: 'Hamdard Public College Alumni Association',
  url: BASE_URL,

  // Google logo দেখানোর জন্য ImageObject format দরকার
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/images/hpcaa-icon.png`,
    width: 512,
    height: 512,
    caption: 'HPCAA Logo',
  },

  image: `${BASE_URL}/images/hpcaa-icon.png`,

  description: 'হামদর্দ পাবলিক কলেজের প্রাক্তন শিক্ষার্থীদের অফিসিয়াল প্ল্যাটফর্ম।',
  foundingDate: '2010',

  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Hamdard Public College, Panthapath',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
    postalCode: '1205',
  },

  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Bengali', 'English'],
  },

  sameAs: [
    'https://www.facebook.com/HamdardPublicCollegeAlumniAssociation',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        {/* JSON-LD for Google Knowledge Panel + Logo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Explicit favicon tags (some crawlers prefer these) */}
        <link rel="icon" type="image/png" sizes="512x512" href="/images/hpcaa-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/hpcaa-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/hpcaa-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/hpcaa-icon.png" />
        <link rel="shortcut icon" href="/images/hpcaa-icon.png" />
        <link rel="apple-touch-icon" href="/images/hpcaa-icon.png" />

        {/* Site name for Google */}
        <meta name="application-name" content="HPCAA" />
        <meta property="og:site_name" content="HPCAA" />
      </head>
      <body className={inter.className}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}