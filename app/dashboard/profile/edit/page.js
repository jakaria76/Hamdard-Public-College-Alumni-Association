'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef, useCallback } from 'react'
import { updateLocation } from '@/components/shared/updateLocation'

const DISTRICTS = [
  'ঢাকা','চট্টগ্রাম','রাজশাহী','খুলনা','বরিশাল','সিলেট','রংপুর','ময়মনসিংহ',
  'কুমিল্লা','নারায়ণগঞ্জ','গাজীপুর','টাঙ্গাইল','ফরিদপুর','মাদারীপুর',
  'গোপালগঞ্জ','শরীয়তপুর','রাজবাড়ী','কিশোরগঞ্জ','নেত্রকোণা',
  'জামালপুর','শেরপুর','সিরাজগঞ্জ','পাবনা','নাটোর','নওগাঁ','চাঁপাইনবাবগঞ্জ',
  'বগুড়া','জয়পুরহাট','যশোর','সাতক্ষীরা','মেহেরপুর','নড়াইল','কুষ্টিয়া',
  'চুয়াডাঙ্গা','মাগুরা','ঝিনাইদহ','বাগেরহাট','পিরোজপুর','ঝালকাঠি',
  'বরগুনা','পটুয়াখালী','ভোলা','ব্রাহ্মণবাড়িয়া','চাঁদপুর','লক্ষ্মীপুর',
  'নোয়াখালী','ফেনী','খাগড়াছড়ি','রাঙামাটি','বান্দরবান','কক্সবাজার',
  'হবিগঞ্জ','মৌলভীবাজার','সুনামগঞ্জ','কুড়িগ্রাম','গাইবান্ধা','লালমনিরহাট',
  'নীলফামারী','পঞ্চগড়','ঠাকুরগাঁও','দিনাজপুর',
]

const TABS = [
  { id: 'basic',     label: 'Basic',     icon: '◈', color: '#7c3aed' },
  { id: 'contact',   label: 'Contact',   icon: '◉', color: '#0891b2' },
  { id: 'education', label: 'Education', icon: '◆', color: '#d97706' },
  { id: 'blood',     label: 'Blood',     icon: '◇', color: '#dc2626' },
  { id: 'bio',       label: 'Bio',       icon: '◈', color: '#be185d' },
  { id: 'social',    label: 'Social',    icon: '◉', color: '#059669' },
]

const MAP_HTML = (lat, lng, hasLoc) => `<!DOCTYPE html>
<html>
<head>
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
  .leaflet-popup-content-wrapper{background:#fff;border:1px solid #ede9fe;border-radius:10px;box-shadow:0 8px 24px rgba(124,58,237,0.15)}
  .leaflet-popup-tip{background:#fff}
  .leaflet-popup-content{font-size:12px;line-height:1.7;color:#4c3d99;margin:10px 14px;font-family:system-ui}
  .leaflet-control-attribution{display:none}
</style>
</head>
<body>
<div id="map"></div>
<script>
  const map = L.map('map',{zoomControl:true}).setView([${lat},${lng}],13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'',maxZoom:19}).addTo(map);
  const icon = L.divIcon({className:'',html:'<div class="pw"><div class="p1"></div><div class="pd"></div></div>',iconSize:[36,36],iconAnchor:[18,18],popupAnchor:[0,-20]});
  let marker=null;
  function place(lat,lng){
    if(marker) map.removeLayer(marker);
    marker=L.marker([lat,lng],{icon,draggable:true}).addTo(map);
    marker.bindPopup('<b style="color:#4c3d99">📍 Selected</b><br>'+lat.toFixed(6)+', '+lng.toFixed(6)).openPopup();
    marker.on('dragend',function(e){
      const p=e.target.getLatLng();
      window.parent.postMessage({type:'LOC',lat:p.lat,lng:p.lng},'*');
    });
    window.parent.postMessage({type:'LOC',lat,lng},'*');
  }
  if(${hasLoc}) place(${lat},${lng});
  map.on('click',function(e){ place(e.latlng.lat,e.latlng.lng); });
  window.addEventListener('message',function(e){
    if(e.data&&e.data.type==='FLY'){ place(e.data.lat,e.data.lng); map.flyTo([e.data.lat,e.data.lng],15); }
  });
<\/script>
</body>
</html>`

