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
  { id: 'basic', label: 'Basic', icon: '👤' },
  { id: 'contact', label: 'Contact', icon: '📞' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'blood', label: 'Blood', icon: '🩸' },
  { id: 'bio', label: 'Bio', icon: '✍️' },
  { id: 'social', label: 'Social', icon: '🔗' },
]

const MAP_HTML = (lat, lng, hasLoc) => `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"><\/script>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body,#map{width:100%;height:100%;background:#060f06}
  .cm{width:16px;height:16px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#86b369;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.5)}
  .leaflet-popup-content-wrapper{background:#0d1a0d;border:1px solid rgba(134,179,105,0.3);border-radius:10px;color:#e8e4db;font-family:sans-serif}
  .leaflet-popup-tip{background:#0d1a0d}
  .leaflet-popup-content{font-size:12px;line-height:1.6;color:#c8dba8}
  .leaflet-tile{filter:brightness(0.85) saturate(0.8)}
</style>
</head>
<body>
<div id="map"></div>
<script>
  const map = L.map('map',{zoomControl:true}).setView([${lat},${lng}],13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap',maxZoom:19}).addTo(map);

  const icon = L.divIcon({className:'',html:'<div class="cm"></div>',iconSize:[16,16],iconAnchor:[8,16],popupAnchor:[0,-18]});
  let marker=null;

  function place(lat,lng){
    if(marker) map.removeLayer(marker);
    marker=L.marker([lat,lng],{icon,draggable:true}).addTo(map);
    marker.bindPopup('<b>📍 Location</b><br>'+lat.toFixed(6)+', '+lng.toFixed(6)).openPopup();
    marker.on('dragend',function(e){
      const p=e.target.getLatLng();
      window.parent.postMessage({type:'LOC',lat:p.lat,lng:p.lng},'*');
    });
    window.parent.postMessage({type:'LOC',lat,lng},'*');
  }

  if(${hasLoc}) place(${lat},${lng});

  map.on('click',function(e){
    place(e.latlng.lat,e.latlng.lng);
  });

  window.addEventListener('message',function(e){
    if(e.data&&e.data.type==='FLY'){
      place(e.data.lat,e.data.lng);
      map.flyTo([e.data.lat,e.data.lng],15);
    }
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

  // Map postMessage listener — contact tab এ attach করো
  useEffect(() => {
    if (activeTab !== 'contact') return

    const handler = async (event) => {
      if (event.data?.type === 'LOC') {
        await updateLocation(event.data.lat, event.data.lng, setForm)
      }
    }

    window.addEventListener('message', handler)
    mapListenerRef.current = handler

    return () => {
      window.removeEventListener('message', handler)
    }
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
        // Map এ fly করো
        document.getElementById('map-frame')?.contentWindow?.postMessage(
          { type: 'FLY', lat, lng }, '*'
        )
        setGpsLoading(false)
      },
      (err) => {
        alert('Location permission দাও: Settings > Browser > Location')
        setGpsLoading(false)
      },
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
    <div style={{ minHeight: '100vh', background: '#060f06', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <div style={{ position: 'relative', width: 56, height: 56 }}>
        <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(134,179,105,0.12)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', inset: 0, border: '2px solid transparent', borderTopColor: '#86b369', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
      </div>
      <p style={{ color: 'rgba(134,179,105,0.5)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui' }}>Loading</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  const userName = session?.user?.name || 'Alumni'
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const currentTab = TABS.find(t => t.id === activeTab)
  const mapLat = form.latitude || 23.8103
  const mapLng = form.longitude || 90.4125
  const hasLoc = !!form.latitude

  return (
    <div style={{ minHeight: '100vh', background: '#060f06', color: '#e8e4db', fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600&family=Noto+Serif+Bengali:wght@500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
        .ani{animation:fadeUp 0.4s ease both}
        .glass{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:18px}
        .tab-nav{display:flex;gap:3px;overflow-x:auto;padding:5px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:16px;scrollbar-width:none}
        .tab-nav::-webkit-scrollbar{display:none}
        .tab-btn{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:3px;padding:9px 14px;border:none;border-radius:12px;cursor:pointer;background:transparent;color:rgba(255,255,255,0.28);font-family:'Outfit',sans-serif;font-size:10px;font-weight:500;letter-spacing:0.4px;transition:all 0.18s}
        .tab-btn.active{background:rgba(134,179,105,0.12);color:#86b369;border:1px solid rgba(134,179,105,0.18)}
        .tab-btn:hover:not(.active){background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.55)}
        .tab-icon{font-size:17px}
        .flabel{display:block;font-size:10px;font-weight:700;color:rgba(134,179,105,0.5);letter-spacing:1.4px;text-transform:uppercase;margin-bottom:7px}
        .flabel .req{color:#f87171;margin-left:3px}
        .finput,.fselect,.ftextarea{width:100%;padding:12px 14px;background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.08);border-radius:11px;font-size:14px;color:#e8e4db;font-family:'Outfit',sans-serif;outline:none;transition:all 0.18s;appearance:none}
        .finput:focus,.fselect:focus,.ftextarea:focus{border-color:rgba(134,179,105,0.5);background:rgba(134,179,105,0.05);box-shadow:0 0 0 3px rgba(134,179,105,0.08)}
        .finput::placeholder,.ftextarea::placeholder{color:rgba(255,255,255,0.15)}
        .fselect option{background:#0c1a0c;color:#e8e4db}
        .ftextarea{resize:vertical;min-height:88px;line-height:1.65}
        .fg{margin-bottom:16px}
        .fr{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .fr3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
        .sh{display:flex;align-items:center;gap:9px;margin-bottom:16px;margin-top:22px;padding-bottom:10px;border-bottom:1px solid rgba(134,179,105,0.1)}
        .sh:first-child{margin-top:0}
        .sh-icon{width:30px;height:30px;border-radius:9px;background:rgba(134,179,105,0.1);border:1px solid rgba(134,179,105,0.18);display:flex;align-items:center;justify-content:center;font-size:14px}
        .sh-text{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:700;color:#c8dba8;letter-spacing:0.3px}
        .av-zone{width:96px;height:96px;border-radius:50%;flex-shrink:0;border:2px dashed rgba(134,179,105,0.3);background:rgba(134,179,105,0.05);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;overflow:hidden;position:relative}
        .av-zone:hover{border-color:rgba(134,179,105,0.6);background:rgba(134,179,105,0.1)}
        .av-zone img{width:100%;height:100%;object-fit:cover}
        .av-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.18s;font-size:18px}
        .av-zone:hover .av-overlay{opacity:1}
        .btn-save{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;background:linear-gradient(135deg,#2a4d2a,#1a3a1a);color:#c8e6a8;border:1px solid rgba(134,179,105,0.3);border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.2s}
        .btn-save:hover{background:linear-gradient(135deg,#3a6d3a,#2a4d2a);transform:translateY(-1px);box-shadow:0 6px 20px rgba(134,179,105,0.2)}
        .btn-save:disabled{opacity:0.5;cursor:not-allowed;transform:none;box-shadow:none}
        .btn-cancel{display:inline-flex;align-items:center;gap:6px;padding:13px 22px;background:transparent;color:rgba(255,255,255,0.35);border:1.5px solid rgba(255,255,255,0.08);border-radius:12px;font-size:14px;cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.2s}
        .btn-cancel:hover{border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.6)}
        .alert-ok{padding:12px 16px;background:rgba(134,179,105,0.08);border:1px solid rgba(134,179,105,0.2);border-radius:10px;font-size:13px;color:#86b369;margin-bottom:16px;display:flex;align-items:center;gap:8px}
        .alert-err{padding:12px 16px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.2);border-radius:10px;font-size:13px;color:#f87171;margin-bottom:16px;display:flex;align-items:center;gap:8px}
        .blood-opt{padding:12px 8px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.07);cursor:pointer;text-align:center;background:rgba(255,255,255,0.02);transition:all 0.16s}
        .blood-opt:hover{border-color:rgba(220,38,38,0.35);background:rgba(220,38,38,0.06)}
        .blood-opt.sel{border-color:#ef4444;background:rgba(220,38,38,0.12)}
        .blood-txt{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:#f87171}
        .elig-opt{flex:1;padding:11px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.07);background:transparent;cursor:pointer;text-align:center;font-size:12px;color:#e8e4db;font-family:'Outfit',sans-serif;transition:all 0.16s}
        .save-bar{position:sticky;bottom:0;z-index:50;background:rgba(6,15,6,0.95);backdrop-filter:blur(16px);border-top:1px solid rgba(255,255,255,0.06);padding:14px 20px;display:flex;justify-content:flex-end;gap:10px}
        .gps-btn{width:100%;padding:13px;background:linear-gradient(135deg,rgba(134,179,105,0.14),rgba(134,179,105,0.06));border:1.5px solid rgba(134,179,105,0.28);border-radius:12px;color:#86b369;font-size:14px;font-weight:600;cursor:pointer;font-family:'Outfit',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;transition:all 0.2s;margin-bottom:12px}
        .gps-btn:hover{background:linear-gradient(135deg,rgba(134,179,105,0.22),rgba(134,179,105,0.1));border-color:rgba(134,179,105,0.5)}
        .gps-btn:disabled{opacity:0.6;cursor:not-allowed}
        @media(max-width:600px){.fr,.fr3{grid-template-columns:1fr}.tab-btn{padding:8px 12px}}
      `}</style>

      {/* Sticky Top Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(6,15,6,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(134,179,105,0.1)', padding: '13px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.push('/dashboard/profile')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: 'rgba(134,179,105,0.65)', fontSize: 13, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>
          ← Profile
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14, color: 'rgba(134,179,105,0.45)', fontStyle: 'italic' }}>Edit Profile</span>
          <span style={{ fontSize: 11, padding: '3px 10px', background: 'rgba(134,179,105,0.1)', color: 'rgba(134,179,105,0.6)', borderRadius: 20, border: '1px solid rgba(134,179,105,0.15)' }}>
            {currentTab?.icon} {currentTab?.label}
          </span>
        </div>
        <div style={{ width: 60 }} />
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '20px 16px 0' }}>
        <form onSubmit={handleSubmit}>

          {/* Hero Header */}
          <div className="glass ani" style={{ padding: '22px 20px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 18 }}>
            <div>
              <div className="av-zone" onClick={() => fileInputRef.current?.click()}>
                {preview
                  ? <><img src={preview} alt="preview" /><div className="av-overlay">📷</div></>
                  : <><span style={{ fontSize: 26 }}>📷</span><span style={{ fontSize: 10, color: 'rgba(134,179,105,0.5)', marginTop: 4 }}>Upload</span><div className="av-overlay">📷</div></>
                }
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 6 }}>Tap to change</p>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 700, color: '#e8e4db', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {form.fullName || userName}
              </div>
              {form.fullNameBn && <div style={{ fontFamily: 'Noto Serif Bengali, serif', fontSize: 15, color: 'rgba(134,179,105,0.7)', marginBottom: 6, fontWeight: 600 }}>{form.fullNameBn}</div>}
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>📧 {session?.user?.email}</div>
              <div style={{ fontSize: 11, color: 'rgba(134,179,105,0.4)', marginTop: 6 }}>প্রতিটা tab এ গিয়ে তথ্য দাও</div>
            </div>
          </div>

          {success && <div className="alert-ok">✅ {success}</div>}
          {error && <div className="alert-err">⚠️ {error}</div>}

          {/* Tab Nav */}
          <div className="tab-nav" style={{ marginBottom: 14 }}>
            {TABS.map(tab => (
              <button key={tab.id} type="button" className={`tab-btn${activeTab === tab.id ? ' active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                <span className="tab-icon">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="glass" style={{ padding: '22px 20px', animation: 'slideIn 0.3s ease both' }} key={activeTab}>

            {/* BASIC */}
            {activeTab === 'basic' && (
              <div>
                <div className="sh"><div className="sh-icon">👤</div><span className="sh-text">Basic Information</span></div>
                <div className="fr">
                  <div className="fg"><label className="flabel">পূর্ণ নাম <span className="req">*</span></label><input className="finput" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" required /></div>
                  <div className="fg"><label className="flabel">বাংলা নাম</label><input className="finput" name="fullNameBn" value={form.fullNameBn} onChange={handleChange} placeholder="তোমার নাম" style={{ fontFamily: 'Noto Serif Bengali, serif' }} /></div>
                </div>
                <div className="fr">
                  <div className="fg"><label className="flabel">লিঙ্গ</label>
                    <select className="fselect" name="gender" value={form.gender} onChange={handleChange}>
                      <option value="">Select করো</option>
                      <option value="male">পুরুষ</option>
                      <option value="female">মহিলা</option>
                      <option value="other">অন্যান্য</option>
                    </select>
                  </div>
                  <div className="fg"><label className="flabel">জন্ম তারিখ</label><input className="finput" type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} /></div>
                </div>
                <div className="fr">
                  <div className="fg"><label className="flabel">Member Type</label>
                    <select className="fselect" name="memberType" value={form.memberType} onChange={handleChange}>
                      <option value="general">General Member</option>
                      <option value="life">Life Member</option>
                      <option value="honorary">Honorary Member</option>
                    </select>
                  </div>
                  <div className="fg"><label className="flabel">Member Since</label><input className="finput" type="date" name="memberSince" value={form.memberSince} onChange={handleChange} /></div>
                </div>
                <div className="fg"><label className="flabel">Committee Position</label><input className="finput" name="committeePosition" value={form.committeePosition} onChange={handleChange} placeholder="সভাপতি, সম্পাদক, সদস্য..." /></div>
              </div>
            )}

            {/* CONTACT */}
            {activeTab === 'contact' && (
              <div>
                <div className="sh"><div className="sh-icon">📞</div><span className="sh-text">Contact Information</span></div>
                <div className="fg"><label className="flabel">বর্তমান ঠিকানা</label><textarea className="ftextarea" name="presentAddress" value={form.presentAddress} onChange={handleChange} placeholder="তোমার বর্তমান ঠিকানা" rows={3} /></div>
                <div className="fg"><label className="flabel">স্থায়ী ঠিকানা</label><textarea className="ftextarea" name="permanentAddress" value={form.permanentAddress} onChange={handleChange} placeholder="তোমার স্থায়ী ঠিকানা" rows={3} /></div>
                <div className="fr">
                  <div className="fg"><label className="flabel">জেলা</label>
                    <select className="fselect" name="district" value={form.district} onChange={handleChange}>
                      <option value="">জেলা select করো</option>
                      {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="fg"><label className="flabel">উপজেলা</label><input className="finput" name="upazila" value={form.upazila} onChange={handleChange} placeholder="উপজেলার নাম" /></div>
                </div>
                <div className="fr">
                  <div className="fg"><label className="flabel">Alternative Mobile</label><input className="finput" name="alternativeMobile" value={form.alternativeMobile} onChange={handleChange} placeholder="01XXXXXXXXX" /></div>
                  <div className="fg"><label className="flabel">WhatsApp</label><input className="finput" name="whatsAppNumber" value={form.whatsAppNumber} onChange={handleChange} placeholder="01XXXXXXXXX" /></div>
                </div>
                <div className="fg"><label className="flabel">Facebook Link</label><input className="finput" name="facebookLink" value={form.facebookLink} onChange={handleChange} placeholder="https://facebook.com/yourname" /></div>

                {/* ── Location Picker ── */}
                <div className="sh" style={{ marginTop: 24 }}>
                  <div className="sh-icon">📍</div>
                  <span className="sh-text">Location Picker</span>
                </div>

                <div style={{ padding: '10px 14px', background: 'rgba(134,179,105,0.05)', borderRadius: 10, border: '1px solid rgba(134,179,105,0.12)', marginBottom: 14, fontSize: 12, color: 'rgba(134,179,105,0.65)', lineHeight: 1.7 }}>
                  💡 Map এ যেকোনো জায়গায় <strong style={{ color: '#86b369' }}>click</strong> করলে সেই location select হবে। Marker টা <strong style={{ color: '#86b369' }}>drag</strong> করেও সরাতে পারবে।
                </div>

                {/* GPS Button */}
                <button type="button" className="gps-btn" disabled={gpsLoading} onClick={handleGPS}>
                  {gpsLoading ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(134,179,105,0.3)', borderTopColor: '#86b369', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} /></> : '📡'}
                  {gpsLoading ? 'Location নেওয়া হচ্ছে...' : 'আমার Current Location নাও'}
                </button>

                {/* Selected preview */}
                {form.latitude && form.longitude && (
                  <div style={{ padding: '10px 14px', background: 'rgba(134,179,105,0.07)', borderRadius: 10, border: '1px solid rgba(134,179,105,0.18)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>📍</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: '#86b369', fontWeight: 600 }}>Location Selected ✅</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{Number(form.latitude).toFixed(6)}, {Number(form.longitude).toFixed(6)}</div>
                      {form.locationDms && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{form.locationDms}</div>}
                    </div>
                    <button type="button"
                      onClick={() => setForm(p => ({ ...p, latitude: '', longitude: '', locationDms: '' }))}
                      style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 8, padding: '5px 11px', color: '#f87171', fontSize: 12, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', flexShrink: 0 }}>
                      ✕ Clear
                    </button>
                  </div>
                )}

                {/* Leaflet Map */}
                <div style={{ borderRadius: 14, overflow: 'hidden', border: '1.5px solid rgba(134,179,105,0.2)', marginBottom: 14 }}>
                  <iframe
                    id="map-frame"
                    srcDoc={MAP_HTML(mapLat, mapLng, hasLoc)}
                    width="100%"
                    height="300"
                    style={{ display: 'block', border: 'none' }}
                    title="Location Picker Map"
                  />
                </div>

                {/* Manual inputs */}
                <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: 10, color: 'rgba(134,179,105,0.4)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12, fontWeight: 700 }}>Manual Input</div>
                  <div className="fr3">
                    <div className="fg" style={{ marginBottom: 0 }}>
                      <label className="flabel">Latitude</label>
                      <input className="finput" type="number" step="any" name="latitude" value={form.latitude}
                        onChange={(e) => {
                          handleChange(e)
                          if (e.target.value && form.longitude) {
                            document.getElementById('map-frame')?.contentWindow?.postMessage(
                              { type: 'FLY', lat: parseFloat(e.target.value), lng: parseFloat(form.longitude) }, '*'
                            )
                          }
                        }} placeholder="23.8103" />
                    </div>
                    <div className="fg" style={{ marginBottom: 0 }}>
                      <label className="flabel">Longitude</label>
                      <input className="finput" type="number" step="any" name="longitude" value={form.longitude}
                        onChange={(e) => {
                          handleChange(e)
                          if (form.latitude && e.target.value) {
                            document.getElementById('map-frame')?.contentWindow?.postMessage(
                              { type: 'FLY', lat: parseFloat(form.latitude), lng: parseFloat(e.target.value) }, '*'
                            )
                          }
                        }} placeholder="90.4125" />
                    </div>
                    <div className="fg" style={{ marginBottom: 0 }}>
                      <label className="flabel">DMS</label>
                      <input className="finput" name="locationDms" value={form.locationDms} readOnly placeholder="Auto fill" style={{ opacity: 0.5, cursor: 'not-allowed' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EDUCATION */}
            {activeTab === 'education' && (
              <div>
                <div className="sh"><div className="sh-icon">🏫</div><span className="sh-text">School</span></div>
                <div className="fr">
                  <div className="fg"><label className="flabel">স্কুলের নাম</label><input className="finput" name="schoolName" value={form.schoolName} onChange={handleChange} placeholder="স্কুলের পূর্ণ নাম" /></div>
                  <div className="fg"><label className="flabel">Group</label><input className="finput" name="schoolGroup" value={form.schoolGroup} onChange={handleChange} placeholder="বিজ্ঞান / মানবিক" /></div>
                </div>
                <div className="fg" style={{ maxWidth: 160 }}><label className="flabel">Passing Year</label><input className="finput" type="number" name="schoolPassingYear" value={form.schoolPassingYear} onChange={handleChange} placeholder="2018" /></div>
                <div className="sh"><div className="sh-icon">🏛️</div><span className="sh-text">College</span></div>
                <div className="fr">
                  <div className="fg"><label className="flabel">কলেজের নাম</label><input className="finput" name="collegeName" value={form.collegeName} onChange={handleChange} placeholder="কলেজের পূর্ণ নাম" /></div>
                  <div className="fg"><label className="flabel">বিভাগ</label>
                    <select className="fselect" name="collegeGroup" value={form.collegeGroup} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="science">বিজ্ঞান</option>
                      <option value="arts">মানবিক</option>
                      <option value="commerce">বাণিজ্য</option>
                    </select>
                  </div>
                </div>
                <div className="fg" style={{ maxWidth: 160 }}><label className="flabel">Passing Year</label><input className="finput" type="number" name="collegePassingYear" value={form.collegePassingYear} onChange={handleChange} placeholder="2020" /></div>
                <div className="sh"><div className="sh-icon">🎓</div><span className="sh-text">University</span></div>
                <div className="fr">
                  <div className="fg"><label className="flabel">University</label><input className="finput" name="universityName" value={form.universityName} onChange={handleChange} placeholder="University name" /></div>
                  <div className="fg"><label className="flabel">Department</label><input className="finput" name="department" value={form.department} onChange={handleChange} placeholder="CSE, EEE, BBA..." /></div>
                </div>
                <div className="fr3">
                  <div className="fg"><label className="flabel">Student ID</label><input className="finput" name="studentId" value={form.studentId} onChange={handleChange} placeholder="2021-1-60-XXX" /></div>
                  <div className="fg"><label className="flabel">Year</label>
                    <select className="fselect" name="currentYear" value={form.currentYear} onChange={handleChange}>
                      <option value="">Select</option>
                      {[1,2,3,4,5].map(y => <option key={y} value={y}>{y}ম বর্ষ</option>)}
                    </select>
                  </div>
                  <div className="fg"><label className="flabel">Semester</label>
                    <select className="fselect" name="currentSemester" value={form.currentSemester} onChange={handleChange}>
                      <option value="">Select</option>
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(s => <option key={s} value={s}>{s}ম</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* BLOOD */}
            {activeTab === 'blood' && (
              <div>
                <div className="sh"><div className="sh-icon">🩸</div><span className="sh-text">Blood Information</span></div>
                <div className="fg">
                  <label className="flabel">Blood Group</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 4 }}>
                    {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => (
                      <div key={bg} className={`blood-opt${form.bloodGroup === bg ? ' sel' : ''}`} onClick={() => setForm(p => ({ ...p, bloodGroup: bg }))}>
                        <div className="blood-txt">{bg}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="fg">
                  <label className="flabel">Donation Eligibility</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[
                      { v: 'eligible', l: '✅ Eligible', c: '#86b369' },
                      { v: 'not_eligible', l: '❌ Not Eligible', c: '#ef4444' },
                      { v: 'unknown', l: '❓ জানি না', c: '#86b369' },
                    ].map(opt => (
                      <div key={opt.v} className="elig-opt"
                        onClick={() => setForm(p => ({ ...p, donationEligibility: opt.v }))}
                        style={{ border: `1.5px solid ${form.donationEligibility === opt.v ? opt.c : 'rgba(255,255,255,0.07)'}`, background: form.donationEligibility === opt.v ? `rgba(${opt.v === 'not_eligible' ? '220,38,38' : '134,179,105'},0.1)` : 'transparent', color: form.donationEligibility === opt.v ? opt.c : 'rgba(255,255,255,0.4)' }}>
                        {opt.l}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="fr">
                  <div className="fg"><label className="flabel">Last Donation</label><input className="finput" type="date" name="lastDonationDate" value={form.lastDonationDate} onChange={handleChange} /></div>
                  <div className="fg"><label className="flabel">Next Available</label><input className="finput" type="date" name="nextAvailableDonationDate" value={form.nextAvailableDonationDate} onChange={handleChange} /></div>
                </div>
                <div className="fr">
                  <div className="fg"><label className="flabel">Total Donations (বার)</label><input className="finput" type="number" min="0" name="totalDonationCount" value={form.totalDonationCount} onChange={handleChange} placeholder="0" /></div>
                  <div className="fg"><label className="flabel">Preferred Location</label><input className="finput" name="preferredDonationLocation" value={form.preferredDonationLocation} onChange={handleChange} placeholder="DMCH, CMH..." /></div>
                </div>
              </div>
            )}

            {/* BIO */}
            {activeTab === 'bio' && (
              <div>
                <div className="sh"><div className="sh-icon">✍️</div><span className="sh-text">Personal Bio</span></div>
                <div className="fg">
                  <label className="flabel">Short Bio</label>
                  <textarea className="ftextarea" name="shortBio" value={form.shortBio} onChange={handleChange} placeholder="নিজের সম্পর্কে সংক্ষিপ্ত পরিচয় লেখো..." rows={4} />
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 4, display: 'block' }}>{form.shortBio.length} / 500</span>
                </div>
                <div className="fg"><label className="flabel">কেন HPCAA তে join করলে?</label><textarea className="ftextarea" name="whyJoined" value={form.whyJoined} onChange={handleChange} placeholder="তোমার কারণ শেয়ার করো..." rows={3} /></div>
                <div className="fg"><label className="flabel">Future Goals</label><textarea className="ftextarea" name="futureGoals" value={form.futureGoals} onChange={handleChange} placeholder="তোমার ভবিষ্যৎ লক্ষ্য লেখো..." rows={3} /></div>
                <div className="fg"><label className="flabel">Hobbies & Interests</label><input className="finput" name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="Reading, Coding, Photography..." /></div>
              </div>
            )}

            {/* SOCIAL */}
            {activeTab === 'social' && (
              <div>
                <div className="sh"><div className="sh-icon">🔗</div><span className="sh-text">Social & Online</span></div>
                <div className="fg">
                  <label className="flabel">Facebook Profile</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 15 }}>📘</span>
                    <input className="finput" name="facebook" value={form.facebook} onChange={handleChange} placeholder="https://facebook.com/yourprofile" style={{ paddingLeft: 38 }} />
                  </div>
                </div>
                <div className="fg">
                  <label className="flabel">Portfolio / Website</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 15 }}>🌐</span>
                    <input className="finput" name="portfolioWebsite" value={form.portfolioWebsite} onChange={handleChange} placeholder="https://yourwebsite.com" style={{ paddingLeft: 38 }} />
                  </div>
                </div>
                <div style={{ marginTop: 16, padding: '14px 16px', background: 'rgba(134,179,105,0.05)', borderRadius: 12, border: '1px solid rgba(134,179,105,0.12)' }}>
                  <p style={{ fontSize: 12, color: 'rgba(134,179,105,0.6)', lineHeight: 1.7 }}>💡 Social links দিলে অন্য alumni-রা তোমার সাথে সহজে যোগাযোগ করতে পারবে।</p>
                </div>
              </div>
            )}

          </div>

          {/* Sticky Save Bar */}
          <div className="save-bar">
            <button type="button" className="btn-cancel" onClick={() => router.push('/dashboard/profile')}>বাতিল</button>
            <button type="submit" className="btn-save" disabled={saving}>
              {saving ? '⏳ Save হচ্ছে...' : '💾 Save করো'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}