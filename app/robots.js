const BASE_URL = 'https://hamdard-public-college-alumni-assoc.vercel.app'

export default function robots() {
  return {
    rules: [
      {
        // সব bots এর জন্য
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/dashboard/',
          '/admin',
          '/admin/',
          '/api',
          '/api/',
          '/forgot-password',
        ],
      },
      {
        // Google bot আলাদাভাবে
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/dashboard',
          '/admin',
          '/api',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}