export default function ProfileEditPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const fileInputRef = useRef(null)
  const mapListenerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [gpsLoading, setGpsLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('basic')
  const [preview, setPreview] = useState(null)

  const [form, setForm] = useState({
    fullName: '', fullNameBn: '', memberType: 'general', committeePosition: '',
    memberSince: '', gender: '', dateOfBirth: '',
    alternativeMobile: '', presentAddress: '', permanentAddress: '',
    district: '', upazila: '', facebookLink: '', whatsAppNumber: '',
    bloodGroup: '', lastDonationDate: '', nextAvailableDonationDate: '',
    donationEligibility: 'unknown', totalDonationCount: '',
    preferredDonationLocation: '',
    schoolName: '', schoolGroup: '', schoolPassingYear: '',
    collegeName: '', collegeGroup: '', collegePassingYear: '',
    universityName: '', department: '', studentId: '',
    currentYear: '', currentSemester: '',
    shortBio: '', whyJoined: '', futureGoals: '', hobbies: '',
    facebook: '', portfolioWebsite: '',
    latitude: '', longitude: '', locationDms: '',
    imageFile: null,
  })

  useEffect(() => {
    if (status === 'unauthenticated') { window.location.href = '/login'; return }
    if (status === 'authenticated') fetchProfile()
  }, [status])

  useEffect(() => {
    if (activeTab !== 'contact') return
    const handler = async (event) => {
      if (event.data?.type === 'LOC') {
        await updateLocation(event.data.lat, event.data.lng, setForm)
      }
    }
    window.addEventListener('message', handler)
    mapListenerRef.current = handler
    return () => { window.removeEventListener('message', handler) }
  }, [activeTab])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      const data = await res.json()
      if (data.profile) {
        const p = data.profile
        setForm(prev => ({
          ...prev,
          fullName: p.fullName || '', fullNameBn: p.fullNameBn || '',
          memberType: p.memberType || 'general', committeePosition: p.committeePosition || '',
          memberSince: p.memberSince ? p.memberSince.split('T')[0] : '',
          gender: p.gender || '', dateOfBirth: p.dateOfBirth ? p.dateOfBirth.split('T')[0] : '',
          alternativeMobile: p.alternativeMobile || '', presentAddress: p.presentAddress || '',
          permanentAddress: p.permanentAddress || '', district: p.district || '',
          upazila: p.upazila || '', facebookLink: p.facebookLink || '',
          whatsAppNumber: p.whatsAppNumber || '', bloodGroup: p.bloodGroup || '',
          lastDonationDate: p.lastDonationDate ? p.lastDonationDate.split('T')[0] : '',
          nextAvailableDonationDate: p.nextAvailableDonationDate ? p.nextAvailableDonationDate.split('T')[0] : '',
          donationEligibility: p.donationEligibility || 'unknown',
          totalDonationCount: p.totalDonationCount || '',
          preferredDonationLocation: p.preferredDonationLocation || '',
          schoolName: p.schoolName || '', schoolGroup: p.schoolGroup || '',
          schoolPassingYear: p.schoolPassingYear || '', collegeName: p.collegeName || '',
          collegeGroup: p.collegeGroup || '', collegePassingYear: p.collegePassingYear || '',
          universityName: p.universityName || '', department: p.department || '',
          studentId: p.studentId || '', currentYear: p.currentYear || '',
          currentSemester: p.currentSemester || '', shortBio: p.shortBio || '',
          whyJoined: p.whyJoined || '', futureGoals: p.futureGoals || '',
          hobbies: p.hobbies || '', facebook: p.facebook || '',
          portfolioWebsite: p.portfolioWebsite || '',
          latitude: p.latitude || '', longitude: p.longitude || '',
          locationDms: p.locationDms || '',
        }))
        if (p.profileImagePath) setPreview(p.profileImagePath)
      }
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setForm(prev => ({ ...prev, imageFile: file }))
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleGPS = () => {
    if (!navigator.geolocation) { alert('Browser এ geolocation support নেই'); return }
    setGpsLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        await updateLocation(lat, lng, setForm)
        document.getElementById('map-frame')?.contentWindow?.postMessage({ type: 'FLY', lat, lng }, '*')
        setGpsLoading(false)
      },
      () => { alert('Location permission দাও: Settings > Browser > Location'); setGpsLoading(false) },
      { enableHighAccuracy: true, timeout: 12000 }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true); setError(''); setSuccess('')
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'imageFile' && value) formData.append('imageFile', value)
        else if (value !== '' && value !== null) formData.append(key, value)
      })
      const res = await fetch('/api/profile', { method: 'PUT', body: formData })
      const data = await res.json()
      if (!res.ok) setError(data.error || 'কিছু একটা সমস্যা হয়েছে')
      else {
        setSuccess('Profile সফলভাবে update হয়েছে!')
        setTimeout(() => router.push('/dashboard/profile'), 1400)
      }
    } catch { setError('Server error হয়েছে') }
    finally { setSaving(false) }
  }

  if (status === 'loading' || loading) return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#f5f3ff 0%,#fdf4ff 40%,#f0f9ff 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@600;700;800&family=Noto+Serif+Bengali:wght@500;600&display=swap');
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
      <div style={{ width:44,height:44,borderRadius:'50%',border:'3px solid #ede9fe',borderTopColor:'#7c3aed',animation:'spin 0.8s linear infinite' }} />
      <p style={{ color:'#a78bfa',fontSize:13,letterSpacing:1.5,fontWeight:600 }}>Loading…</p>
    </div>
  )

  const userName = session?.user?.name || 'Alumni'
  const currentTabObj = TABS.find(t => t.id === activeTab) || TABS[0]
  const mapLat = form.latitude || 23.8103
  const mapLng = form.longitude || 90.4125
  const hasLoc = !!form.latitude

  // ── Reusable field components ──
  const FL = ({ label, required: req, children }) => (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:'block', fontSize:10, fontWeight:700, color:'#9488bc', letterSpacing:1.8, textTransform:'uppercase', marginBottom:7 }}>
        {label}{req && <span style={{ color:'#f87171', marginLeft:3 }}>*</span>}
      </label>
      {children}
    </div>
  )

  const inputStyle = {
    width:'100%', padding:'11px 14px',
    background:'#faf9ff',
    border:'1.5px solid #ede9fe',
    borderRadius:10, fontSize:13.5, color:'#1e1b2e',
    fontFamily:"'DM Sans',sans-serif",
    outline:'none', transition:'all 0.18s',
    appearance:'none',
  }

  const SH = ({ icon, label, color = '#7c3aed', bg = '#ede9fe' }) => (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18, marginTop:24, paddingBottom:12, borderBottom:`1px solid ${bg}` }}>
      <div style={{ width:30, height:30, borderRadius:8, background:bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>{icon}</div>
      <span style={{ fontSize:11, fontWeight:800, color, letterSpacing:1.8, textTransform:'uppercase', fontFamily:"'DM Sans',sans-serif" }}>{label}</span>
      <div style={{ flex:1, height:1, background:`linear-gradient(to right, ${bg}, transparent)` }} />
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#f5f3ff 0%,#fdf4ff 40%,#f0f9ff 100%)', fontFamily:"'DM Sans',sans-serif", color:'#1e1b2e' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Sora:wght@600;700;800&family=Noto+Serif+Bengali:wght@500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}

        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:translateX(0)}}

        .a1{animation:fadeUp 0.45s cubic-bezier(.22,1,.36,1) 0.05s both}
        .a2{animation:fadeUp 0.45s cubic-bezier(.22,1,.36,1) 0.12s both}
        .a3{animation:fadeUp 0.45s cubic-bezier(.22,1,.36,1) 0.2s both}
        .tab-content{animation:slideIn 0.3s ease both}

        /* ── NAV ── */
        .edit-nav{
          position:sticky;top:0;z-index:100;
          background:rgba(255,255,255,0.9);
          backdrop-filter:blur(18px);
          border-bottom:1px solid rgba(124,58,237,0.1);
          padding:0 28px;height:60px;
          display:flex;align-items:center;justify-content:space-between;
          box-shadow:0 1px 0 rgba(124,58,237,0.06);
        }
        .nav-brand{
          font-family:'Sora',sans-serif;font-size:13px;font-weight:700;
          background:linear-gradient(90deg,#7c3aed,#0891b2);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
        }

        /* ── AVATAR ── */
        .av-wrap{
          position:relative;width:100px;height:100px;flex-shrink:0;
        }
        .av-wrap::before{
          content:'';position:absolute;inset:-3px;
          border-radius:18px;
          background:linear-gradient(135deg,#a78bfa,#38bdf8,#f472b6);
          z-index:0;border-radius:21px;
        }
        .av-inner{
          position:relative;z-index:1;
          width:100px;height:100px;border-radius:18px;
          background:#f5f3ff;
          border:3px solid #fff;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          cursor:pointer;overflow:hidden;transition:all 0.2s;
        }
        .av-inner img{width:100%;height:100%;object-fit:cover;display:block}
        .av-overlay{
          position:absolute;inset:0;background:rgba(124,58,237,0.6);
          display:flex;align-items:center;justify-content:center;
          opacity:0;transition:opacity 0.2s;font-size:22px;border-radius:15px;
        }
        .av-inner:hover .av-overlay{opacity:1}

        /* ── CARD ── */
        .edit-card{
          background:#fff;border-radius:16px;
          border:1px solid #ede9fe;
          box-shadow:0 2px 12px rgba(124,58,237,0.05);
          overflow:hidden;
        }

        /* ── TABS ── */
        .tab-strip{
          background:#fff;border-bottom:2px solid #f3f0ff;
          display:flex;overflow-x:auto;scrollbar-width:none;
          box-shadow:0 2px 8px rgba(124,58,237,0.05);
          position:sticky;top:60px;z-index:50;
        }
        .tab-strip::-webkit-scrollbar{display:none}
        .tab-btn{
          flex-shrink:0;padding:14px 20px;
          font-size:12px;font-weight:600;letter-spacing:0.2px;
          border:none;background:transparent;cursor:pointer;
          color:#9488bc;border-bottom:2.5px solid transparent;margin-bottom:-2px;
          transition:all 0.2s;white-space:nowrap;
          font-family:'DM Sans',sans-serif;
          display:flex;align-items:center;gap:7px;
        }
        .tab-btn.active{color:var(--tc);border-bottom-color:var(--tc)}
        .tab-btn:hover:not(.active){color:#5b4d8a}
        .tab-dot{width:6px;height:6px;border-radius:50%;background:var(--tc);opacity:0;transition:opacity 0.2s;flex-shrink:0}
        .tab-btn.active .tab-dot{opacity:1}

        /* ── INPUTS ── */
        .finput,.fselect,.ftextarea{
          width:100%;padding:11px 14px;
          background:#faf9ff;
          border:1.5px solid #ede9fe;
          border-radius:10px;font-size:13.5px;color:#1e1b2e;
          font-family:'DM Sans',sans-serif;
          outline:none;transition:all 0.18s;appearance:none;
        }
        .finput:focus,.fselect:focus,.ftextarea:focus{
          border-color:rgba(124,58,237,0.5);
          background:#fff;
          box-shadow:0 0 0 3px rgba(124,58,237,0.08);
        }
        .finput::placeholder,.ftextarea::placeholder{color:#c4b5e8}
        .fselect option{background:#fff;color:#1e1b2e}
        .ftextarea{resize:vertical;min-height:88px;line-height:1.7}

        /* ── BLOOD OPTS ── */
        .blood-opt{
          padding:12px 6px;border-radius:10px;
          border:1.5px solid #ede9fe;cursor:pointer;
          text-align:center;background:#faf9ff;
          transition:all 0.16s;
        }
        .blood-opt:hover{border-color:rgba(220,38,38,0.35);background:#fff5f5}
        .blood-opt.sel{border-color:#dc2626;background:#fff5f5;box-shadow:0 0 0 3px rgba(220,38,38,0.08)}
        .blood-txt{font-family:'Sora',sans-serif;font-size:17px;font-weight:800;color:#dc2626}

        /* ── ELIG OPTS ── */
        .elig-opt{
          flex:1;padding:10px;border-radius:10px;
          border:1.5px solid #ede9fe;background:#faf9ff;
          cursor:pointer;text-align:center;font-size:12px;font-weight:600;
          color:#9488bc;font-family:'DM Sans',sans-serif;transition:all 0.16s;
        }

        /* ── BUTTONS ── */
        .btn-save{
          display:inline-flex;align-items:center;gap:7px;padding:11px 26px;
          background:linear-gradient(135deg,#7c3aed,#6d28d9);color:#fff;
          border:none;border-radius:8px;font-size:13px;font-weight:700;
          cursor:pointer;font-family:'DM Sans',sans-serif;
          transition:all 0.2s;box-shadow:0 2px 10px rgba(124,58,237,0.3);
        }
        .btn-save:hover{background:linear-gradient(135deg,#6d28d9,#5b21b6);transform:translateY(-1px);box-shadow:0 6px 20px rgba(124,58,237,0.4)}
        .btn-save:disabled{opacity:0.55;cursor:not-allowed;transform:none;box-shadow:none}
        .btn-cancel{
          display:inline-flex;align-items:center;gap:6px;padding:11px 20px;
          background:#fff;border:1.5px solid #ede9fe;border-radius:8px;
          color:#9488bc;font-size:13px;font-weight:600;
          cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;
        }
        .btn-cancel:hover{border-color:#c4b5e8;color:#7c3aed}

        /* ── SAVE BAR ── */
        .save-bar{
          position:sticky;bottom:0;z-index:50;
          background:rgba(255,255,255,0.95);
          backdrop-filter:blur(16px);
          border-top:1px solid #ede9fe;
          padding:14px 24px;
          display:flex;justify-content:flex-end;gap:10px;
          box-shadow:0 -4px 20px rgba(124,58,237,0.06);
        }

        /* ── GPS BTN ── */
        .gps-btn{
          width:100%;padding:12px;
          background:linear-gradient(135deg,#f0f9ff,#e0f2fe);
          border:1.5px solid #bae6fd;border-radius:10px;
          color:#0891b2;font-size:13px;font-weight:700;
          cursor:pointer;font-family:'DM Sans',sans-serif;
          display:flex;align-items:center;justify-content:center;gap:8px;
          transition:all 0.2s;margin-bottom:12px;
        }
        .gps-btn:hover{background:linear-gradient(135deg,#e0f2fe,#bae6fd);border-color:#7dd3fc;box-shadow:0 4px 14px rgba(8,145,178,0.15)}
        .gps-btn:disabled{opacity:0.6;cursor:not-allowed}

        /* ── ALERTS ── */
        .alert-ok{padding:12px 16px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;font-size:13px;color:#15803d;margin-bottom:14px;display:flex;align-items:center;gap:8px;font-weight:500}
        .alert-err{padding:12px 16px;background:#fff5f5;border:1px solid #fecaca;border-radius:10px;font-size:13px;color:#dc2626;margin-bottom:14px;display:flex;align-items:center;gap:8px;font-weight:500}

        /* ── GRID ── */
        .g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}

        @media(max-width:600px){
          .g2,.g3{grid-template-columns:1fr}
          .edit-nav{padding:0 16px}
          .main-pad{padding:14px 12px 0!important}
        }
      `}</style>

      {/* ── TOP NAV ── */}
      <nav className="edit-nav">
        <button onClick={() => router.push('/dashboard/profile')}
          style={{ display:'flex',alignItems:'center',gap:6,background:'transparent',border:'none',color:'#7c3aed',fontSize:12,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontWeight:600 }}>
          ← Profile
        </button>
        <span className="nav-brand">Edit Profile</span>
        <div style={{ padding:'5px 14px', background:'#f5f3ff', border:'1px solid #ede9fe', borderRadius:20, fontSize:11, fontWeight:700, color:currentTabObj.color, letterSpacing:0.5 }}>
          {currentTabObj.label}
        </div>
      </nav>

      <div className="main-pad" style={{ maxWidth:740, margin:'0 auto', padding:'20px 16px 0' }}>
        <form onSubmit={handleSubmit}>

          {/* ── HERO HEADER ── */}
          <div className="edit-card a1" style={{ padding:'24px', marginBottom:14, display:'flex', alignItems:'center', gap:20 }}>
            {/* Avatar */}
            <div className="av-wrap">
              <div className="av-inner" onClick={() => fileInputRef.current?.click()}>
                {preview
                  ? <><img src={preview} alt="preview" /><div className="av-overlay">📷</div></>
                  : <>
                    <span style={{ fontSize:28, marginBottom:4 }}>📷</span>
                    <span style={{ fontSize:10, color:'#c4b5e8', fontWeight:600, letterSpacing:0.5 }}>Upload</span>
                    <div className="av-overlay">📷</div>
                  </>
                }
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} style={{ display:'none' }} />

            {/* Info */}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:800, color:'#1e1b2e', marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {form.fullName || userName}
              </div>
              {form.fullNameBn && (
                <div style={{ fontFamily:"'Noto Serif Bengali',serif", fontSize:15, color:'#7c3aed', marginBottom:5, fontWeight:600 }}>{form.fullNameBn}</div>
              )}
              <div style={{ fontSize:12, color:'#9488bc', marginBottom:8 }}>✉ {session?.user?.email}</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                {TABS.map(t => (
                  <button key={t.id} type="button"
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      padding:'4px 10px', borderRadius:20, fontSize:10, fontWeight:700,
                      border:`1px solid ${activeTab === t.id ? t.color : '#ede9fe'}`,
                      background: activeTab === t.id ? t.color : '#faf9ff',
                      color: activeTab === t.id ? '#fff' : '#9488bc',
                      cursor:'pointer', transition:'all 0.15s', fontFamily:"'DM Sans',sans-serif",
                    }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── ALERTS ── */}
          {success && <div className="alert-ok a2">✅ {success}</div>}
          {error && <div className="alert-err a2">⚠️ {error}</div>}

          {/* ── TAB STRIP ── */}
          <div className="tab-strip a2">
            {TABS.map(t => (
              <button key={t.id} type="button"
                className={`tab-btn${activeTab === t.id ? ' active' : ''}`}
                style={{ '--tc': t.color }}
                onClick={() => setActiveTab(t.id)}>
                <span className="tab-dot" style={{ '--tc': t.color }} />
                {t.label}
              </button>
            ))}
          </div>

          {/* ── TAB CONTENT ── */}
          <div className="edit-card tab-content a3" style={{ padding:'24px', marginTop:0, borderTopLeftRadius:0, borderTopRightRadius:0, borderTop:'none' }} key={activeTab}>

            {/* ══ BASIC ══ */}
            {activeTab === 'basic' && (
              <div>
                <SH icon="👤" label="Basic Information" color="#7c3aed" bg="#ede9fe" />
                <div className="g2">
                  <FL label="পূর্ণ নাম" required>
                    <input className="finput" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" required />
                  </FL>
                  <FL label="বাংলা নাম">
                    <input className="finput" name="fullNameBn" value={form.fullNameBn} onChange={handleChange} placeholder="তোমার নাম" style={{ fontFamily:"'Noto Serif Bengali',serif" }} />
                  </FL>
                </div>
                <div className="g2">
                  <FL label="লিঙ্গ">
                    <select className="fselect" name="gender" value={form.gender} onChange={handleChange}>
                      <option value="">Select করো</option>
                      <option value="male">পুরুষ</option>
                      <option value="female">মহিলা</option>
                      <option value="other">অন্যান্য</option>
                    </select>
                  </FL>
                  <FL label="জন্ম তারিখ">
                    <input className="finput" type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
                  </FL>
                </div>
                <div className="g2">
                  <FL label="Member Type">
                    <select className="fselect" name="memberType" value={form.memberType} onChange={handleChange}>
                      <option value="general">General Member</option>
                      <option value="life">Life Member</option>
                      <option value="honorary">Honorary Member</option>
                    </select>
                  </FL>
                  <FL label="Member Since">
                    <input className="finput" type="date" name="memberSince" value={form.memberSince} onChange={handleChange} />
                  </FL>
                </div>
                <FL label="Committee Position">
                  <input className="finput" name="committeePosition" value={form.committeePosition} onChange={handleChange} placeholder="সভাপতি, সম্পাদক, সদস্য..." />
                </FL>
              </div>
            )}

            {/* ══ CONTACT ══ */}
            {activeTab === 'contact' && (
              <div>
                <SH icon="📍" label="Contact & Address" color="#0891b2" bg="#e0f2fe" />
                <FL label="বর্তমান ঠিকানা">
                  <textarea className="ftextarea" name="presentAddress" value={form.presentAddress} onChange={handleChange} placeholder="তোমার বর্তমান ঠিকানা" rows={3} />
                </FL>
                <FL label="স্থায়ী ঠিকানা">
                  <textarea className="ftextarea" name="permanentAddress" value={form.permanentAddress} onChange={handleChange} placeholder="তোমার স্থায়ী ঠিকানা" rows={3} />
                </FL>
                <div className="g2">
                  <FL label="জেলা">
                    <select className="fselect" name="district" value={form.district} onChange={handleChange}>
                      <option value="">জেলা select করো</option>
                      {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </FL>
                  <FL label="উপজেলা">
                    <input className="finput" name="upazila" value={form.upazila} onChange={handleChange} placeholder="উপজেলার নাম" />
                  </FL>
                </div>
                <div className="g2">
                  <FL label="Alternative Mobile">
                    <input className="finput" name="alternativeMobile" value={form.alternativeMobile} onChange={handleChange} placeholder="01XXXXXXXXX" />
                  </FL>
                  <FL label="WhatsApp">
                    <input className="finput" name="whatsAppNumber" value={form.whatsAppNumber} onChange={handleChange} placeholder="01XXXXXXXXX" />
                  </FL>
                </div>
                <FL label="Facebook Link">
                  <input className="finput" name="facebookLink" value={form.facebookLink} onChange={handleChange} placeholder="https://facebook.com/yourname" />
                </FL>

                {/* Location Picker */}
                <SH icon="🗺️" label="Location Picker" color="#0891b2" bg="#e0f2fe" />

                <div style={{ padding:'12px 16px', background:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:10, marginBottom:14, fontSize:12, color:'#0891b2', lineHeight:1.75, fontWeight:500 }}>
                  💡 Map এ <strong>click</strong> করলে location select হবে। Marker <strong>drag</strong> করেও সরাতে পারবে।
                </div>

                <button type="button" className="gps-btn" disabled={gpsLoading} onClick={handleGPS}>
                  {gpsLoading
                    ? <span style={{ width:16,height:16,border:'2px solid #bae6fd',borderTopColor:'#0891b2',borderRadius:'50%',animation:'spin 0.8s linear infinite',display:'inline-block' }} />
                    : '📡'
                  }
                  {gpsLoading ? 'Location নেওয়া হচ্ছে...' : 'আমার Current Location নাও'}
                </button>

                {form.latitude && form.longitude && (
                  <div style={{ padding:'12px 16px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:10, marginBottom:12, display:'flex', alignItems:'center', gap:12 }}>
                    <span style={{ fontSize:22 }}>📍</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, color:'#15803d', fontWeight:700, marginBottom:2 }}>Location Selected ✅</div>
                      <div style={{ fontSize:11, color:'#4ade80', fontFamily:'monospace' }}>{Number(form.latitude).toFixed(6)}, {Number(form.longitude).toFixed(6)}</div>
                      {form.locationDms && <div style={{ fontSize:11, color:'#86efac' }}>{form.locationDms}</div>}
                    </div>
                    <button type="button"
                      onClick={() => setForm(p => ({ ...p, latitude:'', longitude:'', locationDms:'' }))}
                      style={{ background:'#fff5f5', border:'1px solid #fecaca', borderRadius:7, padding:'5px 12px', color:'#dc2626', fontSize:12, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontWeight:600, flexShrink:0 }}>
                      ✕ Clear
                    </button>
                  </div>
                )}

                <div style={{ borderRadius:12, overflow:'hidden', border:'1.5px solid #ede9fe', marginBottom:14, boxShadow:'0 4px 16px rgba(124,58,237,0.08)' }}>
                  <iframe id="map-frame" srcDoc={MAP_HTML(mapLat, mapLng, hasLoc)} width="100%" height="280" style={{ display:'block',border:'none' }} title="Location Picker Map" />
                </div>

                {/* Manual inputs */}
                <div style={{ background:'#faf9ff', borderRadius:12, padding:'16px', border:'1px solid #ede9fe' }}>
                  <div style={{ fontSize:10, fontWeight:700, color:'#9488bc', letterSpacing:1.8, textTransform:'uppercase', marginBottom:12 }}>Manual Coordinates</div>
                  <div className="g3">
                    <FL label="Latitude">
                      <input className="finput" type="number" step="any" name="latitude" value={form.latitude}
                        onChange={(e) => {
                          handleChange(e)
                          if (e.target.value && form.longitude) {
                            document.getElementById('map-frame')?.contentWindow?.postMessage({ type:'FLY', lat:parseFloat(e.target.value), lng:parseFloat(form.longitude) }, '*')
                          }
                        }} placeholder="23.8103" />
                    </FL>
                    <FL label="Longitude">
                      <input className="finput" type="number" step="any" name="longitude" value={form.longitude}
                        onChange={(e) => {
                          handleChange(e)
                          if (form.latitude && e.target.value) {
                            document.getElementById('map-frame')?.contentWindow?.postMessage({ type:'FLY', lat:parseFloat(form.latitude), lng:parseFloat(e.target.value) }, '*')
                          }
                        }} placeholder="90.4125" />
                    </FL>
                    <FL label="DMS">
                      <input className="finput" name="locationDms" value={form.locationDms} readOnly placeholder="Auto fill" style={{ opacity:0.5, cursor:'not-allowed' }} />
                    </FL>
                  </div>
                </div>
              </div>
            )}

            {/* ══ EDUCATION ══ */}
            {activeTab === 'education' && (
              <div>
                <SH icon="🏫" label="School" color="#059669" bg="#dcfce7" />
                <div className="g2">
                  <FL label="স্কুলের নাম">
                    <input className="finput" name="schoolName" value={form.schoolName} onChange={handleChange} placeholder="স্কুলের পূর্ণ নাম" />
                  </FL>
                  <FL label="Group">
                    <input className="finput" name="schoolGroup" value={form.schoolGroup} onChange={handleChange} placeholder="বিজ্ঞান / মানবিক" />
                  </FL>
                </div>
                <div style={{ maxWidth:200 }}>
                  <FL label="Passing Year">
                    <input className="finput" type="number" name="schoolPassingYear" value={form.schoolPassingYear} onChange={handleChange} placeholder="2018" />
                  </FL>
                </div>

                <SH icon="🏛️" label="College" color="#d97706" bg="#fef9c3" />
                <div className="g2">
                  <FL label="কলেজের নাম">
                    <input className="finput" name="collegeName" value={form.collegeName} onChange={handleChange} placeholder="কলেজের পূর্ণ নাম" />
                  </FL>
                  <FL label="বিভাগ">
                    <select className="fselect" name="collegeGroup" value={form.collegeGroup} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="science">বিজ্ঞান</option>
                      <option value="arts">মানবিক</option>
                      <option value="commerce">বাণিজ্য</option>
                    </select>
                  </FL>
                </div>
                <div style={{ maxWidth:200 }}>
                  <FL label="Passing Year">
                    <input className="finput" type="number" name="collegePassingYear" value={form.collegePassingYear} onChange={handleChange} placeholder="2020" />
                  </FL>
                </div>

                <SH icon="🎓" label="University" color="#7c3aed" bg="#ede9fe" />
                <div className="g2">
                  <FL label="University">
                    <input className="finput" name="universityName" value={form.universityName} onChange={handleChange} placeholder="University name" />
                  </FL>
                  <FL label="Department">
                    <input className="finput" name="department" value={form.department} onChange={handleChange} placeholder="CSE, EEE, BBA..." />
                  </FL>
                </div>
                <div className="g3">
                  <FL label="Student ID">
                    <input className="finput" name="studentId" value={form.studentId} onChange={handleChange} placeholder="2021-1-60-XXX" />
                  </FL>
                  <FL label="Year">
                    <select className="fselect" name="currentYear" value={form.currentYear} onChange={handleChange}>
                      <option value="">Select</option>
                      {[1,2,3,4,5].map(y => <option key={y} value={y}>{y}ম বর্ষ</option>)}
                    </select>
                  </FL>
                  <FL label="Semester">
                    <select className="fselect" name="currentSemester" value={form.currentSemester} onChange={handleChange}>
                      <option value="">Select</option>
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(s => <option key={s} value={s}>{s}ম</option>)}
                    </select>
                  </FL>
                </div>
              </div>
            )}

            {/* ══ BLOOD ══ */}
            {activeTab === 'blood' && (
              <div>
                <SH icon="🩸" label="Blood Information" color="#dc2626" bg="#fee2e2" />
                <FL label="Blood Group">
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginTop:4 }}>
                    {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => (
                      <div key={bg} className={`blood-opt${form.bloodGroup === bg ? ' sel' : ''}`} onClick={() => setForm(p => ({ ...p, bloodGroup:bg }))}>
                        <div className="blood-txt">{bg}</div>
                      </div>
                    ))}
                  </div>
                </FL>

                <FL label="Donation Eligibility">
                  <div style={{ display:'flex', gap:8 }}>
                    {[
                      { v:'eligible',     l:'✅ Eligible',    ac:'#15803d', bg:'#f0fdf4', bc:'#bbf7d0' },
                      { v:'not_eligible', l:'❌ Not Eligible', ac:'#dc2626', bg:'#fff5f5', bc:'#fecaca' },
                      { v:'unknown',      l:'❓ জানি না',     ac:'#9488bc', bg:'#faf9ff', bc:'#ede9fe' },
                    ].map(opt => (
                      <div key={opt.v} className="elig-opt"
                        onClick={() => setForm(p => ({ ...p, donationEligibility:opt.v }))}
                        style={{
                          border: `1.5px solid ${form.donationEligibility === opt.v ? opt.bc : '#ede9fe'}`,
                          background: form.donationEligibility === opt.v ? opt.bg : '#faf9ff',
                          color: form.donationEligibility === opt.v ? opt.ac : '#9488bc',
                          fontWeight: form.donationEligibility === opt.v ? 700 : 500,
                          boxShadow: form.donationEligibility === opt.v ? `0 0 0 3px ${opt.bc}55` : 'none',
                        }}>
                        {opt.l}
                      </div>
                    ))}
                  </div>
                </FL>

                <div className="g2">
                  <FL label="Last Donation">
                    <input className="finput" type="date" name="lastDonationDate" value={form.lastDonationDate} onChange={handleChange} />
                  </FL>
                  <FL label="Next Available">
                    <input className="finput" type="date" name="nextAvailableDonationDate" value={form.nextAvailableDonationDate} onChange={handleChange} />
                  </FL>
                </div>
                <div className="g2">
                  <FL label="Total Donations (বার)">
                    <input className="finput" type="number" min="0" name="totalDonationCount" value={form.totalDonationCount} onChange={handleChange} placeholder="0" />
                  </FL>
                  <FL label="Preferred Location">
                    <input className="finput" name="preferredDonationLocation" value={form.preferredDonationLocation} onChange={handleChange} placeholder="DMCH, CMH..." />
                  </FL>
                </div>
              </div>
            )}

            {/* ══ BIO ══ */}
            {activeTab === 'bio' && (
              <div>
                <SH icon="✍️" label="Personal Bio" color="#be185d" bg="#fce7f3" />
                <FL label="Short Bio">
                  <textarea className="ftextarea" name="shortBio" value={form.shortBio} onChange={handleChange} placeholder="নিজের সম্পর্কে সংক্ষিপ্ত পরিচয় লেখো..." rows={4} />
                  <span style={{ fontSize:10, color:'#c4b5e8', marginTop:5, display:'block', textAlign:'right' }}>{form.shortBio.length} / 500</span>
                </FL>
                <FL label="কেন HPCAA তে join করলে?">
                  <textarea className="ftextarea" name="whyJoined" value={form.whyJoined} onChange={handleChange} placeholder="তোমার কারণ শেয়ার করো..." rows={3} />
                </FL>
                <FL label="Future Goals">
                  <textarea className="ftextarea" name="futureGoals" value={form.futureGoals} onChange={handleChange} placeholder="তোমার ভবিষ্যৎ লক্ষ্য লেখো..." rows={3} />
                </FL>
                <FL label="Hobbies & Interests">
                  <input className="finput" name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="Reading, Coding, Photography..." />
                </FL>
              </div>
            )}

            {/* ══ SOCIAL ══ */}
            {activeTab === 'social' && (
              <div>
                <SH icon="🔗" label="Social & Online" color="#059669" bg="#dcfce7" />
                <FL label="Facebook Profile">
                  <div style={{ position:'relative' }}>
                    <span style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', fontSize:16 }}>📘</span>
                    <input className="finput" name="facebook" value={form.facebook} onChange={handleChange} placeholder="https://facebook.com/yourprofile" style={{ paddingLeft:40 }} />
                  </div>
                </FL>
                <FL label="Portfolio / Website">
                  <div style={{ position:'relative' }}>
                    <span style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', fontSize:16 }}>🌐</span>
                    <input className="finput" name="portfolioWebsite" value={form.portfolioWebsite} onChange={handleChange} placeholder="https://yourwebsite.com" style={{ paddingLeft:40 }} />
                  </div>
                </FL>
                <div style={{ marginTop:16, padding:'16px', background:'#f0fdf4', borderRadius:12, border:'1px solid #bbf7d0' }}>
                  <p style={{ fontSize:12, color:'#15803d', lineHeight:1.75, fontWeight:500 }}>
                    💡 Social links দিলে অন্য alumni-রা তোমার সাথে সহজে যোগাযোগ করতে পারবে।
                  </p>
                </div>

                {/* Tab navigator hint */}
                <div style={{ marginTop:20, padding:'16px', background:'#faf9ff', borderRadius:12, border:'1px solid #ede9fe' }}>
                  <div style={{ fontSize:10, fontWeight:700, color:'#9488bc', letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>সব Section পূরণ করেছো?</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                    {TABS.map(t => (
                      <button key={t.id} type="button"
                        onClick={() => setActiveTab(t.id)}
                        style={{
                          padding:'6px 14px', borderRadius:20, fontSize:11, fontWeight:700,
                          border:`1px solid ${t.color}30`,
                          background:`${t.color}10`, color:t.color,
                          cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
                          transition:'all 0.15s',
                        }}>
                        {t.label} →
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ── SAVE BAR ── */}
          <div className="save-bar">
            <button type="button" className="btn-cancel" onClick={() => router.push('/dashboard/profile')}>বাতিল</button>
            <button type="submit" className="btn-save" disabled={saving}>
              {saving
                ? <><span style={{ width:14,height:14,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin 0.7s linear infinite',display:'inline-block' }} /> Save হচ্ছে...</>
                : '💾 Save করো'
              }
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}