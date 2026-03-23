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
    <div style={{ minHeight: '100vh', background: '#060f06', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
      <div style={{ position: 'relative', width: 60, height: 60 }}>
        <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(134,179,105,0.1)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', inset: 0, border: '2px solid transparent', borderTopColor: '#86b369', borderRadius: '50%', animation: 'sp 0.9s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 10, border: '2px solid transparent', borderTopColor: 'rgba(134,179,105,0.3)', borderRadius: '50%', animation: 'sp 1.4s linear infinite reverse' }} />
      </div>
      <p style={{ color: 'rgba(134,179,105,0.5)', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui' }}>Loading Profile</p>
      <style>{`@keyframes sp{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  const userName = session?.user?.name || 'Alumni'
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const avatar = profile?.profileImagePath || session?.user?.image || null
  const cFields = [profile?.fullName, profile?.dateOfBirth, profile?.gender, profile?.bloodGroup, profile?.presentAddress, profile?.district, profile?.collegeName, profile?.collegePassingYear, profile?.universityName, profile?.shortBio, profile?.facebook, profile?.profileImagePath]
  const completion = Math.round((cFields.filter(Boolean).length / cFields.length) * 100)

  const Row = ({ label, value, bn }) => (
    <div style={{ padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(134,179,105,0.45)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
      {value
        ? <div style={{ fontSize: 14, color: '#dedad3', lineHeight: 1.6, fontFamily: bn ? 'Noto Serif Bengali, serif' : 'Outfit, sans-serif', fontWeight: 400 }}>{value}</div>
        : <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)', fontStyle: 'italic' }}>দেওয়া হয়নি</div>
      }
    </div>
  )

  const SH = ({ icon, title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, marginTop: 22, paddingBottom: 10, borderBottom: '1px solid rgba(134,179,105,0.1)' }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(134,179,105,0.1)', border: '1px solid rgba(134,179,105,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{icon}</div>
      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, fontWeight: 700, color: '#c8dba8', letterSpacing: 0.3 }}>{title}</span>
    </div>
  )

  const TABS = [
    { id: 'info', label: 'Info', icon: '👤' },
    { id: 'edu', label: 'Education', icon: '🎓' },
    { id: 'blood', label: 'Blood', icon: '🩸' },
    { id: 'bio', label: 'Bio', icon: '✍️' },
  ]

  const mapHtml = (lat, lng) => `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"><\/script>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body,#map{width:100%;height:100%}
  .pulse-wrap{position:relative;width:32px;height:32px;display:flex;align-items:center;justify-content:center}
  .pulse{position:absolute;width:32px;height:32px;border-radius:50%;background:rgba(134,179,105,0.25);animation:pulse 1.8s ease-out infinite}
  .pulse2{position:absolute;width:20px;height:20px;border-radius:50%;background:rgba(134,179,105,0.35);animation:pulse 1.8s ease-out 0.4s infinite}
  .dot{width:14px;height:14px;border-radius:50%;background:linear-gradient(135deg,#86b369,#4a7c4a);border:3px solid #fff;box-shadow:0 2px 12px rgba(134,179,105,0.8);position:relative;z-index:2}
  @keyframes pulse{0%{transform:scale(0.5);opacity:0.8}100%{transform:scale(2.2);opacity:0}}
  .leaflet-popup-content-wrapper{background:rgba(6,20,6,0.95);border:1px solid rgba(134,179,105,0.4);border-radius:12px;color:#e8e4db;backdrop-filter:blur(10px);box-shadow:0 8px 24px rgba(0,0,0,0.4)}
  .leaflet-popup-tip{background:rgba(6,20,6,0.95)}
  .leaflet-popup-content{font-size:12px;line-height:1.7;color:#c8dba8;margin:10px 14px;font-family:sans-serif}
  .leaflet-control-zoom a{background:rgba(6,20,6,0.9)!important;color:#86b369!important;border-color:rgba(134,179,105,0.3)!important}
  .leaflet-control-zoom a:hover{background:rgba(134,179,105,0.15)!important}
  .leaflet-control-attribution{display:none}
</style>
</head>
<body>
<div id="map"></div>
<script>
  const lat=${lat}, lng=${lng};
  const map=L.map('map',{zoomControl:true,dragging:true,scrollWheelZoom:false,attributionControl:false}).setView([lat,lng],15);

  // Colorful tile layer — Stadia Alidade Smooth (colorful)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);

  const icon=L.divIcon({
    className:'',
    html:'<div class="pulse-wrap"><div class="pulse"></div><div class="pulse2"></div><div class="dot"></div></div>',
    iconSize:[32,32],
    iconAnchor:[16,16],
    popupAnchor:[0,-20],
  });

  L.marker([lat,lng],{icon}).addTo(map)
    .bindPopup('<div style="font-weight:700;color:#86b369;margin-bottom:4px">📍 Location</div><div>' + lat.toFixed(6) + '</div><div>' + lng.toFixed(6) + '</div>')
    .openPopup();

  // Circle highlight
  L.circle([lat,lng],{
    color:'rgba(134,179,105,0.4)',
    fillColor:'rgba(134,179,105,0.08)',
    fillOpacity:1,
    weight:1.5,
    radius:80,
  }).addTo(map);
<\/script>
</body>
</html>`

  return (
    <div style={{ minHeight: '100vh', background: '#060f06', color: '#e8e4db', fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&family=Noto+Serif+Bengali:wght@500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes sp{to{transform:rotate(360deg)}}
        @keyframes fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes si{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}

        .a1{animation:fu 0.5s ease 0.05s both}
        .a2{animation:fu 0.5s ease 0.15s both}
        .a3{animation:fu 0.5s ease 0.25s both}
        .a4{animation:fu 0.5s ease 0.35s both}

        .glass{background:rgba(255,255,255,0.028);border:1px solid rgba(255,255,255,0.07);border-radius:18px;transition:border-color 0.25s,box-shadow 0.25s}
        .glass:hover{border-color:rgba(134,179,105,0.18);box-shadow:0 8px 32px rgba(0,0,0,0.25)}

        /* Cover */
        .cover{height:320px;background:linear-gradient(155deg,#060f06 0%,#0d1a0d 30%,#152815 55%,#1e3d1e 75%,#0d1a0d 100%);position:relative;overflow:hidden}
        .cover::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 20% 40%,rgba(134,179,105,0.2) 0%,transparent 60%),radial-gradient(ellipse 40% 50% at 85% 15%,rgba(134,179,105,0.1) 0%,transparent 50%),radial-gradient(ellipse 25% 35% at 65% 80%,rgba(134,179,105,0.06) 0%,transparent 50%)}
        .cover::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(-52deg,transparent,transparent 38px,rgba(134,179,105,0.02) 38px,rgba(134,179,105,0.02) 39px)}
        .cover-tag{position:absolute;bottom:18px;right:22px;z-index:10;font-family:'Cormorant Garamond',serif;font-size:10px;color:rgba(134,179,105,0.35);letter-spacing:4px;text-transform:uppercase}

        /* Avatar — now BIGGER, overlapping more */
        /* Avatar — full cover center */
.av{
  position:absolute;inset:0;z-index:5;
  width:100%;height:100%;
  border-radius:0;border:none;
  background:transparent;
  display:flex;align-items:center;justify-content:center;
  overflow:hidden;
  cursor:pointer;transition:opacity 0.2s;
}
.av:hover{opacity:0.92}

        /* Avatar full screen overlay */
        .av-overlay{
          position:fixed;inset:0;z-index:999;
          background:rgba(0,0,0,0.92);
          display:flex;align-items:center;justify-content:center;
          animation:fadeIn 0.2s ease;
          cursor:pointer;
          backdrop-filter:blur(8px);
        }
        .av-overlay img{
          max-width:90vw;max-height:90vh;
          border-radius:16px;
          box-shadow:0 0 0 2px rgba(134,179,105,0.3),0 32px 80px rgba(0,0,0,0.8);
          object-fit:contain;
        }
        .av-close{
          position:absolute;top:20px;right:24px;
          width:40px;height:40px;border-radius:50%;
          background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);
          color:#fff;font-size:18px;display:flex;align-items:center;justify-content:center;
          cursor:pointer;transition:all 0.2s;
        }
        .av-close:hover{background:rgba(220,38,38,0.3);border-color:rgba(220,38,38,0.5)}

        /* Tab */
        .tab-bar{display:flex;gap:3px;overflow-x:auto;scrollbar-width:none}
        .tab-bar::-webkit-scrollbar{display:none}
        .tb{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:3px;padding:9px 16px;border:1.5px solid transparent;border-radius:12px;cursor:pointer;background:transparent;color:rgba(255,255,255,0.25);font-family:'Outfit',sans-serif;font-size:10px;font-weight:600;letter-spacing:0.4px;transition:all 0.18s}
        .tb.on{background:rgba(134,179,105,0.1);border-color:rgba(134,179,105,0.2);color:#86b369}
        .tb:hover:not(.on){background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.5)}
        .tb-i{font-size:17px}

        .bdg{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:0.2px}

        .sl{display:inline-flex;align-items:center;gap:7px;padding:9px 16px;border-radius:10px;text-decoration:none;border:1px solid rgba(255,255,255,0.09);color:rgba(255,255,255,0.5);background:rgba(255,255,255,0.028);font-size:13px;transition:all 0.18s;white-space:nowrap}
        .sl:hover{border-color:rgba(134,179,105,0.45);color:#86b369;background:rgba(134,179,105,0.06);transform:translateY(-1px)}

        .bc{width:70px;height:70px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#dc2626,#7f1d1d);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:#fff;box-shadow:0 8px 24px rgba(220,38,38,0.35);border:2px solid rgba(220,38,38,0.25)}

        .ring{position:relative;width:68px;height:68px;flex-shrink:0}
        .tile{background:rgba(255,255,255,0.03);border-radius:12px;padding:14px 16px;border:1px solid rgba(255,255,255,0.055)}

        .be{display:inline-flex;align-items:center;gap:7px;padding:10px 20px;background:linear-gradient(135deg,#2a4d2a,#1a3a1a);color:#c8e6a8;border:1px solid rgba(134,179,105,0.25);border-radius:11px;font-size:12px;font-weight:600;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.2s}
        .be:hover{background:linear-gradient(135deg,#3a6d3a,#2a4d2a);transform:translateY(-1px);box-shadow:0 6px 18px rgba(134,179,105,0.18)}
        .bd{display:inline-flex;align-items:center;gap:6px;padding:10px 14px;background:rgba(220,38,38,0.07);color:#f87171;border:1px solid rgba(220,38,38,0.18);border-radius:11px;font-size:12px;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.2s}
        .bd:hover{background:rgba(220,38,38,0.14);border-color:rgba(220,38,38,0.35)}

        .empty{text-align:center;padding:60px 28px}
        .empty-ico{width:80px;height:80px;border-radius:50%;background:rgba(134,179,105,0.06);border:2px dashed rgba(134,179,105,0.2);display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 20px}

        @media(max-width:600px){
          .cover{height:260px}
          .av{width:110px;height:110px;bottom:-55px;left:18px;border-width:4px}
          .hero-pad{padding:18px 18px 22px !important}
          .h1-size{font-size:22px !important}
          .mp{padding:16px !important}
        }
      `}</style>

      {/* Avatar full screen */}
      {avatarFull && avatar && (
        <div className="av-overlay" onClick={() => setAvatarFull(false)}>
          <div className="av-close" onClick={() => setAvatarFull(false)}>✕</div>
          <img src={avatar} alt={userName} onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* Sticky Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(6,15,6,0.94)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(134,179,105,0.09)', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.push('/dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: 'rgba(134,179,105,0.65)', fontSize: 13, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>
          ← Dashboard
        </button>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, color: 'rgba(134,179,105,0.4)', fontStyle: 'italic' }}>Alumni Profile</span>
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

      <div className="mp" style={{ maxWidth: 740, margin: '0 auto', padding: '22px 16px 80px' }}>

        {/* Hero */}
        <div className="glass a1" style={{ marginBottom: 14, overflow: 'hidden' }}>
          <div className="cover" style={{ position: 'relative' }}>
            <div className="cover-tag">HPCAA Alumni</div>

            {/* Avatar — clickable for full view */}
            <div className="av" onClick={() => avatar && setAvatarFull(true)}>
              {avatar
                ? <img src={avatar} alt={userName} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                : <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 44, fontWeight: 700, color: '#86b369' }}>{initials}</span>
              }
              {/* Click hint overlay */}
              {avatar && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', borderRadius: '50%' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0)'}>
                  <span style={{ fontSize: 20, opacity: 0, transition: 'opacity 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.parentElement.style.background = 'rgba(0,0,0,0.3)' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = 0 }}>🔍</span>
                </div>
              )}
            </div>
          </div>

          <div className="hero-pad" style={{ padding: '24px 24px 26px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 className="h1-size" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 700, color: '#f0ede6', marginBottom: 4, lineHeight: 1.2 }}>
                  {profile?.fullName || userName}
                </h1>
                {profile?.fullNameBn && (
                  <p style={{ fontFamily: 'Noto Serif Bengali, serif', fontSize: 18, color: 'rgba(134,179,105,0.75)', marginBottom: 10, fontWeight: 600 }}>{profile.fullNameBn}</p>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                  {profile?.memberType && <span className="bdg" style={{ background: 'rgba(234,179,8,0.08)', color: '#fbbf24', border: '1px solid rgba(234,179,8,0.18)' }}>⭐ {profile.memberType === 'life' ? 'Life Member' : profile.memberType === 'honorary' ? 'Honorary' : 'General Member'}</span>}
                  {profile?.committeePosition && <span className="bdg" style={{ background: 'rgba(134,179,105,0.09)', color: '#86b369', border: '1px solid rgba(134,179,105,0.18)' }}>🏛️ {profile.committeePosition}</span>}
                  {profile?.bloodGroup && <span className="bdg" style={{ background: 'rgba(220,38,38,0.09)', color: '#f87171', border: '1px solid rgba(220,38,38,0.18)' }}>🩸 {profile.bloodGroup}</span>}
                  {session?.user?.role && <span className="bdg" style={{ background: 'rgba(99,102,241,0.09)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.18)' }}>🎓 {session.user.role}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>📧 {session?.user?.email}</span>
                  {profile?.district && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>📍 {profile.district}{profile.upazila ? `, ${profile.upazila}` : ''}</span>}
                  {profile?.memberSince && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>📅 Member since {new Date(profile.memberSince).getFullYear()}</span>}
                </div>
                {(profile?.facebook || profile?.portfolioWebsite || profile?.whatsAppNumber) && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                    {profile?.facebook && <a href={profile.facebook} target="_blank" rel="noreferrer" className="sl">📘 Facebook</a>}
                    {profile?.portfolioWebsite && <a href={profile.portfolioWebsite} target="_blank" rel="noreferrer" className="sl">🌐 Portfolio</a>}
                    {profile?.whatsAppNumber && <a href={`https://wa.me/${profile.whatsAppNumber}`} target="_blank" rel="noreferrer" className="sl">💬 WhatsApp</a>}
                  </div>
                )}
              </div>

              {/* Completion Ring */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                <div className="ring">
                  <svg width="68" height="68" viewBox="0 0 68 68" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="34" cy="34" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
                    <circle cx="34" cy="34" r="28" fill="none"
                      stroke={completion >= 80 ? '#86b369' : completion >= 50 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="5" strokeLinecap="round"
                      strokeDasharray={`${completion * 1.759} 175.9`}
                      style={{ transition: 'stroke-dasharray 1.3s ease' }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontWeight: 700, color: '#e8e4db' }}>{completion}%</span>
                  </div>
                </div>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Complete</span>
              </div>
            </div>

            {profile?.shortBio && (
              <div style={{ marginTop: 18, padding: '13px 16px', background: 'rgba(134,179,105,0.05)', borderRadius: 11, borderLeft: '3px solid rgba(134,179,105,0.35)' }}>
                <p style={{ fontSize: 13, color: 'rgba(232,228,219,0.75)', lineHeight: 1.85, fontStyle: 'italic', fontFamily: 'Cormorant Garamond, serif' }}>
                  &ldquo;{profile.shortBio}&rdquo;
                </p>
              </div>
            )}

            {/* Tap hint */}
            {avatar && (
              <div style={{ marginTop: 10, fontSize: 10, color: 'rgba(134,179,105,0.3)', letterSpacing: 0.5 }}>
                💡 Profile photo তে click করলে full size দেখাবে
              </div>
            )}
          </div>
        </div>

        {/* No Profile */}
        {!profile && (
          <div className="glass a2">
            <div className="empty">
              <div className="empty-ico">👤</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: '#e8e4db', marginBottom: 10 }}>Profile তৈরি হয়নি</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', marginBottom: 28, maxWidth: 340, margin: '0 auto 28px', lineHeight: 1.8 }}>
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
            <div className="glass a2" style={{ padding: '6px', marginBottom: 12 }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'si 0.3s ease both' }}>
                <div className="glass a3" style={{ padding: '20px 20px' }}>
                  <SH icon="👤" title="Basic Information" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                    <Row label="পূর্ণ নাম" value={profile.fullName} />
                    <Row label="বাংলা নাম" value={profile.fullNameBn} bn />
                    <Row label="লিঙ্গ" value={profile.gender === 'male' ? '♂ পুরুষ' : profile.gender === 'female' ? '♀ মহিলা' : profile.gender} />
                    <Row label="জন্ম তারিখ" value={profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('bn-BD') : null} />
                    <Row label="Member Type" value={profile.memberType} />
                    <Row label="Position" value={profile.committeePosition} />
                  </div>
                </div>

                <div className="glass a4" style={{ padding: '20px 20px' }}>
                  <SH icon="📞" title="Contact" />
                  <Row label="বর্তমান ঠিকানা" value={profile.presentAddress} />
                  <Row label="স্থায়ী ঠিকানা" value={profile.permanentAddress} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                    <Row label="জেলা" value={profile.district} />
                    <Row label="উপজেলা" value={profile.upazila} />
                    <Row label="Alt. Mobile" value={profile.alternativeMobile} />
                    <Row label="WhatsApp" value={profile.whatsAppNumber} />
                  </div>

                  {/* Location Map */}
                  {profile.latitude && profile.longitude && (
                    <div style={{ marginTop: 18 }}>
                      {/* Coords bar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, padding: '10px 14px', background: 'rgba(134,179,105,0.06)', borderRadius: 12, border: '1px solid rgba(134,179,105,0.14)' }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(134,179,105,0.2),rgba(134,179,105,0.08))', border: '1px solid rgba(134,179,105,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>📍</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, color: '#86b369', fontWeight: 600, marginBottom: 2 }}>Location</div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
                            {Number(profile.latitude).toFixed(6)}, {Number(profile.longitude).toFixed(6)}
                          </div>
                          {profile.locationDms && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)' }}>{profile.locationDms}</div>}
                        </div>
                        <a href={`https://www.google.com/maps?q=${profile.latitude},${profile.longitude}`}
                          target="_blank" rel="noreferrer" className="sl"
                          style={{ flexShrink: 0, fontSize: 11, padding: '6px 12px' }}>
                          🗺️ Maps
                        </a>
                      </div>

                      {/* Colorful Leaflet Map */}
                      <div style={{ borderRadius: 14, overflow: 'hidden', border: '1.5px solid rgba(134,179,105,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                        <iframe
                          srcDoc={mapHtml(profile.latitude, profile.longitude)}
                          width="100%"
                          height="260"
                          style={{ display: 'block', border: 'none' }}
                          title="Profile Location Map"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: EDUCATION */}
            {tab === 'edu' && (
              <div className="glass a3" style={{ padding: '20px 20px', animation: 'si 0.3s ease both' }}>
                <SH icon="🏫" title="School" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                  <Row label="স্কুল" value={profile.schoolName} />
                  <Row label="Group" value={profile.schoolGroup} />
                  <Row label="Passing Year" value={profile.schoolPassingYear} />
                </div>
                <SH icon="🏛️" title="College" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                  <Row label="কলেজ" value={profile.collegeName} />
                  <Row label="বিভাগ" value={profile.collegeGroup === 'science' ? 'বিজ্ঞান' : profile.collegeGroup === 'arts' ? 'মানবিক' : profile.collegeGroup === 'commerce' ? 'বাণিজ্য' : profile.collegeGroup} />
                  <Row label="Passing Year" value={profile.collegePassingYear} />
                </div>
                <SH icon="🎓" title="University" />
                <Row label="University" value={profile.universityName} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                  <Row label="Department" value={profile.department} />
                  <Row label="Student ID" value={profile.studentId} />
                  <Row label="Year" value={profile.currentYear ? `${profile.currentYear}ম বর্ষ` : null} />
                  <Row label="Semester" value={profile.currentSemester ? `${profile.currentSemester}ম সেমিস্টার` : null} />
                </div>
              </div>
            )}

            {/* TAB: BLOOD */}
            {tab === 'blood' && (
              <div className="glass a3" style={{ padding: '20px 20px', animation: 'si 0.3s ease both' }}>
                <SH icon="🩸" title="Blood Information" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '18px', background: 'linear-gradient(135deg,rgba(220,38,38,0.07),rgba(127,29,29,0.04))', borderRadius: 14, border: '1px solid rgba(220,38,38,0.14)', marginBottom: 18 }}>
                  {profile.bloodGroup
                    ? <div className="bc">{profile.bloodGroup}</div>
                    : <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(220,38,38,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, border: '2px dashed rgba(220,38,38,0.18)', flexShrink: 0 }}>🩸</div>
                  }
                  <div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 700, color: '#f0ede6', marginBottom: 3 }}>{profile.bloodGroup || 'জানা নেই'}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1.2 }}>Blood Group</div>
                    {profile.donationEligibility && (
                      <span className="bdg" style={{
                        background: profile.donationEligibility === 'eligible' ? 'rgba(134,179,105,0.09)' : 'rgba(220,38,38,0.09)',
                        color: profile.donationEligibility === 'eligible' ? '#86b369' : '#f87171',
                        border: `1px solid ${profile.donationEligibility === 'eligible' ? 'rgba(134,179,105,0.2)' : 'rgba(220,38,38,0.2)'}`,
                      }}>
                        {profile.donationEligibility === 'eligible' ? '✅ Eligible to Donate' : '⏸ Not Eligible'}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 4 }}>
                  <div className="tile">
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>Total Donations</div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 700, color: '#f87171', lineHeight: 1 }}>
                      {profile.totalDonationCount || 0}<span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: 'Outfit, sans-serif', marginLeft: 4 }}>বার</span>
                    </div>
                  </div>
                  <div className="tile">
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>Preferred Location</div>
                    <div style={{ fontSize: 14, color: profile.preferredDonationLocation ? '#dedad3' : 'rgba(255,255,255,0.15)', fontStyle: profile.preferredDonationLocation ? 'normal' : 'italic' }}>
                      {profile.preferredDonationLocation || 'দেওয়া হয়নি'}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                  <Row label="Last Donation" value={profile.lastDonationDate ? new Date(profile.lastDonationDate).toLocaleDateString('bn-BD') : null} />
                  <Row label="Next Available" value={profile.nextAvailableDonationDate ? new Date(profile.nextAvailableDonationDate).toLocaleDateString('bn-BD') : null} />
                </div>
              </div>
            )}

            {/* TAB: BIO */}
            {tab === 'bio' && (
              <div className="glass a3" style={{ padding: '20px 20px', animation: 'si 0.3s ease both' }}>
                <SH icon="✍️" title="Personal Bio" />
                {[
                  { l: 'Short Bio', v: profile.shortBio, italic: true },
                  { l: 'কেন join করলে', v: profile.whyJoined },
                  { l: 'Future Goals', v: profile.futureGoals },
                  { l: 'Hobbies', v: profile.hobbies },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '13px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(134,179,105,0.45)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 5 }}>{item.l}</div>
                    {item.v
                      ? <p style={{ fontSize: 14, color: 'rgba(232,228,219,0.8)', lineHeight: 1.9, fontStyle: item.italic ? 'italic' : 'normal', fontFamily: item.italic ? 'Cormorant Garamond, serif' : 'Outfit, sans-serif' }}>{item.v}</p>
                      : <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.15)', fontStyle: 'italic' }}>দেওয়া হয়নি</span>
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