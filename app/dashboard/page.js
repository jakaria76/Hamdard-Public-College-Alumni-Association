'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const slides = [
    { bg: '#1a2e1a', title: 'বার্ষিক পুনর্মিলনী ২০২৫', sub: 'আগামী মাসে হতে যাচ্ছে HPCAA Grand Reunion', icon: '🎓' },
    { bg: '#0d1f2d', title: 'নতুন Job Circular', sub: 'Alumni-দের জন্য ৫টি নতুন সুযোগ এসেছে', icon: '💼' },
    { bg: '#1f1a0d', title: 'Scholarship Program', sub: 'মেধাবী শিক্ষার্থীদের জন্য আবেদন চলছে', icon: '🏆' },
  ]

  const notices = [
    '📢 বার্ষিক পুনর্মিলনী ২০২৫ — আগামী ১৫ মার্চ',
    '🎓 নতুন Batch এর Alumni registration শুরু হয়েছে',
    '💼 Job Fair ২০২৫ — ২০ ফেব্রুয়ারি, ঢাকা',
    '🏆 Scholarship application deadline: ২৮ ফেব্রুয়ারি',
    '📰 HPCAA Newsletter — January 2025 প্রকাশিত হয়েছে',
  ]

  const navItems = [
    { id: 'dashboard', label: 'হোম', path: '/dashboard' },
    { id: 'alumni', label: 'Alumni Directory', path: '/alumni' },
    { id: 'events', label: 'Events', path: '/events' },
    { id: 'news', label: 'News', path: '/news' },
    { id: 'jobs', label: 'Job Board', path: '/jobs' },
    { id: 'gallery', label: 'Gallery', path: '/gallery' },
    { id: 'donate', label: 'Donate', path: '/donate' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ]

  const menuItems = [
    { id: 'dashboard', icon: '⊞', label: 'Dashboard', path: '/dashboard' },
    { id: 'profile', icon: '👤', label: 'My Profile', path: '/dashboard/profile' },
    { id: 'alumni', icon: '🎓', label: 'Alumni Directory', path: '/alumni' },
    { id: 'events', icon: '📅', label: 'Events', path: '/events' },
    { id: 'news', icon: '📰', label: 'News', path: '/news' },
    { id: 'jobs', icon: '💼', label: 'Job Board', path: '/jobs' },
    { id: 'gallery', icon: '🖼️', label: 'Gallery', path: '/gallery' },
    { id: 'donate', icon: '💰', label: 'Donate', path: '/donate' },
  ]

  // ✅ session check — unauthenticated হলে login এ পাঠাও
  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/login'
    }
  }, [status])

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentSlide(p => (p + 1) % slides.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0f0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '3px solid #86b369', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#7a7570', fontSize: 14 }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  // ✅ session না থাকলে কিছু render করো না
  if (!session) return null

  const userName = session?.user?.name || 'Alumni'
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <div style={{ minHeight: '100vh', background: '#f0ede6', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&family=Noto+Serif+Bengali:wght@600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .marquee-wrap { flex: 1; overflow: hidden; }
        .marquee-track { display: flex; gap: 60px; animation: marquee 30s linear infinite; white-space: nowrap; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes typing1 { from { width: 0; } to { width: 100%; } }
        @keyframes typing2 { from { width: 0; opacity: 1; } to { width: 100%; opacity: 1; } }
        @keyframes blink { from, to { border-color: transparent; } 50% { border-color: #1a2e1a; } }
        @keyframes blink2 { from, to { border-color: transparent; } 50% { border-color: #2a5c2a; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .type-line1 { overflow: hidden; white-space: nowrap; border-right: 2.5px solid #1a2e1a; width: 0; animation: typing1 1.8s steps(22, end) 0.3s forwards, blink 0.7s step-end 0.3s 4; }
        .type-line2 { overflow: hidden; white-space: nowrap; border-right: 2.5px solid #2a5c2a; width: 0; opacity: 0; animation: typing2 1.4s steps(16, end) 2.3s forwards, blink2 0.7s step-end 2.3s 4; }
        .type-line3 { opacity: 0; animation: fadeUp 0.8s ease 3.9s forwards; }
        .nav-link { color: #d8ecc8; font-size: 13.5px; font-weight: 400; padding: 11px 16px; cursor: pointer; transition: all 0.15s; white-space: nowrap; border-bottom: 2px solid transparent; }
        .nav-link:hover { color: #fff; background: rgba(134,179,105,0.15); }
        .nav-link.active { color: #86b369; border-bottom-color: #86b369; font-weight: 600; }
        .sidebar { width: 240px; background: #0a0f0a; padding: 24px 0; display: flex; flex-direction: column; transition: width 0.3s; flex-shrink: 0; }
        .sidebar.collapsed { width: 64px; }
        .menu-item { display: flex; align-items: center; gap: 12px; padding: 12px 20px; cursor: pointer; transition: all 0.15s; color: #7a7570; font-size: 14px; font-weight: 400; border-left: 2px solid transparent; }
        .menu-item:hover { color: #f0ede6; background: rgba(134,179,105,0.08); }
        .menu-item.active { color: #86b369; border-left-color: #86b369; background: rgba(134,179,105,0.08); font-weight: 500; }
        .menu-icon { font-size: 16px; flex-shrink: 0; width: 22px; text-align: center; }
        .slide { transition: opacity 0.6s ease; }
        .stat-card { background: #fff; border-radius: 12px; padding: 20px 24px; border: 1px solid rgba(0,0,0,0.06); transition: transform 0.2s, box-shadow 0.2s; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .quick-card { background: #fff; border-radius: 12px; padding: 20px; border: 1px solid rgba(0,0,0,0.06); cursor: pointer; transition: all 0.2s; text-align: center; }
        .quick-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); border-color: #86b369; }
        @media (max-width: 900px) { .sidebar { display: none; } .college-header { padding: 12px 16px !important; } }
      `}</style>

      {/* ══ 1. NOTICE BAR ══ */}
      <div style={{ background: '#1a2e1a', height: 36, display: 'flex', alignItems: 'center', flexShrink: 0, overflow: 'hidden' }}>
        <div style={{ background: '#86b369', padding: '0 14px', height: '100%', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ color: '#0a0f0a', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Latest Notice</span>
        </div>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...notices, ...notices].map((n, i) => (
              <span key={i} style={{ color: '#c8d8b8', fontSize: 13, fontWeight: 300 }}>{n}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 2. COLLEGE HEADER ══ */}
      <div className="college-header" style={{ background: '#fff', padding: '16px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '3px solid #1a3a1a' }}>
        <div style={{ width: 90, height: 90, borderRadius: '50%', overflow: 'hidden', border: '3px solid #2a5c2a', flexShrink: 0, background: '#f0f8ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/images/hpcaa-icon.png" alt="HPCAA Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span style="font-family:Playfair Display,serif;font-size:32px;font-weight:900;color:#1a3a1a">H</span>' }} />
        </div>

        <div style={{ textAlign: 'center', flex: 1, padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <h1 className="type-line1" style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 900, color: '#1a2e1a', letterSpacing: 1, lineHeight: 1.2 }}>HAMDARD PUBLIC COLLEGE</h1>
          <h2 className="type-line2" style={{ fontFamily: 'Noto Serif Bengali, serif', fontSize: 21, fontWeight: 700, color: '#2a5c2a', lineHeight: 1.3 }}>হামদর্দ পাবলিক কলেজ</h2>
          <p className="type-line3" style={{ fontFamily: 'Noto Serif Bengali, serif', fontSize: 13, color: '#86b369', fontWeight: 600, letterSpacing: 0.3 }}>অ্যালামনাই অ্যাসোসিয়েশন (HPCAA) — সংযুক্ত থাকুন, এগিয়ে যান</p>
        </div>

        <div style={{ width: 90, height: 90, borderRadius: '50%', overflow: 'hidden', border: '3px solid #2a5c2a', flexShrink: 0, background: '#f0f8ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/images/hpcaa-icon.png" alt="HPCAA Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span style="font-size:38px">🎓</span>' }} />
        </div>
      </div>

      {/* ══ 3. NAVBAR ══ */}
      <div style={{ background: '#1a3a1a', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(134,179,105,0.2)' }}>
        <div style={{ background: '#86b369', padding: '11px 18px', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', color: '#0a0f0a', borderRadius: '0 0 4px 4px' }}
          onClick={() => setSidebarOpen(p => !p)}>☰</div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', justifyContent: 'center' }}>
          {navItems.map(item => (
            <div key={item.id} className={`nav-link${activeMenu === item.id ? ' active' : ''}`}
              onClick={() => { setActiveMenu(item.id); router.push(item.path) }}>
              {item.label}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', flexShrink: 0 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#f0ede6', lineHeight: 1.1 }}>{userName}</div>
            <div style={{ fontSize: 10, color: '#86b369', textTransform: 'uppercase' }}>{session?.user?.role || 'Alumni'}</div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #86b369', overflow: 'hidden', flexShrink: 0, background: '#0a0f0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {session?.user?.image ? (
              <img src={session.user.image} alt={userName} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = `<span style="font-family:Playfair Display,serif;font-size:14px;font-weight:700;color:#86b369">${userInitial}</span>` }} />
            ) : (
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 14, fontWeight: 700, color: '#86b369' }}>{userInitial}</span>
            )}
          </div>
          <button onClick={() => signOut({ callbackUrl: '/login' })}
            style={{ background: 'rgba(255,100,100,0.12)', border: '1px solid rgba(255,100,100,0.3)', color: '#ff7a7a', padding: '6px 16px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'DM Sans, sans-serif' }}>
            Logout
          </button>
        </div>
      </div>

      {/* ══ 4. BODY ══ */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* Sidebar */}
        <div className={`sidebar${sidebarOpen ? '' : ' collapsed'}`}>
          <div style={{ padding: '0 20px 16px', borderBottom: '1px solid rgba(134,179,105,0.1)', marginBottom: 8 }}>
            {sidebarOpen && <p style={{ fontSize: 10, color: '#4a4845', letterSpacing: 1.5, textTransform: 'uppercase' }}>Navigation</p>}
          </div>
          {menuItems.map(item => (
            <div key={item.id} className={`menu-item${activeMenu === item.id ? ' active' : ''}`}
              onClick={() => { setActiveMenu(item.id); router.push(item.path) }}
              title={!sidebarOpen ? item.label : ''}>
              <span className="menu-icon">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </div>
          ))}
          <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid rgba(134,179,105,0.1)' }}>
            {sidebarOpen && (
              <div style={{ fontSize: 11, color: '#4a4845', lineHeight: 1.6 }}>
                <div style={{ color: '#7a7570', marginBottom: 4 }}>Logged in as</div>
                <div style={{ color: '#86b369', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>{session?.user?.email}</div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>

          {/* Welcome */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>
              স্বাগতম, <span style={{ color: '#86b369', fontStyle: 'italic' }}>{userName}</span>! 👋
            </h1>
            <p style={{ fontSize: 14, color: '#888', fontWeight: 300 }}>তোমার HPCAA Alumni dashboard এ স্বাগতম।</p>
          </div>

          {/* Slider */}
          <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 28, position: 'relative', height: 210 }}>
            {slides.map((slide, i) => (
              <div key={i} className="slide" style={{ position: 'absolute', inset: 0, background: slide.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: currentSlide === i ? 1 : 0, pointerEvents: currentSlide === i ? 'auto' : 'none', padding: 40, textAlign: 'center' }}>
                <div style={{ fontSize: 46, marginBottom: 12 }}>{slide.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#f0ede6', marginBottom: 8 }}>{slide.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(240,237,230,0.6)', fontWeight: 300 }}>{slide.sub}</p>
              </div>
            ))}
            <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} style={{ width: currentSlide === i ? 20 : 6, height: 6, borderRadius: 3, background: currentSlide === i ? '#86b369' : 'rgba(240,237,230,0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
              ))}
            </div>
            <button onClick={() => setCurrentSlide(p => (p - 1 + slides.length) % slides.length)} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: 'none', color: '#f0ede6', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: 18 }}>‹</button>
            <button onClick={() => setCurrentSlide(p => (p + 1) % slides.length)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.4)', border: 'none', color: '#f0ede6', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontSize: 18 }}>›</button>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
            {[
              { num: '২৫০০+', label: 'Total Alumni', icon: '🎓', color: '#86b369' },
              { num: '৪৮', label: 'এই মাসে নতুন', icon: '✨', color: '#6b9fd4' },
              { num: '১২', label: 'Upcoming Events', icon: '📅', color: '#d4956b' },
              { num: '৫', label: 'New Jobs', icon: '💼', color: '#d46b9f' },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.num}</div>
                <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Profile + Quick Links */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#1a2e1a', borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 150, height: 150, background: 'radial-gradient(circle, rgba(134,179,105,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#0a0f0a', border: '2px solid #86b369', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#86b369', flexShrink: 0 }}>{userInitial}</div>
                <div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#f0ede6' }}>{userName}</div>
                  <div style={{ fontSize: 12, color: '#86b369', textTransform: 'capitalize' }}>{session?.user?.role || 'alumni'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                  <span>📧</span>
                  <span style={{ color: '#7a9f6a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session?.user?.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                  <span>✅</span>
                  <span style={{ color: session?.user?.status === 'active' ? '#86b369' : '#d4a56b' }}>
                    {session?.user?.status === 'active' ? 'Active Member' : 'Pending Approval'}
                  </span>
                </div>
              </div>
              <button onClick={() => router.push('/dashboard/profile')}
                style={{ marginTop: 20, padding: '9px 20px', background: 'rgba(134,179,105,0.15)', border: '1px solid rgba(134,179,105,0.3)', borderRadius: 7, color: '#86b369', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                Profile দেখো →
              </button>
            </div>

            <div>
              <h3 style={{ fontSize: 12, color: '#888', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Quick Access</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { icon: '🎓', label: 'Alumni Directory', path: '/alumni' },
                  { icon: '📅', label: 'Events', path: '/events' },
                  { icon: '💼', label: 'Job Board', path: '/jobs' },
                  { icon: '📰', label: 'News', path: '/news' },
                ].map((q, i) => (
                  <div key={i} className="quick-card" onClick={() => router.push(q.path)}>
                    <div style={{ fontSize: 26, marginBottom: 8 }}>{q.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#333' }}>{q.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}