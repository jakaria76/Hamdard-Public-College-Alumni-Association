const BASE_URL = 'https://hamdard-public-college-alumni-assoc.vercel.app'
import Link from 'next/link';

// ── Rich SEO Metadata ──
export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: 'আমাদের সম্পর্কে | HPCAA — Hamdard Public College Alumni Association',

  description:
    'Hamdard Public College Alumni Association (HPCAA) সম্পর্কে জানুন। হামদর্দ পাবলিক কলেজের ২০০০+ প্রাক্তন শিক্ষার্থীদের সংগঠন। আমাদের লক্ষ্য, দৃষ্টিভঙ্গি, মূল্যবোধ এবং ইতিহাস।',

  keywords: [
    'hpcaa','hpc alumni','hpc','hpcaa alumni','Hamdard Public College Alumni Association','Hamdard Public College',
    'HPCAA সম্পর্কে', 'HPCAA about', 'হামদর্দ পাবলিক কলেজ অ্যালামনাই সম্পর্কে',
    'Hamdard Public College Alumni Association about',
    'HPCAA লক্ষ্য', 'HPCAA দৃষ্টিভঙ্গি', 'HPCAA history',
    'হামদর্দ কলেজ alumni সংগঠন', 'Hamdard alumni community',
    'HPCAA mission vision', 'হামদর্দ প্রাক্তন শিক্ষার্থী সংগঠন',
  ],

  openGraph: {
    title: 'আমাদের সম্পর্কে | HPCAA',
    description:
      'হামদর্দ পাবলিক কলেজের ২০০০+ প্রাক্তন শিক্ষার্থীদের সংগঠন HPCAA সম্পর্কে জানুন।',
    url: `${BASE_URL}/about`,
    siteName: 'HPCAA',
    locale: 'bn_BD',
    type: 'website',
    images: [{ url: `${BASE_URL}/images/hpcaa-icon.png`, width: 512, height: 512, alt: 'HPCAA Logo' }],
  },

  twitter: {
    card: 'summary',
    title: 'আমাদের সম্পর্কে | HPCAA',
    description: 'হামদর্দ পাবলিক কলেজের প্রাক্তন শিক্ষার্থীদের সংগঠন HPCAA সম্পর্কে জানুন।',
    images: [`${BASE_URL}/images/hpcaa-icon.png`],
  },

  alternates: {
    canonical: `${BASE_URL}/about`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

// ── JSON-LD Schema ──
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'আমাদের সম্পর্কে — HPCAA',
  url: `${BASE_URL}/about`,
  description: 'Hamdard Public College Alumni Association (HPCAA) সম্পর্কে বিস্তারিত তথ্য।',
  isPartOf: {
    '@type': 'WebSite',
    name: 'HPCAA',
    url: BASE_URL,
  },
  about: {
    '@type': 'Organization',
    name: 'HPCAA',
    alternateName: 'Hamdard Public College Alumni Association',
    url: BASE_URL,
    foundingDate: '2010',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 2000 },
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/images/hpcaa-icon.png`,
      width: 512,
      height: 512,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hamdard Public College, Hazaribagh',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
    sameAs: ['https://www.facebook.com/HamdardPublicCollegeAlumniAssociation'],
  },
}

const values = [
  { icon: '🤝', label: 'একতা', desc: 'সকল alumni একসাথে' },
  { icon: '📚', label: 'শিক্ষা', desc: 'জ্ঞান ও দক্ষতা উন্নয়ন' },
  { icon: '💡', label: 'উদ্ভাবন', desc: 'নতুন চিন্তা ও সমাধান' },
  { icon: '❤️', label: 'সেবা', desc: 'সমাজের কল্যাণে' },
]

const stats = [
  { num: '২০০০+', label: 'নিবন্ধিত Alumni', sublabel: 'Registered Members' },
  { num: '১৫+', label: 'বছরের ইতিহাস', sublabel: 'Years of Excellence' },
  { num: '৫০+', label: 'বার্ষিক ইভেন্ট', sublabel: 'Annual Events' },
  { num: '৬৪', label: 'জেলায় সদস্য', sublabel: 'Districts Covered' },
]

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ minHeight: '100vh', background: '#fafaf8', fontFamily: "'Outfit', system-ui, sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Noto+Serif+Bengali:wght@500;600;700&display=swap');
          *{box-sizing:border-box;margin:0;padding:0}
          @keyframes fu{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
          @keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
          .a1{animation:fu 0.6s ease 0.05s both}
          .a2{animation:fu 0.6s ease 0.15s both}
          .a3{animation:fu 0.6s ease 0.25s both}
          .a4{animation:fu 0.6s ease 0.35s both}
          .a5{animation:fu 0.6s ease 0.45s both}
          .val-card{transition:transform 0.2s,box-shadow 0.2s}
          .val-card:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(21,101,29,0.15) !important}
          .stat-card{transition:all 0.22s}
          .stat-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(21,101,29,0.12) !important}
          .mission-card{transition:all 0.22s}
          .mission-card:hover{border-color:#15651d !important;box-shadow:0 8px 28px rgba(21,101,29,0.1) !important}
          @media(max-width:640px){
            .hero-h1{font-size:28px !important}
            .stats-grid{grid-template-columns:1fr 1fr !important}
            .mission-grid{grid-template-columns:1fr !important}
            .val-grid{grid-template-columns:1fr 1fr !important}
            .hero-pad{padding:56px 20px !important}
            .content-pad{padding:40px 16px !important}
          }
        `}</style>

        {/* ── HERO ── */}
        <div style={{
          background: 'linear-gradient(160deg,#0d2b10 0%,#15651d 45%,#1a7a24 70%,#0d2b10 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Pattern overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.018) 40px,rgba(255,255,255,0.018) 41px)',
          }} />
          {/* Radial glows */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 15% 50%,rgba(255,255,255,0.06) 0%,transparent 60%),radial-gradient(ellipse 40% 50% at 85% 20%,rgba(255,255,255,0.04) 0%,transparent 50%)' }} />

          <div className="hero-pad" style={{ position: 'relative', zIndex: 2, padding: '80px 24px 72px', textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
            {/* Breadcrumb for SEO */}
            <nav style={{ marginBottom: 20 }} aria-label="breadcrumb">
              <ol style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, listStyle: 'none', fontSize: 12, color: 'rgba(255,255,255,0.45)', flexWrap: 'wrap' }}>
               <li>
  <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
    HPCAA
  </Link>
