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
    <div style={{ minHeight: '100vh', background: '#faf8f4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <div style={{ position: 'relative', width: 56, height: 56 }}>
        <div style={{ position: 'absolute', inset: 0, border: '2px solid #e8e0d0', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', inset: 0, border: '2px solid transparent', borderTopColor: '#8b6914', borderRadius: '50%', animation: 'sp 0.9s linear infinite' }} />
      </div>
      <p style={{ color: '#8b6914', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>Loading</p>
      <style>{`@keyframes sp{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  const userName = session?.user?.name || 'Alumni'
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const avatar = profile?.profileImagePath || session?.user?.image || null
  const cFields = [profile?.fullName, profile?.dateOfBirth, profile?.gender, profile?.bloodGroup, profile?.presentAddress, profile?.district, profile?.collegeName, profile?.collegePassingYear, profile?.universityName, profile?.shortBio, profile?.facebook, profile?.profileImagePath]
  const completion = Math.round((cFields.filter(Boolean).length / cFields.length) * 100)

  const TABS = [
    { id: 'info', label: 'Personal', icon: '◈' },
    { id: 'edu', label: 'Education', icon: '◉' },
    { id: 'blood', label: 'Blood', icon: '◆' },
    { id: 'bio', label: 'Story', icon: '◇' },
  ]

  const Field = ({ label, value, mono, bn }) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: '#b8a882', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 5, fontFamily: 'Georgia, serif' }}>{label}</div>
      {value
        ? <div style={{ fontSize: 14, color: '#2c2416', lineHeight: 1.6, fontFamily: bn ? 'Noto Serif Bengali, serif' : mono ? 'monospace' : 'Georgia, serif', fontWeight: 400 }}>{value}</div>
        : <div style={{ fontSize: 12, color: '#d4c9b0', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>—</div>
      }
    </div>
  )

  const Sec = ({ num, title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22, marginTop: 28, paddingBottom: 14, borderBottom: '1px solid #e8e0d0' }}>
      <span style={{ fontFamily: 'Georgia, serif', fontSize: 11, color: '#b8a882', letterSpacing: 1 }}>{num}</span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, #e8e0d0, transparent)' }} />
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: '#2c2416', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>{title}</span>
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
.pw{position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center}
.p1{position:absolute;width:36px;height:36px;border-radius:50%;background:rgba(139,105,20,0.2);animation:pu 2s ease-out infinite}
.p2{position:absolute;width:22px;height:22px;border-radius:50%;background:rgba(139,105,20,0.3);animation:pu 2s ease-out 0.5s infinite}
.pd{width:14px;height:14px;border-radius:50%;background:linear-gradient(135deg,#8b6914,#c4901e);border:3px solid #fff;box-shadow:0 2px 12px rgba(139,105,20,0.6);z-index:2;position:relative}
@keyframes pu{0%{transform:scale(0.4);opacity:0.9}100%{transform:scale(2.5);opacity:0}}
.leaflet-popup-content-wrapper{background:#faf8f4;border:1px solid #e8e0d0;border-radius:10px;color:#2c2416;box-shadow:0 8px 24px rgba(0,0,0,0.12)}
.leaflet-popup-tip{background:#faf8f4}
.leaflet-popup-content{font-size:12px;line-height:1.7;color:#5c4a2a;margin:10px 14px;font-family:Georgia,serif}
.leaflet-control-zoom a{background:#fff!important;color:#8b6914!important;border-color:#e8e0d0!important;font-size:16px!important}
.leaflet-control-attribution{display:none}
</style>
</head>
<body>
<div id="map"></div>
<script>
const lat=${lat},lng=${lng};
const map=L.map('map',{zoomControl:true,dragging:true,scrollWheelZoom:false,attributionControl:false}).setView([lat,lng],15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
const icon=L.divIcon({className:'',html:'<div class="pw"><div class="p1"></div><div class="p2"></div><div class="pd"></div></div>',iconSize:[36,36],iconAnchor:[18,18],popupAnchor:[0,-20]});
L.marker([lat,lng],{icon}).addTo(map).bindPopup('<b style="color:#8b6914">📍 Location</b><br>'+lat.toFixed(6)+', '+lng.toFixed(6)).openPopup();
L.circle([lat,lng],{color:'rgba(139,105,20,0.3)',fillColor:'rgba(139,105,20,0.06)',fillOpacity:1,weight:1.5,radius:100}).addTo(map);
<\/script>
</body></html>`

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f4', fontFamily: 'Georgia, serif', color: '#2c2416' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Lato:wght@300;400;700&family=Noto+Serif+Bengali:wght@500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes sp{to{transform:rotate(360deg)}}
        @keyframes fu{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes si{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fi{from{opacity:0}to{opacity:1}}
        @keyframes sc{from{transform:scaleX(0)}to{transform:scaleX(1)}}

        .a1{animation:fu 0.6s ease 0.05s both}
        .a2{animation:fu 0.6s ease 0.2s both}
        .a3{animation:fu 0.6s ease 0.35s both}
        .a4{animation:fu 0.6s ease 0.5s both}

        /* Nav */
        .nav{
          position:sticky;top:0;z-index:100;
          background:rgba(250,248,244,0.96);
          backdrop-filter:blur(16px);
          border-bottom:1px solid #e8e0d0;
          padding:14px 28px;
          display:flex;align-items:center;justify-content:space-between;
        }

        /* Hero section */
        .hero-wrap{
          position:relative;
          background:#1a1208;
          overflow:hidden;
        }
        .hero-img{
          width:100%;height:480px;
          object-fit:cover;object-position:top center;
          display:block;
          opacity:0.85;
          transition:opacity 0.3s;
          cursor:pointer;
        }
        .hero-img:hover{opacity:1}
        .hero-initials{
          width:100%;height:480px;
          display:flex;align-items:center;justify-content:center;
          background:linear-gradient(160deg,#1a1208,#2c1e0a,#3d2a0e);
          font-family:'Playfair Display',serif;
          font-size:120px;font-weight:900;
          color:rgba(139,105,20,0.3);
          letter-spacing:-4px;
        }
        .hero-overlay{
          position:absolute;inset:0;
          background:linear-gradient(to bottom,transparent 30%,rgba(250,248,244,1) 100%);
          pointer-events:none;
        }
        .hero-text{
          position:absolute;bottom:0;left:0;right:0;
          padding:40px 36px 32px;
        }
        .hero-badge{
          display:inline-flex;align-items:center;gap:6px;
          padding:4px 14px;
          background:rgba(139,105,20,0.12);
          border:1px solid rgba(139,105,20,0.25);
          border-radius:20px;
          font-size:10px;font-weight:700;color:#8b6914;
          letter-spacing:2px;text-transform:uppercase;
          font-family:'Lato',sans-serif;
          margin-bottom:12px;
        }

        /* Lightbox */
        .lb{position:fixed;inset:0;z-index:999;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;animation:fi 0.2s ease;cursor:pointer;backdrop-filter:blur(12px)}
        .lb img{max-width:92vw;max-height:92vh;object-fit:contain;border-radius:4px;box-shadow:0 0 80px rgba(0,0,0,0.8)}
        .lb-close{position:absolute;top:24px;right:28px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;font-size:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;font-family:sans-serif}
        .lb-close:hover{background:rgba(220,38,38,0.3)}
        .lb-hint{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);font-size:11px;color:rgba(255,255,255,0.3);font-family:Georgia,serif;letter-spacing:1px}

        /* Tabs */
        .tabs{display:flex;gap:0;border-bottom:2px solid #e8e0d0;margin-bottom:28px}
        .tb{
          flex:1;padding:14px 8px;border:none;background:transparent;
          font-family:"Playfair Display",serif;font-size:13px;font-weight:400;
          color:#b8a882;cursor:pointer;position:relative;
          transition:all 0.2s;letter-spacing:0.3px;
        }
        .tb::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:#8b6914;transform:scaleX(0);transition:transform 0.25s ease;transform-origin:left}
        .tb.on{color:#2c2416;font-weight:700}
        .tb.on::after{transform:scaleX(1)}
        .tb:hover:not(.on){color:#5c4a2a}

        /* Stat card */
        .stat{
          background:#fff;border:1px solid #e8e0d0;border-radius:12px;
          padding:20px;text-align:center;
          box-shadow:0 2px 12px rgba(44,36,22,0.04);
          transition:all 0.2s;
        }
        .stat:hover{border-color:#c4901e;box-shadow:0 4px 20px rgba(139,105,20,0.1);transform:translateY(-2px)}

        /* Badge */
        .bdg{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:20px;font-size:11px;font-weight:700;font-family:'Lato',sans-serif;letter-spacing:0.3px}

        /* Social */
        .sl{display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:8px;text-decoration:none;border:1px solid #e8e0d0;color:#5c4a2a;background:#fff;font-size:13px;font-family:'Lato',sans-serif;transition:all 0.2s;white-space:nowrap}
        .sl:hover{border-color:#8b6914;color:#8b6914;background:#fef9ed;transform:translateY(-1px)}

        /* Action btns */
        .be{display:inline-flex;align-items:center;gap:7px;padding:10px 22px;background:#2c2416;color:#f5edd8;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Lato',sans-serif;letter-spacing:0.5px;transition:all 0.2s}
        .be:hover{background:#1a1208;transform:translateY(-1px);box-shadow:0 4px 14px rgba(44,36,22,0.3)}
        .bd{display:inline-flex;align-items:center;gap:6px;padding:10px 16px;background:transparent;color:#dc2626;border:1px solid rgba(220,38,38,0.25);border-radius:8px;font-size:12px;cursor:pointer;font-family:'Lato',sans-serif;transition:all 0.2s}
        .bd:hover{background:rgba(220,38,38,0.06);border-color:#dc2626}

        /* Divider */
        .div{height:1px;background:linear-gradient(to right,#e8e0d0,rgba(232,224,208,0));margin:20px 0}

        /* Card */
        .card{background:#fff;border:1px solid #e8e0d0;border-radius:16px;padding:28px;box-shadow:0 2px 16px rgba(44,36,22,0.04);margin-bottom:16px;transition:all 0.2s}
        .card:hover{box-shadow:0 6px 28px rgba(44,36,22,0.08)}

        /* Blood circle */
        .bc{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#dc2626,#991b1b);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:20px;font-weight:900;color:#fff;box-shadow:0 8px 24px rgba(220,38,38,0.3);flex-shrink:0}

        /* Progress bar */
        .pb-bg{height:4px;background:#e8e0d0;border-radius:2px;overflow:hidden;margin-top:8px}
        .pb-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,#8b6914,#c4901e);transition:width 1.2s ease}

        /* Empty */
        .empty-wrap{text-align:center;padding:80px 32px}

        @media(max-width:600px){
          .hero-img,.hero-initials{height:340px}
          .hero-text{padding:28px 20px 24px}
          .h1{font-size:26px !important}
          .mp{padding:16px !important}
          .tabs .tb{font-size:11px;padding:12px 4px}
          .nav{padding:12px 16px}
        }
      `}</style>

      {/* Lightbox */}
      {avatarFull && avatar && (
        <div className="lb" onClick={() => setAvatarFull(false)}>
          <div className="lb-close" onClick={() => setAvatarFull(false)}>✕</div>
          <img src={avatar} alt={userName} onClick={e => e.stopPropagation()} />
          <div className="lb-hint">Click anywhere to close</div>
        </div>
      )}

      {/* Nav */}
      <nav className="nav">
        <button onClick={() => router.push('/dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: '#8b6914', fontSize: 13, cursor: 'pointer', fontFamily: 'Lato, sans-serif', fontWeight: 700, letterSpacing: 0.5 }}>
          ← Dashboard
        </button>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: '#b8a882', fontStyle: 'italic', letterSpacing: 0.5 }}>
          Alumni Profile
        </span>
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
      <div className="hero-wrap a1">
        {avatar
          ? <img src={avatar} alt={userName} className="hero-img" onClick={() => setAvatarFull(true)} />
          : <div className="hero-initials">{initials}</div>
        }
        <div className="hero-overlay" />
        <div className="hero-text">
          <div className="hero-badge">✦ HPCAA Alumni Member</div>
          <h1 className="h1" style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 900, color: '#2c2416', marginBottom: 6, lineHeight: 1.15, letterSpacing: -0.5 }}>
            {profile?.fullName || userName}
          </h1>
          {profile?.fullNameBn && (
            <p style={{ fontFamily: 'Noto Serif Bengali, serif', fontSize: 20, color: '#8b6914', marginBottom: 14, fontWeight: 600 }}>{profile.fullNameBn}</p>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {profile?.memberType && <span className="bdg" style={{ background: 'rgba(139,105,20,0.1)', color: '#8b6914', border: '1px solid rgba(139,105,20,0.2)' }}>⭐ {profile.memberType === 'life' ? 'Life Member' : profile.memberType === 'honorary' ? 'Honorary' : 'General'}</span>}
            {profile?.committeePosition && <span className="bdg" style={{ background: '#fff', color: '#2c2416', border: '1px solid #e8e0d0' }}>🏛️ {profile.committeePosition}</span>}
            {profile?.bloodGroup && <span className="bdg" style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.15)' }}>🩸 {profile.bloodGroup}</span>}
            {session?.user?.role && <span className="bdg" style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.15)' }}>🎓 {session.user.role}</span>}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 12, color: '#5c4a2a', fontFamily: 'Lato, sans-serif' }}>
            <span>✉ {session?.user?.email}</span>
            {profile?.district && <span>◈ {profile.district}{profile.upazila ? `, ${profile.upazila}` : ''}</span>}
            {profile?.memberSince && <span>◇ Since {new Date(profile.memberSince).getFullYear()}</span>}
          </div>
          {avatar && (
            <div style={{ marginTop: 12, fontSize: 10, color: '#b8a882', fontFamily: 'Lato, sans-serif', letterSpacing: 0.5, cursor: 'pointer' }} onClick={() => setAvatarFull(true)}>
              ◎ Click photo to view full size
            </div>
          )}
        </div>
      </div>

      <div className="mp" style={{ maxWidth: 760, margin: '0 auto', padding: '28px 20px 80px' }}>

        {/* Completion + Social row */}
        {profile && (
          <div className="a2" style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap', alignItems: 'stretch' }}>

            {/* Completion card */}
            <div className="card" style={{ flex: '0 0 auto', minWidth: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px 24px' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 900, color: completion >= 80 ? '#8b6914' : completion >= 50 ? '#d97706' : '#dc2626', lineHeight: 1 }}>
                {completion}<span style={{ fontSize: 18 }}>%</span>
              </div>
              <div style={{ fontSize: 9, color: '#b8a882', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4, fontFamily: 'Lato, sans-serif' }}>Profile Complete</div>
              <div className="pb-bg" style={{ width: '100%', marginTop: 10 }}>
                <div className="pb-fill" style={{ width: `${completion}%` }} />
              </div>
            </div>

            {/* Bio + Social */}
            <div className="card" style={{ flex: 1, minWidth: 200 }}>
              {profile?.shortBio && (
                <p style={{ fontSize: 14, color: '#5c4a2a', lineHeight: 1.9, fontStyle: 'italic', fontFamily: "'Playfair Display', serif", marginBottom: 16, borderLeft: '3px solid #c4901e', paddingLeft: 14 }}>
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
              {!profile?.shortBio && !profile?.facebook && !profile?.portfolioWebsite && !profile?.whatsAppNumber && (
                <p style={{ fontSize: 13, color: '#d4c9b0', fontStyle: 'italic' }}>No bio or social links added yet.</p>
              )}
            </div>
          </div>
        )}

        {/* No Profile */}
        {!profile && (
          <div className="card a2">
            <div className="empty-wrap">
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#fef9ed', border: '2px dashed #c4901e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 20px' }}>👤</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: '#2c2416', marginBottom: 10 }}>Profile তৈরি হয়নি</h2>
              <p style={{ fontSize: 14, color: '#b8a882', marginBottom: 28, maxWidth: 340, margin: '0 auto 28px', lineHeight: 1.8, fontFamily: 'Lato, sans-serif' }}>
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
            {/* Tabs */}
            <div className="tabs a3">
              {TABS.map(t => (
                <button key={t.id} className={`tb${tab === t.id ? ' on' : ''}`} onClick={() => setTab(t.id)}>
                  <span style={{ marginRight: 5, fontSize: 10 }}>{t.icon}</span>{t.label}
                </button>
              ))}
            </div>

            {/* TAB: INFO */}
            {tab === 'info' && (
              <div style={{ animation: 'si 0.3s ease both' }}>

                {/* Basic */}
                <div className="card a3">
                  <Sec num="01" title="Basic Information" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                    <Field label="Full Name" value={profile.fullName} />
                    <Field label="বাংলা নাম" value={profile.fullNameBn} bn />
                    <Field label="Gender" value={profile.gender === 'male' ? 'Male ♂' : profile.gender === 'female' ? 'Female ♀' : profile.gender} />
                    <Field label="Date of Birth" value={profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null} />
                    <Field label="Member Type" value={profile.memberType} />
                    <Field label="Position" value={profile.committeePosition} />
                  </div>
                </div>

                {/* Contact */}
                <div className="card a4">
                  <Sec num="02" title="Contact & Address" />
                  <Field label="Present Address" value={profile.presentAddress} />
                  <Field label="Permanent Address" value={profile.permanentAddress} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                    <Field label="জেলা" value={profile.district} />
                    <Field label="উপজেলা" value={profile.upazila} />
                    <Field label="Alternative Mobile" value={profile.alternativeMobile} />
                    <Field label="WhatsApp" value={profile.whatsAppNumber} />
                  </div>

                  {/* Map */}
                  {profile.latitude && profile.longitude && (
                    <div style={{ marginTop: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, padding: '10px 16px', background: '#fef9ed', borderRadius: 10, border: '1px solid rgba(139,105,20,0.15)' }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(139,105,20,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>📍</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 11, color: '#8b6914', fontWeight: 700, marginBottom: 2, fontFamily: 'Lato, sans-serif', letterSpacing: 0.5 }}>GPS LOCATION</div>
                          <div style={{ fontSize: 11, color: '#5c4a2a', fontFamily: 'monospace' }}>{Number(profile.latitude).toFixed(6)}, {Number(profile.longitude).toFixed(6)}</div>
                          {profile.locationDms && <div style={{ fontSize: 10, color: '#b8a882', fontFamily: 'Lato, sans-serif' }}>{profile.locationDms}</div>}
                        </div>
                        <a href={`https://www.google.com/maps?q=${profile.latitude},${profile.longitude}`} target="_blank" rel="noreferrer" className="sl" style={{ fontSize: 11, padding: '6px 12px', flexShrink: 0 }}>
                          Open Maps
                        </a>
                      </div>
                      <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e8e0d0', boxShadow: '0 4px 20px rgba(44,36,22,0.08)' }}>
                        <iframe srcDoc={mapHtml(profile.latitude, profile.longitude)} width="100%" height="260" style={{ display: 'block', border: 'none' }} title="Location" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: EDUCATION */}
            {tab === 'edu' && (
              <div className="card a3" style={{ animation: 'si 0.3s ease both' }}>
                <Sec num="01" title="School" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                  <Field label="School Name" value={profile.schoolName} />
                  <Field label="Group" value={profile.schoolGroup} />
                  <Field label="Passing Year" value={profile.schoolPassingYear} />
                </div>

                <Sec num="02" title="College" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                  <Field label="College Name" value={profile.collegeName} />
                  <Field label="Department" value={profile.collegeGroup === 'science' ? 'Science' : profile.collegeGroup === 'arts' ? 'Arts' : profile.collegeGroup === 'commerce' ? 'Commerce' : profile.collegeGroup} />
                  <Field label="Passing Year" value={profile.collegePassingYear} />
                </div>

                <Sec num="03" title="University" />
                <Field label="University Name" value={profile.universityName} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                  <Field label="Department" value={profile.department} />
                  <Field label="Student ID" value={profile.studentId} mono />
                  <Field label="Current Year" value={profile.currentYear ? `${profile.currentYear}th Year` : null} />
                  <Field label="Semester" value={profile.currentSemester ? `${profile.currentSemester}th Semester` : null} />
                </div>
              </div>
            )}

            {/* TAB: BLOOD */}
            {tab === 'blood' && (
              <div style={{ animation: 'si 0.3s ease both' }}>
                {/* Blood hero */}
                <div className="card a3" style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '20px', background: 'linear-gradient(135deg,#fff5f5,#fff)', borderRadius: 12, border: '1px solid rgba(220,38,38,0.1)', marginBottom: 24 }}>
                    {profile.bloodGroup
                      ? <div className="bc">{profile.bloodGroup}</div>
                      : <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, border: '2px dashed rgba(220,38,38,0.2)', flexShrink: 0 }}>🩸</div>
                    }
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: '#2c2416', marginBottom: 4 }}>{profile.bloodGroup || 'Unknown'}</div>
                      <div style={{ fontSize: 10, color: '#b8a882', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1.5, fontFamily: 'Lato, sans-serif' }}>Blood Group</div>
                      {profile.donationEligibility && (
                        <span className="bdg" style={{
                          background: profile.donationEligibility === 'eligible' ? 'rgba(22,163,74,0.08)' : 'rgba(220,38,38,0.08)',
                          color: profile.donationEligibility === 'eligible' ? '#16a34a' : '#dc2626',
                          border: `1px solid ${profile.donationEligibility === 'eligible' ? 'rgba(22,163,74,0.2)' : 'rgba(220,38,38,0.15)'}`,
                        }}>
                          {profile.donationEligibility === 'eligible' ? '✅ Eligible to Donate' : '⏸ Not Eligible'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                    <div className="stat">
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 900, color: '#dc2626', lineHeight: 1 }}>{profile.totalDonationCount || 0}</div>
                      <div style={{ fontSize: 10, color: '#b8a882', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1.5, fontFamily: 'Lato, sans-serif' }}>Total Donations</div>
                    </div>
                    <div className="stat">
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#5c4a2a', lineHeight: 1.3 }}>{profile.preferredDonationLocation || '—'}</div>
                      <div style={{ fontSize: 10, color: '#b8a882', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1.5, fontFamily: 'Lato, sans-serif' }}>Preferred Location</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                    <Field label="Last Donation" value={profile.lastDonationDate ? new Date(profile.lastDonationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null} />
                    <Field label="Next Available" value={profile.nextAvailableDonationDate ? new Date(profile.nextAvailableDonationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null} />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: BIO */}
            {tab === 'bio' && (
              <div className="card a3" style={{ animation: 'si 0.3s ease both' }}>
                {[
                  { num: '01', title: 'About Me', v: profile.shortBio, large: true },
                  { num: '02', title: 'Why I Joined HPCAA', v: profile.whyJoined },
                  { num: '03', title: 'Future Goals', v: profile.futureGoals },
                  { num: '04', title: 'Hobbies & Interests', v: profile.hobbies },
                ].map((item, i) => (
                  <div key={i}>
                    <Sec num={item.num} title={item.title} />
                    {item.v
                      ? <p style={{ fontSize: item.large ? 16 : 14, color: '#3c2e1a', lineHeight: 1.95, fontFamily: item.large ? "'Playfair Display', serif" : 'Lato, sans-serif', fontStyle: item.large ? 'italic' : 'normal', marginBottom: 8 }}>{item.v}</p>
                      : <p style={{ fontSize: 13, color: '#d4c9b0', fontStyle: 'italic', fontFamily: 'Lato, sans-serif' }}>Not provided</p>
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