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
      background: 'linear-gradient(135deg, #f0f4ff 0%, #fdf2ff 50%, #fff7f0 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 16,
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Sora:wght@600;700;800&family=Noto+Serif+Bengali:wght@500;600&display=swap');
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
      <div style={{ width:44,height:44,borderRadius:'50%',border:'3px solid #e8e0ff',borderTopColor:'#7c3aed',animation:'spin 0.8s linear infinite' }} />
      <p style={{ color:'#a78bfa',fontSize:13,letterSpacing:1.5,fontWeight:600 }}>Loading…</p>
    </div>
  )

  const userName = session?.user?.name || 'Alumni'
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const avatar = profile?.profileImagePath || session?.user?.image || null
  const cFields = [profile?.fullName, profile?.dateOfBirth, profile?.gender, profile?.bloodGroup, profile?.presentAddress, profile?.district, profile?.collegeName, profile?.collegePassingYear, profile?.universityName, profile?.shortBio, profile?.facebook, profile?.profileImagePath]
  const completion = Math.round((cFields.filter(Boolean).length / cFields.length) * 100)

  const TABS = [
    { id: 'info',  label: 'Personal Info', icon: '◈', color: '#7c3aed' },
    { id: 'edu',   label: 'Education',     icon: '◉', color: '#0891b2' },
    { id: 'blood', label: 'Blood',         icon: '◆', color: '#dc2626' },
    { id: 'bio',   label: 'Bio & Goals',   icon: '◇', color: '#059669' },
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
.p1{position:absolute;width:36px;height:36px;border-radius:50%;background:rgba(124,58,237,0.18);animation:pu 2s ease-out infinite}
.pd{width:12px;height:12px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#0891b2);border:3px solid #fff;box-shadow:0 0 12px rgba(124,58,237,0.5);z-index:2;position:relative}
@keyframes pu{0%{transform:scale(0.4);opacity:1}100%{transform:scale(2.8);opacity:0}}
.leaflet-popup-content-wrapper{background:#fff;border:1px solid #e8e0ff;border-radius:10px;box-shadow:0 8px 24px rgba(124,58,237,0.12)}
.leaflet-popup-tip{background:#fff}
.leaflet-popup-content{font-size:12px;line-height:1.7;color:#4c3d99;margin:10px 14px;font-family:system-ui}
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
L.marker([lat,lng],{icon}).addTo(map).bindPopup('<div style="font-weight:700;color:#4c3d99;margin-bottom:4px;font-size:13px">📍 Location</div><div style="color:#7c6bbf">'+lat.toFixed(6)+', '+lng.toFixed(6)+'</div>').openPopup();
<\/script>
</body></html>`

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#f5f3ff 0%,#fdf4ff 40%,#f0f9ff 100%)', fontFamily:"'DM Sans',sans-serif", color:'#1e1b2e' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Sora:wght@600;700;800&family=Noto+Serif+Bengali:wght@500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}

        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideIn{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:translateX(0)}}

        .a1{animation:fadeUp 0.5s cubic-bezier(.22,1,.36,1) 0.05s both}
        .a2{animation:fadeUp 0.5s cubic-bezier(.22,1,.36,1) 0.15s both}
        .a3{animation:fadeUp 0.5s cubic-bezier(.22,1,.36,1) 0.25s both}
        .a4{animation:fadeUp 0.5s cubic-bezier(.22,1,.36,1) 0.35s both}
        .slide-in{animation:slideIn 0.3s ease both}

        /* ── NAV ── */
        .top-nav{
          position:sticky;top:0;z-index:100;
          background:rgba(255,255,255,0.88);
          backdrop-filter:blur(18px);
          border-bottom:1px solid rgba(124,58,237,0.1);
          padding:0 32px;height:62px;
          display:flex;align-items:center;justify-content:space-between;
          box-shadow:0 1px 0 rgba(124,58,237,0.06);
        }
        .nav-brand{
          font-family:'Sora',sans-serif;
          font-size:13px;font-weight:700;
          background:linear-gradient(90deg,#7c3aed,#0891b2);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          letter-spacing:0.5px;
        }

        /* ── HERO ── */
        .hero{
          background:linear-gradient(135deg,#1e1135 0%,#2d1b69 50%,#0c3460 100%);
          position:relative;overflow:hidden;
        }
        .hero::before{
          content:'';position:absolute;inset:0;
          background:
            radial-gradient(ellipse 60% 70% at 15% 50%,rgba(124,58,237,0.35) 0%,transparent 70%),
            radial-gradient(ellipse 50% 60% at 85% 30%,rgba(8,145,178,0.3) 0%,transparent 70%),
            radial-gradient(ellipse 40% 50% at 50% 90%,rgba(236,72,153,0.2) 0%,transparent 70%);
        }
        .hero-grid{
          position:absolute;inset:0;
          background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);
          background-size:48px 48px;
        }
        .hero-content{
          position:relative;z-index:2;
          max-width:860px;margin:0 auto;
          padding:52px 32px 44px;
          display:flex;gap:32px;align-items:flex-end;
        }

        /* ── AVATAR ── */
        .avatar-ring{
          flex-shrink:0;position:relative;
          width:120px;height:120px;
        }
        .avatar-ring::before{
          content:'';position:absolute;inset:-3px;
          border-radius:20px;
          background:linear-gradient(135deg,#a78bfa,#38bdf8,#f472b6);
          z-index:0;
        }
        .avatar-img{
          position:relative;z-index:1;
          width:120px;height:120px;
          border-radius:18px;
          object-fit:cover;cursor:pointer;display:block;
          transition:transform 0.3s;
          border:3px solid #1e1135;
        }
        .avatar-img:hover{transform:scale(1.04)}
        .avatar-initials{
          position:relative;z-index:1;
          width:120px;height:120px;border-radius:18px;
          background:rgba(255,255,255,0.06);
          border:3px solid rgba(255,255,255,0.08);
          display:flex;align-items:center;justify-content:center;
          font-family:'Sora',sans-serif;font-size:40px;font-weight:800;
          color:rgba(255,255,255,0.4);letter-spacing:-2px;
        }

        /* ── HERO META ── */
        .hero-meta{flex:1;padding-bottom:4px}
        .hero-label{font-size:10px;font-weight:700;letter-spacing:3px;color:rgba(167,139,250,0.6);text-transform:uppercase;margin-bottom:10px}
        .hero-name{font-family:'Sora',sans-serif;font-size:34px;font-weight:800;color:#fff;line-height:1.1;margin-bottom:5px;letter-spacing:-0.5px}
        .hero-name-bn{font-family:'Noto Serif Bengali',serif;font-size:18px;color:rgba(167,139,250,0.65);font-weight:500;margin-bottom:16px}
        .hero-tags{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:16px}
        .hero-tag{padding:5px 13px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:0.3px;border:1px solid}
        .hero-info{display:flex;flex-wrap:wrap;gap:16px;font-size:12px;color:rgba(255,255,255,0.35);font-weight:400}

        /* ── SUMMARY BAND ── */
        .summary-band{background:#fff;border-bottom:1px solid #ede9fe;box-shadow:0 2px 12px rgba(124,58,237,0.06)}
        .summary-inner{max-width:860px;margin:0 auto;padding:0 32px;display:flex;align-items:stretch;gap:0}
        .summary-seg{flex:1;padding:16px 24px;border-right:1px solid #ede9fe;display:flex;align-items:center;gap:14px}
        .summary-seg:last-child{border-right:none}
        .summary-seg:first-child{padding-left:0}

        /* ── TABS ── */
        .tab-strip{
          position:sticky;top:62px;z-index:50;
          background:#fff;border-bottom:2px solid #f3f0ff;
          display:flex;overflow-x:auto;scrollbar-width:none;
          box-shadow:0 2px 8px rgba(124,58,237,0.05);
        }
        .tab-strip::-webkit-scrollbar{display:none}
        .tab-inner{max-width:860px;margin:0 auto;display:flex;width:100%}
        .tab-btn{
          flex-shrink:0;padding:15px 24px;
          font-size:12.5px;font-weight:600;letter-spacing:0.2px;
          border:none;background:transparent;cursor:pointer;
          color:#9488bc;border-bottom:2.5px solid transparent;margin-bottom:-2px;
          transition:all 0.2s;white-space:nowrap;
          font-family:'DM Sans',sans-serif;
          display:flex;align-items:center;gap:8px;
        }
        .tab-btn.active{color:var(--tc);border-bottom-color:var(--tc)}
        .tab-btn:hover:not(.active){color:#5b4d8a}
        .tab-dot{width:7px;height:7px;border-radius:50%;background:var(--tc);opacity:0;transition:opacity 0.2s;flex-shrink:0}
        .tab-btn.active .tab-dot{opacity:1}

        /* ── CARD ── */
        .card{
          background:#fff;border-radius:16px;overflow:hidden;
          border:1px solid #ede9fe;
          box-shadow:0 2px 12px rgba(124,58,237,0.05);
          transition:box-shadow 0.25s,transform 0.25s;
        }
        .card:hover{box-shadow:0 8px 32px rgba(124,58,237,0.1);transform:translateY(-1px)}

        /* ── SECTION HEADER ── */
        .sh{padding:18px 24px 16px;border-bottom:1px solid #f5f3ff;display:flex;align-items:center;gap:12px}
        .sh-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
        .sh-title{font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase}
        .sh-line{flex:1;height:1px;background:linear-gradient(to right,currentColor,transparent);opacity:0.15}

        /* ── FIELD ROW ── */
        .field-row{
          padding:13px 24px;border-bottom:1px solid #faf9ff;
          display:grid;grid-template-columns:148px 1fr;gap:12px;align-items:start;
          transition:background 0.15s;
        }
        .field-row:last-child{border-bottom:none}
        .field-row:hover{background:#fdfcff}
        .field-label{font-size:11px;font-weight:600;color:#9488bc;letter-spacing:0.4px;padding-top:2px}
        .field-value{font-size:13.5px;color:#1e1b2e;line-height:1.6;font-weight:400}
        .field-empty{font-size:13px;color:#d1ccf0;font-style:italic}

        /* ── BADGE ── */
        .badge{display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border-radius:20px;font-size:11px;font-weight:600;border:1px solid}

        /* ── BLOOD HERO ── */
        .blood-hero{
          padding:28px 24px;display:flex;align-items:center;gap:28px;
          border-bottom:1px solid #fff1f1;
          background:linear-gradient(135deg,#fff5f5 0%,#fff 100%);
        }
        .blood-circle{
          width:88px;height:88px;border-radius:50%;
          background:linear-gradient(135deg,#dc2626,#b91c1c);
          display:flex;align-items:center;justify-content:center;
          font-family:'Sora',sans-serif;font-size:26px;color:#fff;font-weight:800;
          flex-shrink:0;box-shadow:0 8px 28px rgba(220,38,38,0.35);
          border:3px solid rgba(255,255,255,0.4);
        }

        /* ── STAT TILES ── */
        .stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#f3f0ff}
        .stat-tile{background:#fff;padding:22px 24px;text-align:center;transition:background 0.2s}
        .stat-tile:hover{background:#fdfcff}
        .stat-num{font-family:'Sora',sans-serif;font-size:38px;font-weight:800;line-height:1}
        .stat-label{font-size:10px;font-weight:700;color:#9488bc;letter-spacing:1.5px;text-transform:uppercase;margin-top:5px}

        /* ── COMPLETION ── */
        .comp-track{height:5px;background:#f0eeff;border-radius:3px;overflow:hidden;margin-top:7px}
        .comp-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#7c3aed,#0891b2);transition:width 1.4s cubic-bezier(.22,1,.36,1)}

        /* ── SOCIAL LINKS ── */
        .soc-link{
          display:inline-flex;align-items:center;gap:7px;
          padding:8px 16px;border-radius:8px;
          border:1.5px solid #ede9fe;color:#7c3aed;
          text-decoration:none;font-size:12px;font-weight:600;
          transition:all 0.2s;background:#faf8ff;
        }
        .soc-link:hover{background:#7c3aed;color:#fff;border-color:#7c3aed;box-shadow:0 4px 14px rgba(124,58,237,0.25)}

        /* ── BUTTONS ── */
        .btn-primary{
          display:inline-flex;align-items:center;gap:7px;padding:9px 20px;
          background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;
          border:none;border-radius:8px;font-size:12px;font-weight:700;
          cursor:pointer;font-family:'DM Sans',sans-serif;letter-spacing:0.3px;
          transition:all 0.2s;box-shadow:0 2px 10px rgba(124,58,237,0.3);
        }
        .btn-primary:hover{background:linear-gradient(135deg,#6d28d9,#5b21b6);transform:translateY(-1px);box-shadow:0 6px 20px rgba(124,58,237,0.4)}
        .btn-ghost{
          display:inline-flex;align-items:center;gap:6px;padding:9px 16px;background:#fff;
          border:1.5px solid #ede9fe;border-radius:8px;color:#7c3aed;
          font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;
        }
        .btn-ghost:hover{border-color:#7c3aed;background:#faf8ff}
        .btn-danger{
          display:inline-flex;align-items:center;gap:6px;padding:9px 16px;background:#fff;
          border:1.5px solid #fecaca;border-radius:8px;color:#dc2626;
          font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;
        }
        .btn-danger:hover{background:#fff5f5;border-color:#f87171}

        /* ── LIGHTBOX ── */
        .lb{position:fixed;inset:0;z-index:999;background:rgba(10,5,30,0.92);display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s ease;cursor:pointer;backdrop-filter:blur(10px)}
        .lb img{max-width:90vw;max-height:90vh;object-fit:contain;border-radius:12px;box-shadow:0 0 0 1px rgba(167,139,250,0.3)}
        .lb-x{position:absolute;top:20px;right:24px;width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;font-size:16px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s}
        .lb-x:hover{background:rgba(220,38,38,0.2);border-color:rgba(220,38,38,0.4)}

        /* ── EMPTY ── */
        .empty-state{padding:72px 32px;text-align:center}

        /* ── MAP ── */
        .map-wrap{border-radius:10px;overflow:hidden;border:1px solid #ede9fe;margin:0 24px 24px;box-shadow:0 4px 16px rgba(124,58,237,0.08)}

        /* ── BIO BLOCK ── */
        .bio-block{padding:20px 24px;border-bottom:1px solid #faf9ff}
        .bio-block:last-child{border-bottom:none}
        .bio-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:8px}
        .bio-label::after{content:'';flex:1;height:1px;background:linear-gradient(to right,currentColor,transparent);opacity:0.2}

        @media(max-width:640px){
          .hero-content{flex-direction:column;align-items:flex-start;gap:20px;padding:32px 18px 28px}
          .hero-name{font-size:27px}
          .top-nav{padding:0 18px}
          .summary-inner{flex-direction:column;padding:0 18px}
          .summary-seg{border-right:none;border-bottom:1px solid #ede9fe;padding:14px 0}
          .summary-seg:last-child{border-bottom:none}
          .main-wrap{padding:14px 12px 60px!important}
          .field-row{grid-template-columns:1fr;gap:3px}
          .field-label{font-size:10px}
          .stat-grid{grid-template-columns:1fr}
        }
      `}</style>

      {/* Lightbox */}
      {avatarFull && avatar && (
        <div className="lb" onClick={() => setAvatarFull(false)}>
          <div className="lb-x" onClick={e => { e.stopPropagation(); setAvatarFull(false) }}>✕</div>
          <img src={avatar} alt={userName} onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* ── TOP NAV ── */}
      <nav className="top-nav">
        <button onClick={() => router.push('/dashboard')} className="btn-ghost" style={{ fontSize:12 }}>
          ← Dashboard
        </button>
        <span className="nav-brand">HPCAA Alumni</span>
        <div style={{ display:'flex', gap:8 }}>
          {profile ? (
            <>
              <button className="btn-primary" onClick={() => router.push('/dashboard/profile/edit')}>✏️ Edit Profile</button>
              <button className="btn-danger" onClick={async () => {
                if (confirm('Profile delete করতে চাও?')) {
                  await fetch('/api/profile', { method:'DELETE' })
                  setProfile(null)
                }
              }}>🗑️</button>
            </>
          ) : (
            <button className="btn-primary" onClick={() => router.push('/dashboard/profile/create')}>+ Create Profile</button>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="hero a1">
        <div className="hero-grid" />
        <div className="hero-content">
          {/* Avatar */}
          <div className="avatar-ring">
            {avatar
              ? <img src={avatar} alt={userName} className="avatar-img" onClick={() => setAvatarFull(true)} />
              : <div className="avatar-initials">{initials}</div>
            }
          </div>

          {/* Meta */}
          <div className="hero-meta">
            <div className="hero-label">✦ HPCAA Alumni Network</div>
            <h1 className="hero-name">{profile?.fullName || userName}</h1>
            {profile?.fullNameBn && <div className="hero-name-bn">{profile.fullNameBn}</div>}
            <div className="hero-tags">
              {profile?.memberType && (
                <span className="hero-tag" style={{ background:'rgba(167,139,250,0.15)', color:'#c4b5fd', borderColor:'rgba(167,139,250,0.3)' }}>
                  ⭐ {profile.memberType === 'life' ? 'Life Member' : profile.memberType === 'honorary' ? 'Honorary Member' : 'General Member'}
                </span>
              )}
              {profile?.committeePosition && (
                <span className="hero-tag" style={{ background:'rgba(56,189,248,0.12)', color:'#7dd3fc', borderColor:'rgba(56,189,248,0.25)' }}>
                  🏛️ {profile.committeePosition}
                </span>
              )}
              {profile?.bloodGroup && (
                <span className="hero-tag" style={{ background:'rgba(248,113,113,0.12)', color:'#fca5a5', borderColor:'rgba(248,113,113,0.25)' }}>
                  🩸 {profile.bloodGroup}
                </span>
              )}
              {session?.user?.role && (
                <span className="hero-tag" style={{ background:'rgba(52,211,153,0.12)', color:'#6ee7b7', borderColor:'rgba(52,211,153,0.25)' }}>
                  🎓 {session.user.role}
                </span>
              )}
            </div>
            <div className="hero-info">
              <span>✉ {session?.user?.email}</span>
              {profile?.district && <span>📍 {profile.district}{profile.upazila ? `, ${profile.upazila}` : ''}</span>}
              {profile?.memberSince && <span>📅 Member since {new Date(profile.memberSince).getFullYear()}</span>}
            </div>
            {avatar && (
              <div style={{ marginTop:10, fontSize:10, color:'rgba(167,139,250,0.4)', cursor:'pointer' }} onClick={() => setAvatarFull(true)}>
                🔍 Click photo to view fullscreen
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── NO PROFILE ── */}
      {!profile && (
        <div style={{ maxWidth:860, margin:'32px auto', padding:'0 16px' }}>
          <div className="card a2">
            <div className="empty-state">
              <div style={{ width:72,height:72,borderRadius:16,background:'linear-gradient(135deg,#ede9fe,#e0f2fe)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:30,margin:'0 auto 20px',boxShadow:'0 4px 16px rgba(124,58,237,0.1)' }}>👤</div>
              <h2 style={{ fontFamily:"'Sora',sans-serif",fontSize:22,color:'#1e1b2e',marginBottom:8,fontWeight:800 }}>Profile তৈরি হয়নি</h2>
              <p style={{ fontSize:13,color:'#9488bc',maxWidth:340,margin:'0 auto 26px',lineHeight:1.8 }}>
                তোমার profile তৈরি করো এবং HPCAA alumni community তে নিজেকে পরিচয় করিয়ে দাও।
              </p>
              <button className="btn-primary" onClick={() => router.push('/dashboard/profile/create')} style={{ fontSize:13,padding:'12px 32px' }}>
                + Profile তৈরি করো
              </button>
            </div>
          </div>
        </div>
      )}

      {profile && (
        <>
          {/* ── SUMMARY BAND ── */}
          <div className="summary-band a2">
            <div className="summary-inner">
              {/* Completion */}
              <div className="summary-seg" style={{ flexDirection:'column',alignItems:'flex-start',gap:0,minWidth:170,flexShrink:0 }}>
                <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',marginBottom:4 }}>
                  <span style={{ fontSize:10,fontWeight:700,color:'#9488bc',letterSpacing:1.2,textTransform:'uppercase' }}>Completion</span>
                  <span style={{ fontSize:13,fontWeight:800,color:'#7c3aed' }}>{completion}%</span>
                </div>
                <div className="comp-track" style={{ width:'100%' }}>
                  <div className="comp-fill" style={{ width:`${completion}%` }} />
                </div>
                <span style={{ fontSize:10,color:'#c4b5e8',marginTop:5 }}>{cFields.filter(Boolean).length} of {cFields.length} fields filled</span>
              </div>

              {/* Bio */}
              <div className="summary-seg" style={{ flex:1 }}>
                <div style={{ width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#7c3aed,#a855f7)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0 }}>✍️</div>
                <div style={{ flex:1,minWidth:0 }}>
                  {profile.shortBio
                    ? <p style={{ fontSize:13,color:'#5b4d8a',fontStyle:'italic',lineHeight:1.7,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical' }}>&ldquo;{profile.shortBio}&rdquo;</p>
                    : <p style={{ fontSize:13,color:'#c4b5e8',fontStyle:'italic' }}>Bio যোগ করা হয়নি।</p>
                  }
                </div>
              </div>

              {/* Socials */}
              {(profile.facebook || profile.portfolioWebsite || profile.whatsAppNumber) && (
                <div className="summary-seg" style={{ gap:6,flexShrink:0,flex:'none' }}>
                  {profile.facebook && <a href={profile.facebook} target="_blank" rel="noreferrer" className="soc-link">📘 Facebook</a>}
                  {profile.portfolioWebsite && <a href={profile.portfolioWebsite} target="_blank" rel="noreferrer" className="soc-link">🌐 Portfolio</a>}
                  {profile.whatsAppNumber && <a href={`https://wa.me/${profile.whatsAppNumber}`} target="_blank" rel="noreferrer" className="soc-link">💬 WhatsApp</a>}
                </div>
              )}
            </div>
          </div>

          {/* ── TAB STRIP ── */}
          <div className="tab-strip a3">
            <div className="tab-inner">
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`tab-btn${tab === t.id ? ' active' : ''}`}
                  style={{ '--tc': t.color }}
                  onClick={() => setTab(t.id)}
                >
                  <span className="tab-dot" style={{ '--tc': t.color }} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── TAB CONTENT ── */}
          <div className="main-wrap" style={{ maxWidth:860, margin:'0 auto', padding:'24px 16px 80px' }}>

            {/* ── INFO TAB ── */}
            {tab === 'info' && (
              <div style={{ display:'flex',flexDirection:'column',gap:16 }} className="slide-in">
                <div className="card">
                  <div className="sh">
                    <div className="sh-icon" style={{ background:'linear-gradient(135deg,#ede9fe,#ddd6fe)' }}>👤</div>
                    <span className="sh-title" style={{ color:'#7c3aed' }}>Basic Information</span>
                    <div className="sh-line" style={{ color:'#7c3aed' }} />
                  </div>
                  {[
                    { label:'Full Name',         value:profile.fullName },
                    { label:'বাংলা নাম',          value:profile.fullNameBn, bn:true },
                    { label:'Gender',             value:profile.gender === 'male' ? '♂ Male' : profile.gender === 'female' ? '♀ Female' : profile.gender },
                    { label:'Date of Birth',      value:profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : null },
                    { label:'Member Type',        value:profile.memberType === 'life' ? 'Life Member' : profile.memberType === 'honorary' ? 'Honorary Member' : profile.memberType === 'general' ? 'General Member' : profile.memberType },
                    { label:'Committee Position', value:profile.committeePosition },
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

                <div className="card">
                  <div className="sh">
                    <div className="sh-icon" style={{ background:'linear-gradient(135deg,#e0f2fe,#bae6fd)' }}>📍</div>
                    <span className="sh-title" style={{ color:'#0891b2' }}>Contact & Address</span>
                    <div className="sh-line" style={{ color:'#0891b2' }} />
                  </div>
                  {[
                    { label:'Present Address',   value:profile.presentAddress },
                    { label:'Permanent Address', value:profile.permanentAddress },
                    { label:'জেলা',              value:profile.district },
                    { label:'উপজেলা',            value:profile.upazila },
                    { label:'Alt. Mobile',       value:profile.alternativeMobile },
                    { label:'WhatsApp',          value:profile.whatsAppNumber },
                  ].map((f, i) => (
                    <div key={i} className="field-row">
                      <span className="field-label">{f.label}</span>
                      {f.value ? <span className="field-value">{f.value}</span> : <span className="field-empty">—</span>}
                    </div>
                  ))}
                  {profile.latitude && profile.longitude && (
                    <>
                      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 24px',borderTop:'1px solid #f0f9ff',background:'#f8fcff' }}>
                        <div>
                          <div style={{ fontSize:10,fontWeight:700,color:'#0891b2',letterSpacing:1.2,textTransform:'uppercase',marginBottom:3 }}>GPS Coordinates</div>
                          <div style={{ fontSize:12,color:'#164e63',fontFamily:'monospace',fontWeight:600 }}>{Number(profile.latitude).toFixed(6)}, {Number(profile.longitude).toFixed(6)}</div>
                        </div>
                        <a href={`https://www.google.com/maps?q=${profile.latitude},${profile.longitude}`} target="_blank" rel="noreferrer" className="soc-link" style={{ borderColor:'#bae6fd',color:'#0891b2' }}>Open in Maps ↗</a>
                      </div>
                      <div className="map-wrap">
                        <iframe srcDoc={mapHtml(profile.latitude, profile.longitude)} width="100%" height="240" style={{ display:'block',border:'none' }} title="Location Map" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* ── EDUCATION TAB ── */}
            {tab === 'edu' && (
              <div style={{ display:'flex',flexDirection:'column',gap:16 }} className="slide-in">
                <div className="card">
                  <div className="sh">
                    <div className="sh-icon" style={{ background:'linear-gradient(135deg,#dcfce7,#bbf7d0)' }}>🏫</div>
                    <span className="sh-title" style={{ color:'#059669' }}>School</span>
                    <div className="sh-line" style={{ color:'#059669' }} />
                  </div>
                  {[
                    { label:'School Name',    value:profile.schoolName },
                    { label:'Group / Stream', value:profile.schoolGroup },
                    { label:'Passing Year',   value:profile.schoolPassingYear },
                  ].map((f, i) => (
                    <div key={i} className="field-row">
                      <span className="field-label">{f.label}</span>
                      {f.value ? <span className="field-value">{f.value}</span> : <span className="field-empty">—</span>}
                    </div>
                  ))}
                </div>

                <div className="card">
                  <div className="sh">
                    <div className="sh-icon" style={{ background:'linear-gradient(135deg,#fef9c3,#fde68a)' }}>🏛️</div>
                    <span className="sh-title" style={{ color:'#d97706' }}>College</span>
                    <div className="sh-line" style={{ color:'#d97706' }} />
                  </div>
                  {[
                    { label:'College Name', value:profile.collegeName },
                    { label:'Department',   value:profile.collegeGroup === 'science' ? 'Science' : profile.collegeGroup === 'arts' ? 'Arts' : profile.collegeGroup === 'commerce' ? 'Commerce' : profile.collegeGroup },
                    { label:'Passing Year', value:profile.collegePassingYear },
                  ].map((f, i) => (
                    <div key={i} className="field-row">
                      <span className="field-label">{f.label}</span>
                      {f.value ? <span className="field-value">{f.value}</span> : <span className="field-empty">—</span>}
                    </div>
                  ))}
                </div>

                <div className="card">
                  <div className="sh">
                    <div className="sh-icon" style={{ background:'linear-gradient(135deg,#ede9fe,#ddd6fe)' }}>🎓</div>
                    <span className="sh-title" style={{ color:'#7c3aed' }}>University</span>
                    <div className="sh-line" style={{ color:'#7c3aed' }} />
                  </div>
                  {[
                    { label:'University Name', value:profile.universityName },
                    { label:'Department',      value:profile.department },
                    { label:'Student ID',      value:profile.studentId },
                    { label:'Current Year',    value:profile.currentYear ? `${profile.currentYear}th Year` : null },
                    { label:'Semester',        value:profile.currentSemester ? `${profile.currentSemester}th Semester` : null },
                  ].map((f, i) => (
                    <div key={i} className="field-row">
                      <span className="field-label">{f.label}</span>
                      {f.value ? <span className="field-value">{f.value}</span> : <span className="field-empty">—</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── BLOOD TAB ── */}
            {tab === 'blood' && (
              <div style={{ display:'flex',flexDirection:'column',gap:16 }} className="slide-in">
                <div className="card">
                  <div className="sh">
                    <div className="sh-icon" style={{ background:'linear-gradient(135deg,#fee2e2,#fecaca)' }}>🩸</div>
                    <span className="sh-title" style={{ color:'#dc2626' }}>Blood Information</span>
                    <div className="sh-line" style={{ color:'#dc2626' }} />
                  </div>
                  <div className="blood-hero">
                    {profile.bloodGroup
                      ? <div className="blood-circle">{profile.bloodGroup}</div>
                      : <div style={{ width:88,height:88,borderRadius:'50%',background:'#fff5f5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:30,border:'2px dashed #fecaca',flexShrink:0 }}>🩸</div>
                    }
                    <div>
                      <div style={{ fontFamily:"'Sora',sans-serif",fontSize:30,color:'#1e1b2e',marginBottom:4,fontWeight:800 }}>{profile.bloodGroup || 'Unknown'}</div>
                      <div style={{ fontSize:10,color:'#dc2626',fontWeight:700,letterSpacing:2,textTransform:'uppercase',marginBottom:12 }}>Blood Group</div>
                      {profile.donationEligibility && (
                        <span className="badge" style={{
                          background: profile.donationEligibility === 'eligible' ? '#f0fdf4' : '#fff5f5',
                          color:       profile.donationEligibility === 'eligible' ? '#15803d' : '#dc2626',
                          borderColor: profile.donationEligibility === 'eligible' ? '#bbf7d0' : '#fecaca',
                        }}>
                          {profile.donationEligibility === 'eligible' ? '✓ Eligible to Donate' : '⏸ Not Eligible'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="stat-grid">
                    <div className="stat-tile">
                      <div className="stat-num" style={{ background:'linear-gradient(135deg,#dc2626,#f87171)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>
                        {profile.totalDonationCount || 0}
                      </div>
                      <div className="stat-label">Total Donations</div>
                    </div>
                    <div className="stat-tile" style={{ textAlign:'left' }}>
                      <div style={{ fontSize:10,fontWeight:700,color:'#9488bc',letterSpacing:1.2,textTransform:'uppercase',marginBottom:7 }}>Preferred Location</div>
                      <div style={{ fontSize:15,fontWeight:600,color: profile.preferredDonationLocation ? '#1e1b2e' : '#d1ccf0',fontStyle: profile.preferredDonationLocation ? 'normal' : 'italic' }}>
                        {profile.preferredDonationLocation || '—'}
                      </div>
                    </div>
                  </div>
                  {[
                    { label:'Last Donation',  value: profile.lastDonationDate ? new Date(profile.lastDonationDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : null },
                    { label:'Next Available', value: profile.nextAvailableDonationDate ? new Date(profile.nextAvailableDonationDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : null },
                  ].map((f, i) => (
                    <div key={i} className="field-row">
                      <span className="field-label">{f.label}</span>
                      {f.value ? <span className="field-value">{f.value}</span> : <span className="field-empty">—</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── BIO TAB ── */}
            {tab === 'bio' && (
              <div style={{ display:'flex',flexDirection:'column',gap:16 }} className="slide-in">
                <div className="card">
                  <div className="sh">
                    <div className="sh-icon" style={{ background:'linear-gradient(135deg,#fce7f3,#fbcfe8)' }}>✍️</div>
                    <span className="sh-title" style={{ color:'#be185d' }}>Bio & Goals</span>
                    <div className="sh-line" style={{ color:'#be185d' }} />
                  </div>
                  {[
                    { label:'Short Bio',               value:profile.shortBio,    large:true, accent:'#be185d' },
                    { label:'কেন HPCAA তে join করলে',  value:profile.whyJoined,              accent:'#7c3aed' },
                    { label:'Future Goals',            value:profile.futureGoals,             accent:'#0891b2' },
                    { label:'Hobbies & Interests',     value:profile.hobbies,                 accent:'#059669' },
                  ].map((item, i) => (
                    <div key={i} className="bio-block">
                      <div className="bio-label" style={{ color: item.accent }}>
                        {item.label}
                      </div>
                      {item.value
                        ? <p style={{ fontSize: item.large ? 15 : 13.5, color:'#1e1b2e', lineHeight:1.95, fontStyle: item.large ? 'italic' : 'normal' }}>{item.value}</p>
                        : <span style={{ fontSize:13,color:'#d1ccf0',fontStyle:'italic' }}>দেওয়া হয়নি</span>
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