</li>
                <li style={{ color: 'rgba(255,255,255,0.3)' }}>›</li>
                <li style={{ color: 'rgba(255,255,255,0.75)' }}>আমাদের সম্পর্কে</li>
              </ol>
            </nav>

            <div className="a1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 24, marginBottom: 18, fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
              🌿 About HPCAA
            </div>

            <h1 className="hero-h1 a2" style={{ fontSize: 40, fontWeight: 800, color: '#ffffff', marginBottom: 16, lineHeight: 1.2, letterSpacing: -0.5 }}>
              আমাদের সম্পর্কে
            </h1>
            <p className="a3" style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8, fontWeight: 300 }}>
              Hamdard Public College Alumni Association — প্রাক্তন শিক্ষার্থীদের একটি বিশেষ পরিবার
            </p>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="content-pad" style={{ maxWidth: 1040, margin: '0 auto', padding: '60px 24px 80px' }}>

          {/* ── WHO WE ARE ── */}
          <section className="a2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginBottom: 64 }}>
            <div>
              {/* Hidden H1 for SEO (visible H1 is in hero) */}
              <h2 style={{ fontSize: 30, fontWeight: 800, color: '#0d2b10', marginBottom: 16, lineHeight: 1.25, letterSpacing: -0.3 }}>
                আমরা কারা?
              </h2>
              <p style={{ color: '#4a5568', lineHeight: 1.9, marginBottom: 14, fontSize: 15 }}>
                <strong style={{ color: '#15651d' }}>Hamdard Public College Alumni Association (HPCAA)</strong> হলো হামদর্দ পাবলিক কলেজের প্রাক্তন শিক্ষার্থীদের একটি সংগঠন। আমরা দেশ-বিদেশে ছড়িয়ে থাকা সকল প্রাক্তন শিক্ষার্থীদের একত্রিত করি।
              </p>
              <p style={{ color: '#4a5568', lineHeight: 1.9, fontSize: 15 }}>
                আমাদের লক্ষ্য হলো alumni দের মধ্যে সম্পর্ক তৈরি করা, নতুন প্রজন্মকে সহায়তা করা এবং কলেজের উন্নয়নে অবদান রাখা।
              </p>

              <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 22px', background: 'linear-gradient(135deg,#15651d,#0d2b10)', color: '#fff', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 4px 14px rgba(21,101,29,0.3)' }}>
                  Join করো →
                </a>
                <a href="/alumni" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 22px', background: '#fff', color: '#15651d', border: '1.5px solid #c6e6c7', borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s' }}>
                  Alumni দেখো
                </a>
              </div>
            </div>

            {/* Stats grid */}
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {stats.map((s, i) => (
                <div key={i} className="stat-card" style={{ background: '#fff', borderRadius: 18, padding: '22px 18px', textAlign: 'center', border: '1.5px solid #e8f5e9', boxShadow: '0 2px 12px rgba(21,101,29,0.06)' }}>
                  <div style={{ fontSize: 30, fontWeight: 900, color: '#15651d', lineHeight: 1, fontFamily: 'Noto Serif Bengali, serif', marginBottom: 4 }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: '#2d6a34', fontWeight: 700, marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: '#9ca3af', letterSpacing: 0.5, textTransform: 'uppercase' }}>{s.sublabel}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── MISSION & VISION ── */}
          <section className="a3" style={{ marginBottom: 64 }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0d2b10', marginBottom: 8 }}>লক্ষ্য ও দৃষ্টিভঙ্গি</h2>
              <div style={{ width: 48, height: 4, background: 'linear-gradient(90deg,#15651d,#4caf50)', borderRadius: 2, margin: '0 auto' }} />
            </div>

            <div className="mission-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                {
                  icon: '🎯',
                  title: 'আমাদের লক্ষ্য',
                  en: 'Our Mission',
                  text: 'প্রাক্তন শিক্ষার্থীদের মধ্যে নেটওয়ার্ক তৈরি করা, career development এ সহায়তা করা এবং কলেজের উন্নয়নে অবদান রাখা।',
                  color: '#15651d',
                  bg: '#f0fdf0',
                },
                {
                  icon: '🌟',
                  title: 'আমাদের দৃষ্টিভঙ্গি',
                  en: 'Our Vision',
                  text: 'একটি শক্তিশালী alumni community গড়ে তোলা যেখানে প্রতিটি সদস্য একে অপরকে সাহায্য করবে এবং সমাজের উন্নয়নে ভূমিকা রাখবে।',
                  color: '#0d2b10',
                  bg: '#f8fff8',
                },
              ].map((item, i) => (
                <div key={i} className="mission-card" style={{ background: item.bg, borderRadius: 24, padding: '36px 32px', border: '1.5px solid #e8f5e9', boxShadow: '0 2px 12px rgba(21,101,29,0.04)' }}>
                  <div style={{ fontSize: 42, marginBottom: 18 }}>{item.icon}</div>
                  <div style={{ fontSize: 10, color: item.color, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8, opacity: 0.6 }}>{item.en}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0d2b10', marginBottom: 14 }}>{item.title}</h3>
                  <p style={{ color: '#4a5568', lineHeight: 1.85, fontSize: 14 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── HISTORY SECTION (SEO এর জন্য) ── */}
          <section className="a4" style={{ background: '#fff', borderRadius: 24, padding: '40px 36px', border: '1.5px solid #e8f5e9', marginBottom: 64, boxShadow: '0 2px 16px rgba(21,101,29,0.05)' }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0d2b10', marginBottom: 20 }}>আমাদের ইতিহাস</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <p style={{ color: '#4a5568', lineHeight: 1.9, fontSize: 14, marginBottom: 12 }}>
                  হামদর্দ পাবলিক কলেজ ঢাকার অন্যতম সেরা কলেজ। এই কলেজের প্রাক্তন শিক্ষার্থীরা দেশ-বিদেশে বিভিন্ন গুরুত্বপূর্ণ পদে কর্মরত রয়েছেন।
                </p>
                <p style={{ color: '#4a5568', lineHeight: 1.9, fontSize: 14 }}>
                  HPCAA প্রতিষ্ঠার পর থেকে সকল প্রাক্তন শিক্ষার্থীদের একটি সুদৃঢ় প্ল্যাটফর্মে আনার চেষ্টা করে আসছে।
                </p>
              </div>
              <div>
                <p style={{ color: '#4a5568', lineHeight: 1.9, fontSize: 14, marginBottom: 12 }}>
                  আমাদের সংগঠন প্রতি বছর বিভিন্ন events, reunions এবং cultural programs আয়োজন করে থাকে।
                </p>
                <p style={{ color: '#4a5568', lineHeight: 1.9, fontSize: 14 }}>
                  Blood donation, scholarship program এবং community service এও আমরা সক্রিয়ভাবে অংশগ্রহণ করি।
                </p>
              </div>
            </div>
          </section>

          {/* ── VALUES ── */}
          <section className="a5">
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0d2b10', marginBottom: 8 }}>আমাদের মূল্যবোধ</h2>
              <p style={{ color: '#6b7280', fontSize: 14 }}>যে নীতিগুলো আমাদের পরিচালিত করে</p>
            </div>

            <div className="val-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 48 }}>
              {values.map((item) => (
                <div key={item.label} className="val-card" style={{ background: '#fff', borderRadius: 20, padding: '32px 20px', textAlign: 'center', border: '1.5px solid #e8f5e9', boxShadow: '0 2px 12px rgba(21,101,29,0.06)' }}>
                  <div style={{ fontSize: 44, marginBottom: 14 }}>{item.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#0d2b10', marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{item.desc}</div>
                </div>
              ))}
            </div>

            {/* CTA Banner */}
            <div style={{ background: 'linear-gradient(135deg,#0d2b10,#15651d,#1a7a24)', borderRadius: 24, padding: '48px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.018) 40px,rgba(255,255,255,0.018) 41px)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
                  HPCAA Alumni Community তে যোগ দাও
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.8 }}>
                  ২০০০+ প্রাক্তন শিক্ষার্থীদের সাথে সংযুক্ত হও। সুযোগ ভাগ করো, একসাথে আরও শক্তিশালী হও।
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '13px 28px', background: '#fff', color: '#15651d', borderRadius: 10, fontSize: 14, fontWeight: 800, textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', transition: 'all 0.2s' }}>
                    Register করো →
                  </a>
                  <a href="/alumni" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '13px 24px', background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s' }}>
                    Alumni দেখো
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── SEO Text (hidden visually but crawlable) ── */}
          <section style={{ marginTop: 48, padding: '24px 0', borderTop: '1px solid #e8f5e9' }} aria-label="About HPCAA">
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#15651d', marginBottom: 10 }}>
              Hamdard Public College Alumni Association (HPCAA) — সংক্ষিপ্ত পরিচিতি
            </h2>
            <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.9, maxWidth: 720 }}>
              HPCAA বা Hamdard Public College Alumni Association হলো ঢাকার হামদর্দ পাবলিক কলেজের 
              প্রাক্তন শিক্ষার্থীদের অফিসিয়াল সংগঠন। এই সংগঠনটি দেশে ও বিদেশে ছড়িয়ে থাকা 
              হামদর্দ কলেজের সকল alumni দের একটি শক্তিশালী নেটওয়ার্কে যুক্ত করার লক্ষ্যে কাজ করে।
              HPCAA তে যোগ দিতে আজই <a href="/register" style={{ color: '#15651d', fontWeight: 600 }}>register করুন</a>।
            </p>
          </section>

        </div>
      </div>
    </>
  )
}