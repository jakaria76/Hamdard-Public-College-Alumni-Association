'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProfileViewPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('info')
  const [avatarFull, setAvatarFull] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') { window.location.href = '/login'; return }
    if (status === 'authenticated') fetchProfile()
  }, [status])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      const data = await res.json()
      setProfile(data.profile)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  if (status === 'loading' || loading) return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <div style={{ position: 'relative', width: 64, height: 64 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(139,92,246,0.2)' }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid transparent', borderTopColor: '#8b5cf6', animation: 'sp 0.8s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#06b6d4', animation: 'sp 1.2s linear infinite reverse' }} />
      </div>
      <p style={{ color: 'rgba(139,92,246,0.7)', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui' }}>Loading Profile</p>
      <style>{`@keyframes sp{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  const userName = session?.user?.name || 'Alumni'
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const avatar = profile?.profileImagePath || session?.user?.image || null
  const cFields = [profile?.fullName, profile?.dateOfBirth, profile?.gender, profile?.bloodGroup, profile?.presentAddress, profile?.district, profile?.collegeName, profile?.collegePassingYear, profile?.universityName, profile?.shortBio, profile?.facebook, profile?.profileImagePath]
  const completion = Math.round((cFields.filter(Boolean).length / cFields.length) * 100)

  const TABS = [
    { id: 'info', label: 'Info', icon: '👤' },
    { id: 'edu', label: 'Education', icon: '🎓' },
    { id: 'blood', label: 'Blood', icon: '🩸' },
    { id: 'bio', label: 'Bio', icon: '✍️' },
  ]

  // Gradient map for different fields
  const gradients = {
    purple: 'linear-gradient(135deg,#8b5cf6,#6d28d9)',
    cyan: 'linear-gradient(135deg,#06b6d4,#0891b2)',
    pink: 'linear-gradient(135deg,#ec4899,#be185d)',
    orange: 'linear-gradient(135deg,#f59e0b,#d97706)',
    green: 'linear-gradient(135deg,#10b981,#059669)',
    red: 'linear-gradient(135deg,#ef4444,#dc2626)',
    indigo: 'linear-gradient(135deg,#6366f1,#4f46e5)',
  }

  const Row = ({ label, value, bn, accent = '#8b5cf6' }) => (
    <div style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ fontSize: 9, fontWeight: 800, color: accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4, fontFamily: 'system-ui' }}>{label}</div>
      {value
        ? <div style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.6, fontFamily: bn ? 'Noto Serif Bengali, serif' : "'Plus Jakarta Sans', system-ui", fontWeight: 400 }}>{value}</div>
        : <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>—</div>
      }
    </div>
  )

  const SH = ({ icon, title, gradient = gradients.purple }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, marginTop: 24, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>{icon}</div>
      <span style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: 13, fontWeight: 800, color: '#f1f5f9', letterSpacing: 1, textTransform: 'uppercase' }}>{title}</span>
    </div>
  )

  const mapHtml = (lat, lng) => `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"><\/script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body,#map{width:100%;height:100%}
.pw{position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center}
.p1{position:absolute;width:40px;height:40px;border-radius:50%;background:rgba(139,92,246,0.2);animation:pu 2s ease-out infinite}
.p2{position:absolute;width:24px;height:24px;border-radius:50%;background:rgba(6,182,212,0.3);animation:pu 2s ease-out 0.6s infinite}
.pd{width:14px;height:14px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#06b6d4);border:3px solid #fff;box-shadow:0 0 16px rgba(139,92,246,0.8);z-index:2;position:relative}
@keyframes pu{0%{transform:scale(0.4);opacity:1}100%{transform:scale(2.8);opacity:0}}
.leaflet-popup-content-wrapper{background:linear-gradient(135deg,#1e1b4b,#312e81);border:1px solid rgba(139,92,246,0.4);border-radius:14px;color:#e2e8f0;box-shadow:0 12px 32px rgba(0,0,0,0.5)}
.leaflet-popup-tip{background:#312e81}
.leaflet-popup-content{font-size:12px;line-height:1.7;color:#c4b5fd;margin:10px 14px;font-family:system-ui}
.leaflet-control-zoom a{background:rgba(30,27,75,0.9)!important;color:#8b5cf6!important;border-color:rgba(139,92,246,0.3)!important}
.leaflet-control-attribution{display:none}
</style>
</head>
<body>
<div id="map"></div>
<script>
const lat=${lat},lng=${lng};
const map=L.map('map',{zoomControl:true,dragging:true,scrollWheelZoom:false,attributionControl:false}).setView([lat,lng],15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
const icon=L.divIcon({className:'',html:'<div class="pw"><div class="p1"></div><div class="p2"></div><div class="pd"></div></div>',iconSize:[40,40],iconAnchor:[20,20],popupAnchor:[0,-22]});
L.marker([lat,lng],{icon}).addTo(map).bindPopup('<div style="font-weight:800;color:#c4b5fd;margin-bottom:6px;font-size:13px">📍 Location</div><div style="color:#a5f3fc">'+lat.toFixed(6)+'</div><div style="color:#a5f3fc">'+lng.toFixed(6)+'</div>').openPopup();
L.circle([lat,lng],{color:'rgba(139,92,246,0.5)',fillColor:'rgba(139,92,246,0.08)',fillOpacity:1,weight:2,radius:120}).addTo(map);
<\/script>
</body></html>`

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#0f0c29 0%,#1e1b4b 40%,#0f172a 100%)', color: '#e2e8f0', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Noto+Serif+Bengali:wght@500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes sp{to{transform:rotate(360deg)}}
        @keyframes fu{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes si{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fi{from{opacity:0}to{opacity:1}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(139,92,246,0.3)}50%{box-shadow:0 0 40px rgba(6,182,212,0.4)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}

        .a1{animation:fu 0.55s ease 0.05s both}
        .a2{animation:fu 0.55s ease 0.15s both}
        .a3{animation:fu 0.55s ease 0.25s both}
        .a4{animation:fu 0.55s ease 0.38s both}

        /* Glass */
        .glass{
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:20px;
          backdrop-filter:blur(12px);
          transition:all 0.25s;
        }
        .glass:hover{
          background:rgba(255,255,255,0.06);
          border-color:rgba(139,92,246,0.25);
          box-shadow:0 12px 40px rgba(0,0,0,0.3),0 0 0 1px rgba(139,92,246,0.1);
        }

        /* Nav */
        .nav{
          position:sticky;top:0;z-index:100;
          background:rgba(15,12,41,0.9);
          backdrop-filter:blur(24px);
          border-bottom:1px solid rgba(139,92,246,0.15);
          padding:13px 22px;
          display:flex;align-items:center;justify-content:space-between;
        }

        /* Hero cover */
        .cover{
          position:relative;
          height:380px;
          overflow:hidden;
          background:linear-gradient(160deg,#1e1b4b,#0f0c29);
        }
        .cover-img{
          width:100%;height:100%;
          object-fit:cover;object-position:top center;
          opacity:0.75;cursor:pointer;
          transition:opacity 0.3s,transform 0.6s;
          display:block;
        }
        .cover-img:hover{opacity:0.9;transform:scale(1.02)}
        .cover-grad{
          position:absolute;inset:0;
          background:linear-gradient(to bottom,
            rgba(30,27,75,0.1) 0%,
            rgba(15,12,41,0.0) 40%,
            rgba(15,12,41,0.85) 80%,
            rgba(15,12,41,1) 100%
          );
          pointer-events:none;
        }
        .cover-side-grad{
          position:absolute;inset:0;
          background:linear-gradient(to right,rgba(139,92,246,0.15) 0%,transparent 40%,rgba(6,182,212,0.08) 100%);
          pointer-events:none;
        }
        .cover-initials{
          width:100%;height:100%;
          display:flex;align-items:center;justify-content:center;
          font-size:110px;font-weight:800;
          background:linear-gradient(135deg,rgba(139,92,246,0.15),rgba(6,182,212,0.12));
          color:rgba(139,92,246,0.2);
          letter-spacing:-4px;
        }
        .cover-text{
          position:absolute;bottom:0;left:0;right:0;
          padding:36px 28px 28px;
        }
        .cover-chip{
          display:inline-flex;align-items:center;gap:6px;
          padding:5px 14px;
          background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.15));
          border:1px solid rgba(139,92,246,0.3);
          border-radius:20px;
          font-size:10px;font-weight:700;
          color:#c4b5fd;letter-spacing:2px;text-transform:uppercase;
          margin-bottom:14px;
        }

        /* Lightbox */
        .lb{position:fixed;inset:0;z-index:999;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;animation:fi 0.2s ease;cursor:pointer;backdrop-filter:blur(16px)}
        .lb img{max-width:92vw;max-height:92vh;object-fit:contain;border-radius:12px;box-shadow:0 0 0 1px rgba(139,92,246,0.3),0 40px 80px rgba(0,0,0,0.8)}
        .lb-x{position:absolute;top:22px;right:26px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#fff;font-size:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s}
        .lb-x:hover{background:rgba(239,68,68,0.2);border-color:rgba(239,68,68,0.4)}

        /* Tabs */
        .tab-bar{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;padding:4px}
        .tab-bar::-webkit-scrollbar{display:none}
        .tb{
          flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:4px;
          padding:10px 18px;border:1.5px solid transparent;border-radius:14px;
          cursor:pointer;background:transparent;
          color:rgba(255,255,255,0.3);
          font-family:'Plus Jakarta Sans',system-ui;font-size:10px;font-weight:700;
          letter-spacing:0.5px;transition:all 0.2s;text-transform:uppercase;
        }
        .tb.on{
          background:linear-gradient(135deg,rgba(139,92,246,0.15),rgba(6,182,212,0.1));
          border-color:rgba(139,92,246,0.3);color:#c4b5fd;
        }
        .tb:hover:not(.on){background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.55)}
        .tb-i{font-size:18px}

        /* Badge */
        .bdg{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.3px;font-family:'Plus Jakarta Sans',system-ui}

        /* Social links */
        .sl{display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:10px;text-decoration:none;border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.55);background:rgba(255,255,255,0.04);font-size:13px;font-weight:500;transition:all 0.2s;white-space:nowrap}
        .sl:hover{border-color:rgba(139,92,246,0.5);color:#c4b5fd;background:rgba(139,92,246,0.1);transform:translateY(-2px);box-shadow:0 6px 20px rgba(139,92,246,0.2)}

        /* Buttons */
        .be{display:inline-flex;align-items:center;gap:7px;padding:10px 22px;background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;border:none;border-radius:10px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',system-ui;letter-spacing:0.5px;transition:all 0.2s;box-shadow:0 4px 14px rgba(139,92,246,0.3)}
        .be:hover{background:linear-gradient(135deg,#7c3aed,#5b21b6);transform:translateY(-1px);box-shadow:0 8px 22px rgba(139,92,246,0.4)}
        .bd{display:inline-flex;align-items:center;gap:6px;padding:10px 16px;background:rgba(239,68,68,0.08);color:#f87171;border:1px solid rgba(239,68,68,0.2);border-radius:10px;font-size:12px;cursor:pointer;font-family:'Plus Jakarta Sans',system-ui;transition:all 0.2s}
        .bd:hover{background:rgba(239,68,68,0.16);border-color:rgba(239,68,68,0.4)}

        /* Stat tile */
        .tile{
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:16px;padding:20px;
          transition:all 0.25s;
        }
        .tile:hover{border-color:rgba(139,92,246,0.3);box-shadow:0 8px 28px rgba(139,92,246,0.1);transform:translateY(-2px)}

        /* Blood circle */
        .bc{
          width:76px;height:76px;border-radius:50%;flex-shrink:0;
          background:linear-gradient(135deg,#ef4444,#b91c1c);
          display:flex;align-items:center;justify-content:center;
          font-size:22px;font-weight:800;color:#fff;
          box-shadow:0 8px 28px rgba(239,68,68,0.4);
          border:2px solid rgba(239,68,68,0.3);
          font-family:'Plus Jakarta Sans',system-ui;
        }

        /* Completion ring */
        .ring{position:relative;width:72px;height:72px;flex-shrink:0}

        /* Colorful progress bars */
        .prog-bg{height:5px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden;margin-top:8px}
        .prog-fill{height:100%;border-radius:3px;transition:width 1.2s ease}

        /* Empty state */
        .empty{text-align:center;padding:72px 32px}

        /* Info grid */
        .ig2{display:grid;grid-template-columns:1fr 1fr;gap:0 28px}

        @media(max-width:600px){
          .cover{height:300px}
          .cover-text{padding:24px 18px 22px}
          .h1{font-size:24px !important}
          .mp{padding:14px !important}
          .ig2{grid-template-columns:1fr}
          .nav{padding:11px 16px}
        }
      `}</style>

      {/* Lightbox */}
      {avatarFull && avatar && (
        <div className="lb" onClick={() => setAvatarFull(false)}>
          <div className="lb-x" onClick={() => setAvatarFull(false)}>✕</div>
          <img src={avatar} alt={userName} onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* Nav */}
      <nav className="nav">
        <button onClick={() => router.push('/dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: '#8b5cf6', fontSize: 13, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', system-ui", fontWeight: 700 }}>
          ← Dashboard
        </button>
        <span style={{ fontSize: 12, color: 'rgba(196,181,253,0.5)', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>Alumni Profile</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {profile ? (
            <>
              <button className="be" onClick={() => router.push('/dashboard/profile/edit')}>✏️ Edit</button>
              <button className="bd" onClick={async () => {
                if (confirm('Profile delete করতে চাও?')) {
                  await fetch('/api/profile', { method: 'DELETE' })
                  setProfile(null)
                }
              }}>🗑️</button>
            </>
          ) : (
            <button className="be" onClick={() => router.push('/dashboard/profile/create')}>+ Create</button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="a1" style={{ position: 'relative', marginBottom: 0 }}>
        <div className="cover">
          {avatar
            ? <>
              <img src={avatar} alt={userName} className="cover-img" onClick={() => setAvatarFull(true)} />
              <div className="cover-side-grad" />
            </>
            : <div className="cover-initials">{initials}</div>
          }
          <div className="cover-grad" />
          <div className="cover-text">
            <div className="cover-chip">✦ HPCAA Alumni</div>
            <h1 className="h1" style={{ fontFamily: "'Plus Jakarta Sans', system-ui", fontSize: 36, fontWeight: 800, color: '#f8fafc', marginBottom: 6, lineHeight: 1.15, letterSpacing: -0.5 }}>
              {profile?.fullName || userName}
            </h1>
            {profile?.fullNameBn && (
              <p style={{ fontFamily: 'Noto Serif Bengali, serif', fontSize: 19, color: '#a5f3fc', marginBottom: 12, fontWeight: 600 }}>{profile.fullNameBn}</p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {profile?.memberType && <span className="bdg" style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)' }}>⭐ {profile.memberType === 'life' ? 'Life Member' : profile.memberType === 'honorary' ? 'Honorary' : 'General Member'}</span>}
              {profile?.committeePosition && <span className="bdg" style={{ background: 'rgba(139,92,246,0.15)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.3)' }}>🏛️ {profile.committeePosition}</span>}
              {profile?.bloodGroup && <span className="bdg" style={{ background: 'rgba(239,68,68,0.12)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.25)' }}>🩸 {profile.bloodGroup}</span>}
              {session?.user?.role && <span className="bdg" style={{ background: 'rgba(6,182,212,0.12)', color: '#67e8f9', border: '1px solid rgba(6,182,212,0.25)' }}>🎓 {session.user.role}</span>}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: 12, color: 'rgba(226,232,240,0.5)', fontWeight: 500 }}>
              <span>✉ {session?.user?.email}</span>
              {profile?.district && <span>📍 {profile.district}{profile.upazila ? `, ${profile.upazila}` : ''}</span>}
              {profile?.memberSince && <span>📅 {new Date(profile.memberSince).getFullYear()} থেকে</span>}
            </div>
            {avatar && (
              <div style={{ marginTop: 10, fontSize: 10, color: 'rgba(196,181,253,0.4)', cursor: 'pointer', letterSpacing: 0.5 }} onClick={() => setAvatarFull(true)}>
                🔍 Click photo to view full size
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mp" style={{ maxWidth: 760, margin: '0 auto', padding: '20px 16px 80px' }}>

        {/* Bio + Stats row */}
        {profile && (
          <div className="a2" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, marginBottom: 16, alignItems: 'stretch' }}>

            {/* Completion */}
            <div className="glass" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 130, animation: 'glow 3s ease infinite' }}>
              <div className="ring">
                <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                  <circle cx="36" cy="36" r="30" fill="none"
                    stroke="url(#grad)" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={`${completion * 1.885} 188.5`}
                    style={{ transition: 'stroke-dasharray 1.3s ease' }}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9', lineHeight: 1 }}>{completion}%</span>
                </div>
              </div>
              <div style={{ fontSize: 9, color: 'rgba(196,181,253,0.5)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 8, fontWeight: 700 }}>Complete</div>
            </div>

            {/* Bio + Social */}
            <div className="glass" style={{ padding: '20px' }}>
              {profile?.shortBio && (
                <p style={{ fontSize: 14, color: 'rgba(226,232,240,0.7)', lineHeight: 1.85, fontStyle: 'italic', borderLeft: '3px solid', borderImage: 'linear-gradient(to bottom,#8b5cf6,#06b6d4) 1', paddingLeft: 14, marginBottom: 14 }}>
                  &ldquo;{profile.shortBio}&rdquo;
                </p>
              )}
              {(profile?.facebook || profile?.portfolioWebsite || profile?.whatsAppNumber) && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {profile?.facebook && <a href={profile.facebook} target="_blank" rel="noreferrer" className="sl">📘 Facebook</a>}
                  {profile?.portfolioWebsite && <a href={profile.portfolioWebsite} target="_blank" rel="noreferrer" className="sl">🌐 Portfolio</a>}
                  {profile?.whatsAppNumber && <a href={`https://wa.me/${profile.whatsAppNumber}`} target="_blank" rel="noreferrer" className="sl">💬 WhatsApp</a>}
                </div>
              )}
              {!profile?.shortBio && !profile?.facebook && (
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.18)', fontStyle: 'italic' }}>Bio এবং social links এখনো যোগ করা হয়নি।</p>
              )}
            </div>
          </div>
        )}

        {/* No Profile */}
        {!profile && (
          <div className="glass a2">
            <div className="empty">
              <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(139,92,246,0.15),rgba(6,182,212,0.1))', border: '2px dashed rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, margin: '0 auto 20px' }}>👤</div>
              <h2 style={{ fontSize: 24, color: '#f1f5f9', marginBottom: 10, fontWeight: 800 }}>Profile তৈরি হয়নি</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 28, maxWidth: 340, margin: '0 auto 28px', lineHeight: 1.8 }}>
                তোমার profile তৈরি করো এবং HPCAA alumni community তে নিজেকে পরিচয় করিয়ে দাও।
              </p>
              <button className="be" onClick={() => router.push('/dashboard/profile/create')} style={{ fontSize: 14, padding: '13px 32px' }}>
                + Profile তৈরি করো
              </button>
            </div>
          </div>
        )}

        {profile && (
          <>
            {/* Tab Bar */}
            <div className="glass a3" style={{ padding: '5px', marginBottom: 14 }}>
              <div className="tab-bar">
                {TABS.map(t => (
                  <button key={t.id} className={`tb${tab === t.id ? ' on' : ''}`} onClick={() => setTab(t.id)}>
                    <span className="tb-i">{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB: INFO */}
            {tab === 'info' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, animation: 'si 0.3s ease both' }}>

                {/* Basic */}
                <div className="glass a3" style={{ padding: '22px' }}>
                  <SH icon="👤" title="Basic Information" gradient={gradients.purple} />
                  <div className="ig2">
                    <Row label="Full Name" value={profile.fullName} accent="#a78bfa" />
                    <Row label="বাংলা নাম" value={profile.fullNameBn} bn accent="#67e8f9" />
                    <Row label="Gender" value={profile.gender === 'male' ? '♂ Male' : profile.gender === 'female' ? '♀ Female' : profile.gender} accent="#a78bfa" />
                    <Row label="Date of Birth" value={profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null} accent="#67e8f9" />
                    <Row label="Member Type" value={profile.memberType} accent="#a78bfa" />
                    <Row label="Position" value={profile.committeePosition} accent="#67e8f9" />
                  </div>
                </div>

                {/* Contact */}
                <div className="glass a4" style={{ padding: '22px' }}>
                  <SH icon="📞" title="Contact & Address" gradient={gradients.cyan} />
                  <Row label="Present Address" value={profile.presentAddress} accent="#67e8f9" />
                  <Row label="Permanent Address" value={profile.permanentAddress} accent="#67e8f9" />
                  <div className="ig2">
                    <Row label="জেলা" value={profile.district} accent="#a78bfa" />
                    <Row label="উপজেলা" value={profile.upazila} accent="#67e8f9" />
                    <Row label="Alt. Mobile" value={profile.alternativeMobile} accent="#a78bfa" />
                    <Row label="WhatsApp" value={profile.whatsAppNumber} accent="#67e8f9" />
                  </div>

                  {/* Map */}
                  {profile.latitude && profile.longitude && (
                    <div style={{ marginTop: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, padding: '12px 16px', background: 'linear-gradient(135deg,rgba(139,92,246,0.1),rgba(6,182,212,0.06))', borderRadius: 12, border: '1px solid rgba(139,92,246,0.2)' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, boxShadow: '0 4px 12px rgba(139,92,246,0.3)' }}>📍</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, color: '#a78bfa', fontWeight: 800, marginBottom: 3, letterSpacing: 1.5, textTransform: 'uppercase' }}>GPS Location</div>
                          <div style={{ fontSize: 11, color: '#67e8f9', fontFamily: 'monospace', fontWeight: 600 }}>{Number(profile.latitude).toFixed(6)}, {Number(profile.longitude).toFixed(6)}</div>
                          {profile.locationDms && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{profile.locationDms}</div>}
                        </div>
                        <a href={`https://www.google.com/maps?q=${profile.latitude},${profile.longitude}`} target="_blank" rel="noreferrer" className="sl" style={{ fontSize: 11, padding: '6px 12px', flexShrink: 0 }}>
                          Open Maps
                        </a>
                      </div>
                      <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(139,92,246,0.25)', boxShadow: '0 8px 32px rgba(139,92,246,0.15)' }}>
                        <iframe srcDoc={mapHtml(profile.latitude, profile.longitude)} width="100%" height="260" style={{ display: 'block', border: 'none' }} title="Location Map" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: EDUCATION */}
            {tab === 'edu' && (
              <div className="glass a3" style={{ padding: '22px', animation: 'si 0.3s ease both' }}>
                <SH icon="🏫" title="School" gradient={gradients.green} />
                <div className="ig2">
                  <Row label="School Name" value={profile.schoolName} accent="#6ee7b7" />
                  <Row label="Group" value={profile.schoolGroup} accent="#6ee7b7" />
                  <Row label="Passing Year" value={profile.schoolPassingYear} accent="#6ee7b7" />
                </div>

                <SH icon="🏛️" title="College" gradient={gradients.orange} />
                <div className="ig2">
                  <Row label="College Name" value={profile.collegeName} accent="#fcd34d" />
                  <Row label="Department" value={profile.collegeGroup === 'science' ? 'Science' : profile.collegeGroup === 'arts' ? 'Arts' : profile.collegeGroup === 'commerce' ? 'Commerce' : profile.collegeGroup} accent="#fcd34d" />
                  <Row label="Passing Year" value={profile.collegePassingYear} accent="#fcd34d" />
                </div>

                <SH icon="🎓" title="University" gradient={gradients.indigo} />
                <Row label="University Name" value={profile.universityName} accent="#a5b4fc" />
                <div className="ig2">
                  <Row label="Department" value={profile.department} accent="#a5b4fc" />
                  <Row label="Student ID" value={profile.studentId} accent="#a5b4fc" />
                  <Row label="Current Year" value={profile.currentYear ? `${profile.currentYear}th Year` : null} accent="#c4b5fd" />
                  <Row label="Semester" value={profile.currentSemester ? `${profile.currentSemester}th Semester` : null} accent="#c4b5fd" />
                </div>
              </div>
            )}

            {/* TAB: BLOOD */}
            {tab === 'blood' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, animation: 'si 0.3s ease both' }}>
                <div className="glass a3" style={{ padding: '22px' }}>
                  <SH icon="🩸" title="Blood Information" gradient={gradients.red} />

                  {/* Blood hero */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '20px', background: 'linear-gradient(135deg,rgba(239,68,68,0.08),rgba(185,28,28,0.04))', borderRadius: 16, border: '1px solid rgba(239,68,68,0.15)', marginBottom: 22 }}>
                    {profile.bloodGroup
                      ? <div className="bc">{profile.bloodGroup}</div>
                      : <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'rgba(239,68,68,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, border: '2px dashed rgba(239,68,68,0.2)', flexShrink: 0 }}>🩸</div>
                    }
                    <div>
                      <div style={{ fontSize: 26, fontWeight: 800, color: '#f1f5f9', marginBottom: 4 }}>{profile.bloodGroup || 'Unknown'}</div>
                      <div style={{ fontSize: 9, color: '#fca5a5', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700 }}>Blood Group</div>
                      {profile.donationEligibility && (
                        <span className="bdg" style={{
                          background: profile.donationEligibility === 'eligible' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)',
                          color: profile.donationEligibility === 'eligible' ? '#6ee7b7' : '#fca5a5',
                          border: `1px solid ${profile.donationEligibility === 'eligible' ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.22)'}`,
                        }}>
                          {profile.donationEligibility === 'eligible' ? '✅ Eligible to Donate' : '⏸ Not Eligible'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                    <div className="tile" style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 42, fontWeight: 800, color: '#fca5a5', lineHeight: 1, background: 'linear-gradient(135deg,#ef4444,#f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {profile.totalDonationCount || 0}
                      </div>
                      <div style={{ fontSize: 9, color: 'rgba(252,165,165,0.5)', marginTop: 4, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700 }}>Total Donations</div>
                    </div>
                    <div className="tile">
                      <div style={{ fontSize: 9, color: 'rgba(167,243,208,0.5)', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>Preferred Location</div>
                      <div style={{ fontSize: 15, color: profile.preferredDonationLocation ? '#d1fae5' : 'rgba(255,255,255,0.15)', fontStyle: profile.preferredDonationLocation ? 'normal' : 'italic', fontWeight: 600 }}>
                        {profile.preferredDonationLocation || '—'}
                      </div>
                    </div>
                  </div>

                  <div className="ig2">
                    <Row label="Last Donation" value={profile.lastDonationDate ? new Date(profile.lastDonationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null} accent="#fca5a5" />
                    <Row label="Next Available" value={profile.nextAvailableDonationDate ? new Date(profile.nextAvailableDonationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null} accent="#fca5a5" />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: BIO */}
            {tab === 'bio' && (
              <div className="glass a3" style={{ padding: '22px', animation: 'si 0.3s ease both' }}>
                <SH icon="✍️" title="Personal Bio" gradient={gradients.pink} />
                {[
                  { l: 'Short Bio', v: profile.shortBio, accent: '#f9a8d4', large: true },
                  { l: 'কেন HPCAA তে join করলে', v: profile.whyJoined, accent: '#c4b5fd' },
                  { l: 'Future Goals', v: profile.futureGoals, accent: '#67e8f9' },
                  { l: 'Hobbies & Interests', v: profile.hobbies, accent: '#6ee7b7' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '14px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div style={{ fontSize: 9, fontWeight: 800, color: item.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>{item.l}</div>
                    {item.v
                      ? <p style={{ fontSize: item.large ? 15 : 14, color: 'rgba(226,232,240,0.82)', lineHeight: 1.95, fontStyle: item.large ? 'italic' : 'normal', fontWeight: item.large ? 400 : 400 }}>{item.v}</p>
                      : <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.18)', fontStyle: 'italic' }}>দেওয়া হয়নি</span>
                    }
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}