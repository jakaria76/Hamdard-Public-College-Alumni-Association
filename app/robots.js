const BASE_URL = 'https://hamdard-public-college-alumni-assoc.vercel.app'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/admin', '/api', '/forgot-password'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}