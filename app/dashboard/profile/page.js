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
    <div style={{
      minHeight: '100vh',
      background: '#f8f7f4',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&family=Noto+Serif+Bengali:wght@500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
      <div style={{
        width: 40, height: 40,
        border: '2px solid #e8e3d9',
        borderTopColor: '#2c2416',
        borderRadius: '50%',
        animation: 'spin 0.9s linear infinite'
      }} />
      <p style={{ color: '#9a8f7e', fontSize: 13, letterSpacing: 1, fontFamily: "'DM Sans', sans-serif" }}>Loading…</p>
    </div>
  )

  const userName = session?.user?.name || 'Alumni'
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const avatar = profile?.profileImagePath || session?.user?.image || null
  const cFields = [profile?.fullName, profile?.dateOfBirth, profile?.gender, profile?.bloodGroup, profile?.presentAddress, profile?.district, profile?.collegeName, profile?.collegePassingYear, profile?.universityName, profile?.shortBio, profile?.facebook, profile?.profileImagePath]
  const completion = Math.round((cFields.filter(Boolean).length / cFields.length) * 100)

  const TABS = [
    { id: 'info', label: 'Personal Info', icon: '◈' },
    { id: 'edu', label: 'Education', icon: '◉' },
    { id: 'blood', label: 'Blood', icon: '◆' },
    { id: 'bio', label: 'Bio & Goals', icon: '◇' },
  ]

  const mapHtml = (lat, lng) => `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"><\/script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body,#map{width:100%;height:100%}
.pw{position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center}
.p1{position:absolute;width:36px;height:36px;border-radius:50%;background:rgba(44,36,22,0.12);animation:pu 2s ease-out infinite}
.pd{width:12px;height:12px;border-radius:50%;background:#2c2416;border:3px solid #fff;box-shadow:0 0 12px rgba(44,36,22,0.4);z-index:2;position:relative}
@keyframes pu{0%{transform:scale(0.4);opacity:1}100%{transform:scale(2.8);opacity:0}}
.leaflet-popup-content-wrapper{background:#fff;border:1px solid #e8e3d9;border-radius:10px;color:#2c2416;box-shadow:0 8px 24px rgba(0,0,0,0.1)}
.leaflet-popup-tip{background:#fff}
.leaflet-popup-content{font-size:12px;line-height:1.7;color:#5a5040;margin:10px 14px;font-family:system-ui}
.leaflet-control-attribution{display:none}
</style>
</head>
<body>
<div id="map"></div>
<script>
const lat=${lat},lng=${lng};
const map=L.map('map',{zoomControl:true,dragging:true,scrollWheelZoom:false,attributionControl:false}).setView([lat,lng],15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
const icon=L.divIcon({className:'',html:'<div class="pw"><div class="p1"></div><div class="pd"></div></div>',iconSize:[36,36],iconAnchor:[18,18],popupAnchor:[0,-20]});
L.marker([lat,lng],{icon}).addTo(map).bindPopup('<div style="font-weight:700;color:#2c2416;margin-bottom:4px;font-size:13px">Location</div><div style="color:#7a6e5f">'+lat.toFixed(6)+', '+lng.toFixed(6)+'</div>').openPopup();
<\/script>
</body></html>`

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7f4', fontFamily: "'DM Sans', sans-serif", color: '#2c2416' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@600;700&family=Noto+Serif+Bengali:wght@500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}

        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideIn{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:translateX(0)}}

        .a1{animation:fadeUp 0.5s ease 0.05s both}
        .a2{animation:fadeUp 0.5s ease 0.15s both}
        .a3{animation:fadeUp 0.5s ease 0.25s both}
        .a4{animation:fadeUp 0.5s ease 0.35s both}
        .slide-in{animation:slideIn 0.3s ease both}

        /* NAV */
        .top-nav{
          position:sticky;top:0;z-index:100;
          background:rgba(248,247,244,0.95);
          backdrop-filter:blur(16px);
          border-bottom:1px solid #e8e3d9;
          padding:0 32px;
          height:60px;
          display:flex;align-items:center;justify-content:space-between;
        }

        /* HERO */
        .hero{
          background:#2c2416;
          position:relative;
          overflow:hidden;
        }
        .hero-bg-pattern{
          position:absolute;inset:0;
          background-image:radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%);
        }
        .hero-content{
          position:relative;z-index:2;
          max-width:820px;
          margin:0 auto;
          padding:48px 32px 40px;
          display:flex;
          gap:32px;
          align-items:flex-end;
        }

        /* AVATAR */
        .avatar-wrap{
          flex-shrink:0;position:relative;
        }
        .avatar-img{
          width:110px;height:110px;
          border-radius:16px;
          object-fit:cover;
          border:3px solid rgba(255,255,255,0.15);
          cursor:pointer;
          display:block;
          transition:transform 0.3s;
        }
        .avatar-img:hover{transform:scale(1.03)}
        .avatar-initials{
          width:110px;height:110px;
          border-radius:16px;
          background:rgba(255,255,255,0.08);
          border:3px solid rgba(255,255,255,0.12);
          display:flex;align-items:center;justify-content:center;
          font-family:'Playfair Display',serif;
          font-size:38px;
          color:rgba(255,255,255,0.5);
          letter-spacing:-2px;
        }
        .status-dot{
          position:absolute;bottom:-4px;right:-4px;
          width:20px;height:20px;border-radius:50%;
          background:#2c2416;
          border:3px solid #2c2416;
          display:flex;align-items:center;justify-content:center;
        }

        /* HERO META */
        .hero-meta{flex:1;padding-bottom:4px}
        .hero-label{
          font-size:10px;font-weight:600;letter-spacing:2.5px;
          color:rgba(255,255,255,0.35);text-transform:uppercase;
          margin-bottom:10px;
        }
        .hero-name{
          font-family:'Playfair Display',serif;
          font-size:32px;font-weight:700;
          color:#fff;line-height:1.15;
          margin-bottom:5px;
        }
        .hero-name-bn{
          font-family:'Noto Serif Bengali',serif;
          font-size:18px;color:rgba(255,255,255,0.45);
          font-weight:500;margin-bottom:14px;
        }
        .hero-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
        .hero-tag{
          padding:4px 12px;border-radius:4px;
          font-size:11px;font-weight:600;
          background:rgba(255,255,255,0.08);
          border:1px solid rgba(255,255,255,0.12);
          color:rgba(255,255,255,0.65);
          letter-spacing:0.3px;
        }
        .hero-info{
          display:flex;flex-wrap:wrap;gap:16px;
          font-size:12px;color:rgba(255,255,255,0.35);font-weight:400;
        }
        .hero-info span{display:flex;align-items:center;gap:5px}

        /* CARD */
        .card{
          background:#fff;
          border:1px solid #e8e3d9;
          border-radius:12px;
          overflow:hidden;
          transition:box-shadow 0.2s;
        }
        .card:hover{box-shadow:0 4px 24px rgba(44,36,22,0.07)}

        /* SECTION HEADER */
        .sh{
          padding:18px 24px 14px;
          border-bottom:1px solid #f0ece4;
          display:flex;align-items:center;gap:10px;
        }
        .sh-icon{
          width:28px;height:28px;border-radius:6px;
          background:#2c2416;
          display:flex;align-items:center;justify-content:center;
          font-size:13px;flex-shrink:0;
        }
        .sh-title{
          font-size:11px;font-weight:700;
          letter-spacing:1.5px;text-transform:uppercase;
          color:#5a5040;
        }

        /* ROW */
        .field-row{
          padding:14px 24px;
          border-bottom:1px solid #f5f2ec;
          display:grid;grid-template-columns:140px 1fr;gap:12px;
          align-items:start;
        }
        .field-row:last-child{border-bottom:none}
        .field-label{
          font-size:11px;font-weight:600;
          color:#9a8f7e;letter-spacing:0.5px;
          padding-top:1px;
        }
        .field-value{
          font-size:13.5px;color:#2c2416;
          line-height:1.6;font-weight:400;
        }
        .field-empty{
          font-size:13px;color:#c9c0b0;font-style:italic;
        }

        /* TABS */
        .tab-strip{
          display:flex;
          border-bottom:1px solid #e8e3d9;
          background:#fff;
          position:sticky;top:60px;z-index:50;
          overflow-x:auto;scrollbar-width:none;
        }
        .tab-strip::-webkit-scrollbar{display:none}
        .tab-btn{
          flex-shrink:0;
          padding:14px 22px;
          font-size:12px;font-weight:600;
          letter-spacing:0.3px;
          border:none;background:transparent;
          cursor:pointer;
          color:#9a8f7e;
          border-bottom:2px solid transparent;
          transition:all 0.2s;
          white-space:nowrap;
          font-family:'DM Sans',sans-serif;
          display:flex;align-items:center;gap:7px;
        }
        .tab-btn.active{
          color:#2c2416;
          border-bottom-color:#2c2416;
        }
        .tab-btn:hover:not(.active){color:#5a5040}

        /* STAT TILES */
        .stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#f0ece4}
        .stat-tile{background:#fff;padding:20px 24px;text-align:center}
        .stat-num{font-family:'Playfair Display',serif;font-size:36px;color:#2c2416;line-height:1}
        .stat-label{font-size:10px;font-weight:600;color:#9a8f7e;letter-spacing:1.5px;text-transform:uppercase;margin-top:5px}

        /* BADGE */
        .badge{
          display:inline-flex;align-items:center;gap:4px;
          padding:4px 10px;border-radius:4px;
          font-size:11px;font-weight:600;
          border:1px solid;
        }

        /* BLOOD HERO */
        .blood-hero{
          padding:28px 24px;
          background:#fff;
          display:flex;align-items:center;gap:24px;
          border-bottom:1px solid #f0ece4;
        }
        .blood-circle{
          width:80px;height:80px;border-radius:50%;
          background:#2c2416;
          display:flex;align-items:center;justify-content:center;
          font-family:'Playfair Display',serif;
          font-size:24px;color:#fff;font-weight:700;
          flex-shrink:0;
        }

        /* COMPLETION BAR */
        .comp-bar-bg{height:4px;background:#f0ece4;border-radius:2px;overflow:hidden;margin-top:6px}
        .comp-bar-fill{height:100%;background:#2c2416;border-radius:2px;transition:width 1.2s ease}

        /* SOCIAL LINK */
        .soc-link{
          display:inline-flex;align-items:center;gap:7px;
          padding:8px 16px;border-radius:6px;
          border:1px solid #e8e3d9;
          color:#5a5040;
          text-decoration:none;
          font-size:12px;font-weight:600;
          transition:all 0.2s;
        }
        .soc-link:hover{background:#2c2416;color:#fff;border-color:#2c2416}

        /* BUTTONS */
        .btn-primary{
          display:inline-flex;align-items:center;gap:6px;
          padding:9px 20px;
          background:#2c2416;color:#fff;
          border:none;border-radius:6px;
          font-size:12px;font-weight:600;
          cursor:pointer;font-family:'DM Sans',sans-serif;
          letter-spacing:0.3px;
          transition:all 0.2s;
        }
        .btn-primary:hover{background:#3d3220;transform:translateY(-1px)}
        .btn-ghost{
          display:inline-flex;align-items:center;gap:6px;
          padding:9px 16px;
          background:transparent;
          border:1px solid #e8e3d9;
          border-radius:6px;
          color:#9a8f7e;
          font-size:12px;font-weight:500;
          cursor:pointer;font-family:'DM Sans',sans-serif;
          transition:all 0.2s;
        }
        .btn-ghost:hover{border-color:#c9c0b0;color:#5a5040}
        .btn-danger{
          display:inline-flex;align-items:center;gap:6px;
          padding:9px 16px;
          background:transparent;
          border:1px solid #fcd0d0;
          border-radius:6px;
          color:#c05050;
          font-size:12px;font-weight:500;
          cursor:pointer;font-family:'DM Sans',sans-serif;
          transition:all 0.2s;
        }
        .btn-danger:hover{background:#fff5f5;border-color:#f0a0a0}

        /* LIGHTBOX */
        .lb{position:fixed;inset:0;z-index:999;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s ease;cursor:pointer;backdrop-filter:blur(8px)}
        .lb img{max-width:90vw;max-height:90vh;object-fit:contain;border-radius:8px}
        .lb-x{position:absolute;top:20px;right:24px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);color:#fff;font-size:16px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s}
        .lb-x:hover{background:rgba(255,255,255,0.2)}

        /* EMPTY */
        .empty-state{padding:64px 32px;text-align:center}

        /* MAPS */
        .map-wrap{border-radius:8px;overflow:hidden;border:1px solid #e8e3d9;margin:0 24px 24px}

        @media(max-width:640px){
          .hero-content{flex-direction:column;align-items:flex-start;gap:20px;padding:32px 18px 28px}
          .hero-name{font-size:26px}
          .top-nav{padding:0 18px}
          .main-wrap{padding:14px 12px 60px}
          .field-row{grid-template-columns:1fr;gap:3px}
          .field-label{font-size:10px}
          .stat-grid{grid-template-columns:1fr}
        }
      `}</style>

      {/* Lightbox */}
      {avatarFull && avatar && (
        <div className="lb" onClick={() => setAvatarFull(false)}>
          <div className="lb-x">✕</div>
          <img src={avatar} alt={userName} onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* Top Nav */}
      <nav className="top-nav">
        <button onClick={() => router.push('/dashboard')} className="btn-ghost" style={{ fontSize: 12 }}>
          ← Dashboard
        </button>
        <span style={{ fontSize: 11, color: '#9a8f7e', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
          Alumni Profile
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          {profile ? (
            <>
              <button className="btn-primary" onClick={() => router.push('/dashboard/profile/edit')}>Edit Profile</button>
              <button className="btn-danger" onClick={async () => {
                if (confirm('Profile delete করতে চাও?')) {
                  await fetch('/api/profile', { method: 'DELETE' })
                  setProfile(null)
                }
              }}>Delete</button>
            </>
          ) : (
            <button className="btn-primary" onClick={() => router.push('/dashboard/profile/create')}>Create Profile</button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero a1">
        <div className="hero-bg-pattern" />
        <div className="hero-content">
          {/* Avatar */}
          <div className="avatar-wrap">
            {avatar
              ? <img src={avatar} alt={userName} className="avatar-img" onClick={() => setAvatarFull(true)} />
              : <div className="avatar-initials">{initials}</div>
            }
            {avatar && (
              <div style={{ marginTop: 6, fontSize: 10, color: 'rgba(255,255,255,0.25)', textAlign: 'center', cursor: 'pointer' }} onClick={() => setAvatarFull(true)}>
                View full
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="hero-meta">
            <div className="hero-label">HPCAA Alumni Network</div>
            <h1 className="hero-name">{profile?.fullName || userName}</h1>
            {profile?.fullNameBn && <div className="hero-name-bn">{profile.fullNameBn}</div>}
            <div className="hero-tags">
              {profile?.memberType && (
                <span className="hero-tag">
                  {profile.memberType === 'life' ? 'Life Member' : profile.memberType === 'honorary' ? 'Honorary Member' : 'General Member'}
                </span>
              )}
              {profile?.committeePosition && <span className="hero-tag">{profile.committeePosition}</span>}
              {profile?.bloodGroup && <span className="hero-tag">Blood: {profile.bloodGroup}</span>}
              {session?.user?.role && <span className="hero-tag">{session.user.role}</span>}
            </div>
            <div className="hero-info">
              <span>✉ {session?.user?.email}</span>
              {profile?.district && <span>◎ {profile.district}{profile.upazila ? `, ${profile.upazila}` : ''}</span>}
              {profile?.memberSince && <span>◷ Member since {new Date(profile.memberSince).getFullYear()}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* No Profile */}
      {!profile && (
        <div style={{ maxWidth: 820, margin: '32px auto', padding: '0 16px' }}>
          <div className="card a2">
            <div className="empty-state">
              <div style={{ width: 64, height: 64, borderRadius: 12, background: '#f5f2ec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, margin: '0 auto 20px' }}>👤</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: '#2c2416', marginBottom: 8 }}>Profile তৈরি হয়নি</h2>
              <p style={{ fontSize: 13, color: '#9a8f7e', maxWidth: 340, margin: '0 auto 24px', lineHeight: 1.8 }}>
                তোমার profile তৈরি করো এবং HPCAA alumni community তে নিজেকে পরিচয় করিয়ে দাও।
              </p>
              <button className="btn-primary" onClick={() => router.push('/dashboard/profile/create')} style={{ fontSize: 13, padding: '11px 28px' }}>
                Create Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {profile && (
        <>
          {/* Summary Strip */}
          <div className="a2" style={{ background: '#fff', borderBottom: '1px solid #e8e3d9', borderTop: '1px solid #e8e3d9' }}>
            <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32 }}>
              {/* Completion */}
              <div style={{ padding: '14px 0', borderRight: '1px solid #f0ece4', paddingRight: 32, minWidth: 140, flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#9a8f7e', letterSpacing: 1, textTransform: 'uppercase' }}>Profile Complete</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#2c2416' }}>{completion}%</span>
                </div>
                <div className="comp-bar-bg">
                  <div className="comp-bar-fill" style={{ width: `${completion}%` }} />
                </div>
              </div>

              {/* Bio snippet */}
              <div style={{ flex: 1, padding: '14px 0' }}>
                {profile.shortBio
                  ? <p style={{ fontSize: 13, color: '#7a6e5f', fontStyle: 'italic', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{profile.shortBio}"</p>
                  : <p style={{ fontSize: 13, color: '#c9c0b0', fontStyle: 'italic' }}>Bio যোগ করা হয়নি।</p>
                }
              </div>

              {/* Social links */}
              {(profile.facebook || profile.portfolioWebsite || profile.whatsAppNumber) && (
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  {profile.facebook && <a href={profile.facebook} target="_blank" rel="noreferrer" className="soc-link">FB</a>}
                  {profile.portfolioWebsite && <a href={profile.portfolioWebsite} target="_blank" rel="noreferrer" className="soc-link">Web</a>}
                  {profile.whatsAppNumber && <a href={`https://wa.me/${profile.whatsAppNumber}`} target="_blank" rel="noreferrer" className="soc-link">WA</a>}
                </div>
              )}
            </div>
          </div>

          {/* Tab Strip */}
          <div className="a3" style={{ maxWidth: 820, margin: '0 auto' }}>
            {/* sticky tab strip spans full width */}
          </div>
          <div className="tab-strip a3">
            <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', width: '100%' }}>
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`tab-btn${tab === t.id ? ' active' : ''}`}
                  onClick={() => setTab(t.id)}
                >
                  <span style={{ fontSize: 10 }}>{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="main-wrap" style={{ maxWidth: 820, margin: '0 auto', padding: '24px 16px 80px' }}>

            {/* TAB: INFO */}
            {tab === 'info' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="slide-in">
                {/* Basic */}
                <div className="card">
                  <div className="sh">
                    <div className="sh-icon">👤</div>
                    <span className="sh-title">Basic Information</span>
                  </div>
                  <div>
                    {[
                      { label: 'Full Name', value: profile.fullName },
                      { label: 'বাংলা নাম', value: profile.fullNameBn, bn: true },
                      { label: 'Gender', value: profile.gender === 'male' ? 'Male' : profile.gender === 'female' ? 'Female' : profile.gender },
                      { label: 'Date of Birth', value: profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null },
                      { label: 'Member Type', value: profile.memberType === 'life' ? 'Life Member' : profile.memberType === 'honorary' ? 'Honorary Member' : profile.memberType === 'general' ? 'General Member' : profile.memberType },
                      { label: 'Committee Position', value: profile.committeePosition },
                    ].map((f, i) => (
                      <div key={i} className="field-row">
                        <span className="field-label">{f.label}</span>
                        {f.value
                          ? <span className="field-value" style={{ fontFamily: f.bn ? "'Noto Serif Bengali',serif" : undefined }}>{f.value}</span>
                          : <span className="field-empty">—</span>
                        }
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="card">
                  <div className="sh">
                    <div className="sh-icon">📍</div>
                    <span className="sh-title">Contact & Address</span>
                  </div>
                  <div>
                    {[
                      { label: 'Present Address', value: profile.presentAddress },
                      { label: 'Permanent Address', value: profile.permanentAddress },
                      { label: 'জেলা', value: profile.district },
                      { label: 'উপজেলা', value: profile.upazila },
                      { label: 'Alt. Mobile', value: profile.alternativeMobile },
                      { label: 'WhatsApp', value: profile.whatsAppNumber },
                    ].map((f, i) => (
                      <div key={i} className="field-row">
                        <span className="field-label">{f.label}</span>
                        {f.value
                          ? <span className="field-value">{f.value}</span>
                          : <span className="field-empty">—</span>
                        }
                      </div>
                    ))}
                  </div>

                  {/* Map */}
                  {profile.latitude && profile.longitude && (
                    <div style={{ padding: '0 0 0 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderTop: '1px solid #f0ece4' }}>
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: '#9a8f7e', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>GPS Coordinates</div>
                          <div style={{ fontSize: 12, color: '#5a5040', fontFamily: 'monospace' }}>{Number(profile.latitude).toFixed(6)}, {Number(profile.longitude).toFixed(6)}</div>
                        </div>
                        <a href={`https://www.google.com/maps?q=${profile.latitude},${profile.longitude}`} target="_blank" rel="noreferrer" className="soc-link">Open in Maps</a>
                      </div>
                      <div className="map-wrap">
                        <iframe srcDoc={mapHtml(profile.latitude, profile.longitude)} width="100%" height="240" style={{ display: 'block', border: 'none' }} title="Location Map" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: EDUCATION */}
            {tab === 'edu' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="slide-in">
                {/* School */}
                <div className="card">
                  <div className="sh">
                    <div className="sh-icon">🏫</div>
                    <span className="sh-title">School</span>
                  </div>
                  {[
                    { label: 'School Name', value: profile.schoolName },
                    { label: 'Group / Stream', value: profile.schoolGroup },
                    { label: 'Passing Year', value: profile.schoolPassingYear },
                  ].map((f, i) => (
                    <div key={i} className="field-row">
                      <span className="field-label">{f.label}</span>
                      {f.value ? <span className="field-value">{f.value}</span> : <span className="field-empty">—</span>}
                    </div>
                  ))}
                </div>

                {/* College */}
                <div className="card">
                  <div className="sh">
                    <div className="sh-icon">🏛️</div>
                    <span className="sh-title">College</span>
                  </div>
                  {[
                    { label: 'College Name', value: profile.collegeName },
                    { label: 'Department', value: profile.collegeGroup === 'science' ? 'Science' : profile.collegeGroup === 'arts' ? 'Arts' : profile.collegeGroup === 'commerce' ? 'Commerce' : profile.collegeGroup },
                    { label: 'Passing Year', value: profile.collegePassingYear },
                  ].map((f, i) => (
                    <div key={i} className="field-row">
                      <span className="field-label">{f.label}</span>
                      {f.value ? <span className="field-value">{f.value}</span> : <span className="field-empty">—</span>}
                    </div>
                  ))}
                </div>

                {/* University */}
                <div className="card">
                  <div className="sh">
                    <div className="sh-icon">🎓</div>
                    <span className="sh-title">University</span>
                  </div>
                  {[
                    { label: 'University Name', value: profile.universityName },
                    { label: 'Department', value: profile.department },
                    { label: 'Student ID', value: profile.studentId },
                    { label: 'Current Year', value: profile.currentYear ? `${profile.currentYear}th Year` : null },
                    { label: 'Semester', value: profile.currentSemester ? `${profile.currentSemester}th Semester` : null },
                  ].map((f, i) => (
                    <div key={i} className="field-row">
                      <span className="field-label">{f.label}</span>
                      {f.value ? <span className="field-value">{f.value}</span> : <span className="field-empty">—</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: BLOOD */}
            {tab === 'blood' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="slide-in">
                <div className="card">
                  <div className="sh">
                    <div className="sh-icon">🩸</div>
                    <span className="sh-title">Blood Information</span>
                  </div>

                  {/* Blood Hero */}
                  <div className="blood-hero">
                    {profile.bloodGroup
                      ? <div className="blood-circle">{profile.bloodGroup}</div>
                      : <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#f5f2ec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, border: '2px dashed #e8e3d9', flexShrink: 0 }}>🩸</div>
                    }
                    <div>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: '#2c2416', marginBottom: 4 }}>{profile.bloodGroup || 'Unknown'}</div>
                      <div style={{ fontSize: 10, color: '#9a8f7e', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>Blood Group</div>
                      {profile.donationEligibility && (
                        <span className="badge" style={{
                          background: profile.donationEligibility === 'eligible' ? '#f0faf5' : '#fff5f5',
                          color: profile.donationEligibility === 'eligible' ? '#3a8c5c' : '#c05050',
                          borderColor: profile.donationEligibility === 'eligible' ? '#b6e6cc' : '#fcd0d0',
                        }}>
                          {profile.donationEligibility === 'eligible' ? '✓ Eligible to Donate' : '⏸ Not Eligible'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="stat-grid">
                    <div className="stat-tile">
                      <div className="stat-num">{profile.totalDonationCount || 0}</div>
                      <div className="stat-label">Total Donations</div>
                    </div>
                    <div className="stat-tile" style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#9a8f7e', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Preferred Location</div>
                      <div style={{ fontSize: 14, color: profile.preferredDonationLocation ? '#2c2416' : '#c9c0b0', fontStyle: profile.preferredDonationLocation ? 'normal' : 'italic' }}>
                        {profile.preferredDonationLocation || '—'}
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  {[
                    { label: 'Last Donation', value: profile.lastDonationDate ? new Date(profile.lastDonationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null },
                    { label: 'Next Available', value: profile.nextAvailableDonationDate ? new Date(profile.nextAvailableDonationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null },
                  ].map((f, i) => (
                    <div key={i} className="field-row">
                      <span className="field-label">{f.label}</span>
                      {f.value ? <span className="field-value">{f.value}</span> : <span className="field-empty">—</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: BIO */}
            {tab === 'bio' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="slide-in">
                <div className="card">
                  <div className="sh">
                    <div className="sh-icon">✍️</div>
                    <span className="sh-title">Bio & Goals</span>
                  </div>
                  {[
                    { label: 'Short Bio', value: profile.shortBio, large: true },
                    { label: 'কেন HPCAA তে join করলে', value: profile.whyJoined },
                    { label: 'Future Goals', value: profile.futureGoals },
                    { label: 'Hobbies & Interests', value: profile.hobbies },
                  ].map((item, i, arr) => (
                    <div key={i} style={{ padding: '18px 24px', borderBottom: i < arr.length - 1 ? '1px solid #f5f2ec' : 'none' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#9a8f7e', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>{item.label}</div>
                      {item.value
                        ? <p style={{ fontSize: item.large ? 15 : 13.5, color: '#2c2416', lineHeight: 1.9, fontStyle: item.large ? 'italic' : 'normal', fontWeight: 400 }}>{item.value}</p>
                        : <span style={{ fontSize: 13, color: '#c9c0b0', fontStyle: 'italic' }}>দেওয়া হয়নি</span>
                      }
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </>
      )}
    </div>
  )
}