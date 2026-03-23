import Link from 'next/link'

export const metadata = {
  title: 'HPCAA | Hamdard Public College Alumni Association — Official Website',
  description:
    'Hamdard Public College Alumni Association (HPCAA) — হামদর্দ পাবলিক কলেজের প্রাক্তন শিক্ষার্থীদের অফিসিয়াল platform। Alumni directory, events, jobs, news এবং community।',
  keywords: [
    'hpc','HPCAA','hpcaa','hpc alumni', 'Hamdard Public College Alumni Association',
    'Hamdard Alumni', 'হামদর্দ পাবলিক কলেজ অ্যালামনাই',
    'HPC Alumni Bangladesh', 'Hamdard public College Alumni Dhaka',
  ],
  openGraph: {
    title: 'HPCAA | Hamdard Public College Alumni Association',
    description: 'হামদর্দ পাবলিক কলেজের প্রাক্তন শিক্ষার্থীদের অফিসিয়াল platform।',
    url: 'https://hamdard-public-college-alumni-assoc.vercel.app',
    siteName: 'Hamdard Public College Alumni Association',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen" style={{
      background: '#0a0f0a',
      fontFamily: "'Georgia', serif",
      color: '#f0ede6'
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hpcaa-root {
          font-family: 'DM Sans', sans-serif;
          background: #0a0f0a;
          color: #f0ede6;
          min-height: 100vh;
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 20px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(10, 15, 10, 0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(134, 179, 105, 0.15);
        }

        .logo-wrap {
          display: flex; align-items: center; gap: 12px;
          text-decoration: none;
        }

        .logo-circle {
          width: 44px; height: 44px; border-radius: 50%;
          border: 2px solid #86b369;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 20px; font-weight: 900; color: #86b369;
        }

        .logo-text { line-height: 1.2; }
        .logo-main { font-weight: 700; color: #f0ede6; font-size: 15px; }
        .logo-sub { font-size: 11px; color: #86b369; letter-spacing: 1.5px; text-transform: uppercase; }

        .nav-links { display: flex; gap: 36px; list-style: none; }
        .nav-links a {
          color: #b8b2a7; text-decoration: none;
          font-size: 14px; font-weight: 400; letter-spacing: 0.3px;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: #f0ede6; }

        .nav-login {
          padding: 10px 24px; background: transparent;
          border: 1.5px solid #86b369; color: #86b369;
          border-radius: 4px; font-size: 14px; font-weight: 500;
          text-decoration: none; transition: all 0.2s;
        }
        .nav-login:hover { background: #86b369; color: #0a0f0a; }

        /* Hero */
        .hero {
          padding-top: 160px; padding-bottom: 100px;
          padding-left: 48px; padding-right: 48px;
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px;
          border: 1px solid rgba(134, 179, 105, 0.4);
          border-radius: 20px; font-size: 12px; color: #86b369;
          letter-spacing: 1px; text-transform: uppercase; margin-bottom: 28px;
        }
        .hero-badge::before {
          content: ''; width: 6px; height: 6px;
          background: #86b369; border-radius: 50%;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 52px; font-weight: 900; line-height: 1.1;
          margin-bottom: 24px; color: #f0ede6;
        }
        .hero-title em { font-style: italic; color: #86b369; }

        .hero-desc {
          font-size: 16px; color: #b8b2a7;
          line-height: 1.8; margin-bottom: 40px; font-weight: 300;
        }

        .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }

        .btn-primary {
          padding: 14px 32px; background: #86b369; color: #0a0f0a;
          border-radius: 4px; font-size: 14px; font-weight: 600;
          text-decoration: none; transition: all 0.2s;
        }
        .btn-primary:hover { background: #9dc97f; transform: translateY(-1px); }

        .btn-ghost {
          padding: 14px 32px; background: transparent; color: #f0ede6;
          border-radius: 4px; font-size: 14px; font-weight: 400;
          text-decoration: none;
          border: 1px solid rgba(240,237,230,0.2); transition: all 0.2s;
        }
        .btn-ghost:hover { border-color: rgba(240,237,230,0.5); }

        /* Hero Card */
        .hero-card {
          background: #111a11;
          border: 1px solid rgba(134, 179, 105, 0.2);
          border-radius: 16px; padding: 36px;
          position: relative; overflow: hidden;
        }
        .hero-card::before {
          content: ''; position: absolute;
          top: -60px; right: -60px; width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(134,179,105,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .stat-row {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 20px; margin-bottom: 24px;
        }

        .stat-item {
          background: rgba(134, 179, 105, 0.06);
          border: 1px solid rgba(134, 179, 105, 0.15);
          border-radius: 10px; padding: 20px; text-align: center;
        }
        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 32px; font-weight: 700; color: #86b369;
          line-height: 1; margin-bottom: 6px;
        }
        .stat-label {
          font-size: 12px; color: #7a7570;
          letter-spacing: 0.5px; text-transform: uppercase;
        }

        .member-preview {
          background: rgba(134, 179, 105, 0.06);
          border: 1px solid rgba(134, 179, 105, 0.15);
          border-radius: 10px; padding: 16px 20px;
          display: flex; align-items: center; gap: 14px;
        }
        .avatars { display: flex; }
        .avatar {
          width: 32px; height: 32px; border-radius: 50%;
          border: 2px solid #0a0f0a; margin-left: -8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 600; color: #0a0f0a;
        }
        .avatar:first-child { margin-left: 0; }
        .member-text { flex: 1; }
        .member-text strong { font-size: 13px; color: #f0ede6; display: block; }
        .member-text span { font-size: 11px; color: #7a7570; }

        /* Features */
        .features {
          padding: 100px 48px;
          max-width: 1200px; margin: 0 auto;
        }
        .section-label {
          font-size: 11px; color: #86b369;
          letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 40px; font-weight: 700;
          margin-bottom: 60px; color: #f0ede6; max-width: 500px;
        }
        .features-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: rgba(134, 179, 105, 0.1);
          border: 1px solid rgba(134, 179, 105, 0.1);
          border-radius: 16px; overflow: hidden;
        }
        .feature-item {
          background: #0a0f0a; padding: 36px 32px; transition: background 0.2s;
        }
        .feature-item:hover { background: #111a11; }
        .feature-icon { font-size: 28px; margin-bottom: 16px; }
        .feature-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px; font-weight: 700; color: #f0ede6; margin-bottom: 10px;
        }
        .feature-desc { font-size: 14px; color: #7a7570; line-height: 1.7; }

        /* SEO text — hidden visually but readable by Google */
        .seo-text {
          position: absolute;
          width: 1px; height: 1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
        }

        /* CTA Band */
        .green-band {
          background: #86b369; padding: 60px 48px; text-align: center;
        }
        .green-band h2 {
          font-family: 'Playfair Display', serif;
          font-size: 36px; font-weight: 900; color: #0a0f0a; margin-bottom: 12px;
        }
        .green-band p { font-size: 16px; color: rgba(10,15,10,0.7); margin-bottom: 28px; }
        .btn-dark {
          display: inline-block; padding: 14px 36px;
          background: #0a0f0a; color: #86b369;
          border-radius: 4px; font-size: 14px; font-weight: 600;
          text-decoration: none; transition: all 0.2s;
        }
        .btn-dark:hover { background: #111a11; }

        /* Footer */
        .footer {
          padding: 48px;
          border-top: 1px solid rgba(134, 179, 105, 0.1);
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
        }
        .footer-copy { font-size: 13px; color: #4a4845; }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a {
          font-size: 13px; color: #4a4845;
          text-decoration: none; transition: color 0.2s;
        }
        .footer-links a:hover { color: #86b369; }

        @media (max-width: 768px) {
          .navbar { padding: 16px 20px; }
          .nav-links { display: none; }
          .hero { grid-template-columns: 1fr; padding: 120px 20px 60px; gap: 40px; }
          .hero-title { font-size: 36px; }
          .features { padding: 60px 20px; }
          .features-grid { grid-template-columns: 1fr; }
          .green-band { padding: 48px 20px; }
          .footer { flex-direction: column; gap: 20px; padding: 32px 20px; text-align: center; }
        }
      `}</style>

      <div className="hpcaa-root">

        {/* SEO — Hidden structured text for Google */}
        <div className="seo-text">
          <h1>Hamdard Public College Alumni Association (HPCAA) — Official Website</h1>
          <p>
            HPCAA is the official alumni association of Hamdard Public College, Dhaka, Bangladesh.
            হামদর্দ পাবলিক কলেজ অ্যালামনাই অ্যাসোসিয়েশন (HPCAA) হল হামদর্দ পাবলিক কলেজের
            প্রাক্তন শিক্ষার্থীদের অফিসিয়াল সংগঠন।
            Connect with Hamdard alumni, join HPCAA events, find jobs, and build community.
          </p>
        </div>

        {/* Navbar */}
        <nav className="navbar" aria-label="Main Navigation">
          <Link href="/" className="logo-wrap" aria-label="HPCAA Home">
            <div className="logo-circle">H</div>
            <div className="logo-text">
              <div className="logo-main">HPCAA</div>
              <div className="logo-sub">Alumni Association</div>
            </div>
          </Link>

          <ul className="nav-links">
            <li><a href="/about">About</a></li>
            <li><a href="/alumni">Alumni</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>

          <Link href="/login" className="nav-login">Login করো</Link>
        </nav>

        {/* Hero */}
        <section className="hero" aria-label="Hero Section">
          <div>
            <div className="hero-badge">
              Hamdard Public College Alumni Association — HPCAA
            </div>

            <h1 className="hero-title">
              Hamdard Public College <em>Alumni</em>-দের জন্য একটি বিশেষ জায়গা
            </h1>

            <p className="hero-desc">
              Hamdard Public College Alumni Association (HPCAA) — প্রাক্তন শিক্ষার্থীদের সাথে
              সংযুক্ত হোন। সুযোগ ভাগ করুন। একসাথে আরও শক্তিশালী হই।
            </p>

            <div className="hero-buttons">
              <Link href="/register" className="btn-primary">
                Join HPCAA — Register করো
              </Link>
              <Link href="/alumni" className="btn-ghost">
                Alumni Directory দেখো →
              </Link>
            </div>
          </div>

          <div className="hero-card" aria-label="Stats">
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-number">২৫০০+</div>
                <div className="stat-label">HPCAA Alumni</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">২০+</div>
                <div className="stat-label">Countries</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">৫০০+</div>
                <div className="stat-label">Professionals</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">১৫+</div>
                <div className="stat-label">Districts</div>
              </div>
            </div>

            <div className="member-preview">
              <div className="avatars">
                <div className="avatar" style={{background: '#86b369'}}>ক</div>
                <div className="avatar" style={{background: '#9dc97f'}}>র</div>
                <div className="avatar" style={{background: '#b8d4a0'}}>ম</div>
                <div className="avatar" style={{background: '#d4e8c4'}}>স</div>
              </div>
              <div className="member-text">
                <strong>নতুন HPCAA members যোগ দিচ্ছে</strong>
                <span>এই মাসে ৪৮ জন নতুন alumni joined</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features" aria-label="Platform Features">
          <div className="section-label">HPCAA Platform Features</div>
          <h2 className="section-title">
            Hamdard Alumni Platform এ যা পাবে
          </h2>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🎓</div>
              <h3 className="feature-title">Alumni Directory</h3>
              <p className="feature-desc">
                Hamdard Public College এর alumni-দের Batch, department বা location দিয়ে খুঁজো
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📅</div>
              <h3 className="feature-title">Events & Reunions</h3>
              <p className="feature-desc">
                HPCAA upcoming events দেখো, RSVP করো এবং reunion এ অংশ নাও
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💼</div>
              <h3 className="feature-title">Job Board</h3>
              <p className="feature-desc">
                Hamdard alumni-দের job circular এবং career opportunities খুঁজো
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📰</div>
              <h3 className="feature-title">News & Updates</h3>
              <p className="feature-desc">
                Hamdard Public College এবং HPCAA association এর সর্বশেষ খবর পড়ো
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🤝</div>
              <h3 className="feature-title">Mentorship</h3>
              <p className="feature-desc">
                Senior Hamdard alumni-দের কাছ থেকে career guidance নাও
              </p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Donation</h3>
              <p className="feature-desc">
                Hamdard Public College development ও scholarship fund এ contribute করো
              </p>
            </div>
          </div>
        </section>

        {/* About Section — SEO এর জন্য গুরুত্বপূর্ণ */}
        <section style={{ background: '#0d150d', padding: '80px 48px' }} aria-label="About HPCAA">
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 700, color: '#f0ede6', marginBottom: 20 }}>
              Hamdard Public College Alumni Association সম্পর্কে
            </h2>
            <p style={{ fontSize: 16, color: '#7a7570', lineHeight: 1.9, marginBottom: 16 }}>
              <strong style={{ color: '#86b369' }}>HPCAA (Hamdard Public College Alumni Association)</strong> হল
              হামদর্দ পাবলিক কলেজ, ঢাকার প্রাক্তন শিক্ষার্থীদের অফিসিয়াল সংগঠন।
              আমাদের লক্ষ্য হল Hamdard alumni-দের একত্রিত করা, নেটওয়ার্ক গড়ে তোলা
              এবং কলেজের উন্নয়নে ভূমিকা রাখা।
            </p>
            <p style={{ fontSize: 16, color: '#7a7570', lineHeight: 1.9 }}>
              HPCAA-তে যোগ দিন এবং ২৫০০+ Hamdard alumni-র সাথে সংযুক্ত হন।
              Events, job opportunities, mentorship এবং আরও অনেক কিছু পাবেন।
            </p>
          </div>
        </section>

        {/* CTA Band */}
        <div className="green-band">
          <h2>HPCAA তে যোগ দাও আজই!</h2>
          <p>
            Hamdard Public College এর প্রাক্তন শিক্ষার্থী হলে আজই register করো — সম্পূর্ণ বিনামূল্যে
          </p>
          <Link href="/register" className="btn-dark">
            HPCAA তে Register করো →
          </Link>
        </div>

        {/* Footer */}
        <footer className="footer" aria-label="Footer">
          <div className="footer-copy">
            © 2025 Hamdard Public College Alumni Association (HPCAA) — All rights reserved
          </div>
          <div className="footer-links">
            <Link href="/about">About HPCAA</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </footer>

      </div>
    </main>
  )
}