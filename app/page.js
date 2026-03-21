// app/page.js
import Link from 'next/link'

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

        .display-font { font-family: 'Playfair Display', serif; }

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
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo-circle {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 2px solid #86b369;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 900;
          color: #86b369;
        }

        .logo-text { line-height: 1.2; }
        .logo-main { font-weight: 700; color: #f0ede6; font-size: 15px; }
        .logo-sub { font-size: 11px; color: #86b369; letter-spacing: 1.5px; text-transform: uppercase; }

        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
        }

        .nav-links a {
          color: #b8b2a7;
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.3px;
          transition: color 0.2s;
        }

        .nav-links a:hover { color: #f0ede6; }

        .nav-login {
          padding: 10px 24px;
          background: transparent;
          border: 1.5px solid #86b369;
          color: #86b369;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: all 0.2s;
        }

        .nav-login:hover {
          background: #86b369;
          color: #0a0f0a;
        }

        /* Hero */
        .hero {
          padding-top: 160px;
          padding-bottom: 100px;
          padding-left: 48px;
          padding-right: 48px;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border: 1px solid rgba(134, 179, 105, 0.4);
          border-radius: 20px;
          font-size: 12px;
          color: #86b369;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .hero-badge::before {
          content: '';
          width: 6px; height: 6px;
          background: #86b369;
          border-radius: 50%;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 58px;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 24px;
          color: #f0ede6;
        }

        .hero-title em {
          font-style: italic;
          color: #86b369;
        }

        .hero-desc {
          font-size: 16px;
          color: #b8b2a7;
          line-height: 1.8;
          margin-bottom: 40px;
          font-weight: 300;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-primary {
          padding: 14px 32px;
          background: #86b369;
          color: #0a0f0a;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: all 0.2s;
        }

        .btn-primary:hover { background: #9dc97f; transform: translateY(-1px); }

        .btn-ghost {
          padding: 14px 32px;
          background: transparent;
          color: #f0ede6;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 400;
          text-decoration: none;
          letter-spacing: 0.3px;
          border: 1px solid rgba(240,237,230,0.2);
          transition: all 0.2s;
        }

        .btn-ghost:hover { border-color: rgba(240,237,230,0.5); }

        /* Hero Right — Card */
        .hero-card {
          background: #111a11;
          border: 1px solid rgba(134, 179, 105, 0.2);
          border-radius: 16px;
          padding: 36px;
          position: relative;
          overflow: hidden;
        }

        .hero-card::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(134,179,105,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .stat-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }

        .stat-item {
          background: rgba(134, 179, 105, 0.06);
          border: 1px solid rgba(134, 179, 105, 0.15);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: #86b369;
          line-height: 1;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 12px;
          color: #7a7570;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .member-preview {
          background: rgba(134, 179, 105, 0.06);
          border: 1px solid rgba(134, 179, 105, 0.15);
          border-radius: 10px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .avatars {
          display: flex;
        }

        .avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 2px solid #0a0f0a;
          margin-left: -8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          color: #0a0f0a;
        }

        .avatar:first-child { margin-left: 0; }

        .member-text { flex: 1; }
        .member-text strong { font-size: 13px; color: #f0ede6; display: block; }
        .member-text span { font-size: 11px; color: #7a7570; }

        /* Features */
        .features {
          padding: 100px 48px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-label {
          font-size: 11px;
          color: #86b369;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 40px;
          font-weight: 700;
          margin-bottom: 60px;
          color: #f0ede6;
          max-width: 500px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(134, 179, 105, 0.1);
          border: 1px solid rgba(134, 179, 105, 0.1);
          border-radius: 16px;
          overflow: hidden;
        }

        .feature-item {
          background: #0a0f0a;
          padding: 36px 32px;
          transition: background 0.2s;
        }

        .feature-item:hover { background: #111a11; }

        .feature-icon {
          font-size: 28px;
          margin-bottom: 16px;
        }

        .feature-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #f0ede6;
          margin-bottom: 10px;
        }

        .feature-desc {
          font-size: 14px;
          color: #7a7570;
          line-height: 1.7;
        }

        /* Divider band */
        .green-band {
          background: #86b369;
          padding: 60px 48px;
          text-align: center;
        }

        .green-band h2 {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 900;
          color: #0a0f0a;
          margin-bottom: 12px;
        }

        .green-band p {
          font-size: 16px;
          color: rgba(10,15,10,0.7);
          margin-bottom: 28px;
        }

        .btn-dark {
          display: inline-block;
          padding: 14px 36px;
          background: #0a0f0a;
          color: #86b369;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.3px;
          transition: all 0.2s;
        }

        .btn-dark:hover { background: #111a11; }

        /* Footer */
        .footer {
          padding: 48px;
          border-top: 1px solid rgba(134, 179, 105, 0.1);
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-copy {
          font-size: 13px;
          color: #4a4845;
        }

        .footer-links {
          display: flex;
          gap: 24px;
        }

        .footer-links a {
          font-size: 13px;
          color: #4a4845;
          text-decoration: none;
          transition: color 0.2s;
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

        {/* Navbar */}
        <nav className="navbar">
          <Link href="/" className="logo-wrap">
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
        <section className="hero">
          <div>
            <div className="hero-badge">Since 1975 — Hamdard Public College</div>
            <h1 className="hero-title">
              Hpc Alumni-দের জন্য একটি <em>বিশেষ</em> জায়গা hpcaa
            </h1>
            <p className="hero-desc">
              hpcaa প্রাক্তন শিক্ষার্থীদের সাথে সংযুক্ত হোন। hpcaa সুযোগ ভাগ করুন।
              একসাথে আরও শক্তিশালী হই। hpcaa
            </p>
            <div className="hero-buttons">
              <Link href="/register" className="btn-primary">Join Now — Register করো</Link>
              <Link href="/alumni" className="btn-ghost">Alumni দেখো →</Link>
            </div>
          </div>

          <div className="hero-card">
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-number">২৫০০+</div>
                <div className="stat-label">Alumni</div>
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
                <strong>নতুন members যোগ দিচ্ছে</strong>
                <span>এই মাসে ৪৮ জন নতুন alumni joined</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <div className="section-label">Platform Features</div>
          <h2 className="section-title">আমাদের Platform এ যা পাবে</h2>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🎓</div>
              <div className="feature-title">Alumni Directory</div>
              <div className="feature-desc">Batch, department বা location দিয়ে alumni খুঁজো এবং যোগাযোগ করো</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📅</div>
              <div className="feature-title">Events & Reunions</div>
              <div className="feature-desc">Upcoming events দেখো, RSVP করো এবং reunion এ অংশ নাও</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💼</div>
              <div className="feature-title">Job Board</div>
              <div className="feature-desc">Alumni-দের job circular এবং career opportunities খুঁজো</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📰</div>
              <div className="feature-title">News & Updates</div>
              <div className="feature-desc">College এবং association এর সর্বশেষ খবর পড়ো</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🤝</div>
              <div className="feature-title">Mentorship</div>
              <div className="feature-desc">Senior alumni-দের কাছ থেকে career guidance নাও</div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <div className="feature-title">Donation</div>
              <div className="feature-desc">College development ও scholarship fund এ contribute করো</div>
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <div className="green-band">
          <h2>এখনই যোগ দাও!</h2>
          <p>Hamdard Public College এর প্রাক্তন শিক্ষার্থী হলে আজই register করো — সম্পূর্ণ বিনামূল্যে</p>
          <Link href="/register" className="btn-dark">Register করো →</Link>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-copy">
            © 2025 Hamdard Public College Alumni Association (HPCAA)
          </div>
          <div className="footer-links">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </footer>

      </div>
    </main>
  )
}
