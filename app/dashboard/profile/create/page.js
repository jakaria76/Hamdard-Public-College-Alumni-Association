'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
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
  { id: 'basic',     label: 'Basic',     icon: '🚀', color: '#6366f1' },
  { id: 'contact',   label: 'Contact',   icon: '📍', color: '#06b6d4' },
  { id: 'education', label: 'Education', icon: '🎓', color: '#f59e0b' },
  { id: 'blood',     label: 'Blood',     icon: '🩸', color: '#ef4444' },
  { id: 'bio',       label: 'Bio',       icon: '✍️', color: '#ec4899' },
  { id: 'social',    label: 'Social',    icon: '🌐', color: '#10b981' },
]

const MAP_HTML = (lat, lng, hasLoc) => `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"><\/script>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body,#map{width:100%;height:100%;background:#f8fafc}
  .pw{position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center}
  .p1{position:absolute;width:36px;height:36px;border-radius:50%;background:rgba(99,102,241,0.25);animation:pu 2s ease-out infinite}
  .pd{width:14px;height:14px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#a855f7);border:3px solid #fff;box-shadow:0 0 15px rgba(99,102,241,0.6);z-index:2;position:relative}
  @keyframes pu{0%{transform:scale(0.5);opacity:1}100%{transform:scale(3);opacity:0}}
  .leaflet-popup-content-wrapper{border-radius:12px;box-shadow:0 10px 25px rgba(0,0,0,0.1)}
</style>
</head>
<body>
<div id="map"></div>
<script>
  const map = L.map('map',{zoomControl:true}).setView([${lat},${lng}],13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  const icon = L.divIcon({className:'',html:'<div class="pw"><div class="p1"></div><div class="pd"></div></div>',iconSize:[36,36],iconAnchor:[18,18],popupAnchor:[0,-20]});
  let marker=null;
  function place(lat,lng){
    if(marker) map.removeLayer(marker);
    marker=L.marker([lat,lng],{icon,draggable:true}).addTo(map);
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
          ...p,
          memberSince: p.memberSince ? p.memberSince.split('T')[0] : '',
          dateOfBirth: p.dateOfBirth ? p.dateOfBirth.split('T')[0] : '',
          lastDonationDate: p.lastDonationDate ? p.lastDonationDate.split('T')[0] : '',
          nextAvailableDonationDate: p.nextAvailableDonationDate ? p.nextAvailableDonationDate.split('T')[0] : '',
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
      () => { alert('Location permission দিন'); setGpsLoading(false) },
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
      if (!res.ok) setError(data.error || 'সমস্যা হয়েছে')
      else {
        setSuccess('Profile আপডেট সফল!')
        setTimeout(() => router.push('/dashboard/profile'), 1400)
      }
    } catch { setError('Server error হয়েছে') }
    finally { setSaving(false) }
  }

  if (status === 'loading' || loading) return (
    <div style={{ minHeight:'100vh', background:'#0f172a', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20 }}>
      <div style={{ width:50,height:50,borderRadius:'50%',border:'4px solid #1e293b',borderTopColor:'#6366f1',animation:'spin 1s linear infinite' }} />
      <p style={{ color:'#94a3b8',fontSize:14,fontWeight:500,letterSpacing:2 }}>INITIALIZING...</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  const mapLat = form.latitude || 23.8103
  const mapLng = form.longitude || 90.4125
  const hasLoc = !!form.latitude

  // Sub-components
  const FL = ({ label, children }) => (
    <div style={{ marginBottom:20 }}>
      <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#64748b', letterSpacing:1.2, textTransform:'uppercase', marginBottom:8 }}>{label}</label>
      {children}
    </div>
  )

  const SectionHeader = ({ icon, label, color }) => (
    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:25, marginTop:10 }}>
      <div style={{ width:38, height:38, borderRadius:12, background:`${color}15`, color:color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>{icon}</div>
      <h3 style={{ fontSize:15, fontWeight:800, color:'#1e293b', letterSpacing:-0.3 }}>{label}</h3>
      <div style={{ flex:1, height:2, background:`linear-gradient(to right, ${color}30, transparent)`, marginLeft:10 }} />
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Serif+Bengali:wght@600&display=swap');
        
        .nav-glass {
          position: sticky; top: 0; z-index: 1000;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          padding: 12px 24px; display: flex; align-items: center; justify-content: space-between;
        }

        .input-glow {
          width: 100%; padding: 12px 16px; border-radius: 12px;
          border: 2px solid #f1f5f9; background: #fff;
          font-size: 14px; transition: all 0.3s; color: #1e293b; outline: none;
        }
        .input-glow:focus {
          border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
        }

        .tab-btn {
          padding: 12px 20px; border: none; background: transparent; cursor: pointer;
          font-size: 13px; font-weight: 700; color: #64748b; position: relative;
          transition: all 0.3s; display: flex; align-items: center; gap: 8px;
        }
        .tab-btn.active { color: #6366f1; }
        .tab-btn.active::after {
          content: ''; position: absolute; bottom: 0; left: 20%; right: 20%;
          height: 3px; background: #6366f1; border-radius: 10px;
        }

        .card-main {
          background: #fff; border-radius: 24px; border: 1px solid rgba(0,0,0,0.04);
          box-shadow: 0 20px 40px rgba(0,0,0,0.02); overflow: hidden;
        }

        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-up { animation: slideUp 0.5s ease-out both; }
        
        .blood-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .blood-item {
          padding: 15px; border-radius: 12px; border: 2px solid #f1f5f9;
          text-align: center; cursor: pointer; transition: all 0.2s;
        }
        .blood-item.selected { border-color: #ef4444; background: #fef2f2; }

        @media (max-width: 640px) {
          .g-responsive { grid-template-columns: 1fr !important; }
          .nav-glass { padding: 12px 16px; }
        }
      `}</style>

      {/* Header */}
      <nav className="nav-glass">
        <button onClick={() => router.push('/dashboard/profile')} style={{ border:'none', background:'none', color:'#6366f1', fontWeight:700, fontSize:14, cursor:'pointer' }}>
          ← Back
        </button>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:10, fontWeight:800, color:'#94a3b8', letterSpacing:2 }}>EDIT MODE</div>
          <div style={{ fontSize:16, fontWeight:800, color:'#1e293b' }}>Profile Settings</div>
        </div>
        <div style={{ width:40 }} />
      </nav>

      <main style={{ maxWidth:800, margin:'40px auto', padding:'0 20px 100px' }}>
        <form onSubmit={handleSubmit}>
          
          {/* Hero Section */}
          <div className="card-main animate-up" style={{ padding:30, marginBottom:30, display:'flex', alignItems:'center', gap:30, flexWrap:'wrap' }}>
            <div style={{ position:'relative', cursor:'pointer' }} onClick={() => fileInputRef.current?.click()}>
              <div style={{ width:120, height:120, borderRadius:35, overflow:'hidden', border:'4px solid #fff', boxShadow:'0 15px 30px rgba(0,0,0,0.1)' }}>
                {preview ? <img src={preview} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <div style={{ width:'100%', height:'100%', background:'#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:30 }}>📷</div>}
              </div>
              <div style={{ position:'absolute', bottom:-5, right:-5, width:36, height:36, background:'#6366f1', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', border:'3px solid #fff' }}>✎</div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} style={{ display:'none' }} />
            </div>

            <div style={{ flex:1 }}>
              <h2 style={{ fontSize:24, fontWeight:800, color:'#1e293b', marginBottom:5 }}>{form.fullName || "Your Name"}</h2>
              <p style={{ color:'#64748b', fontSize:14, marginBottom:15 }}>{session?.user?.email}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {TABS.map(t => (
                  <span key={t.id} style={{ padding:'6px 12px', background:`${t.color}10`, color:t.color, borderRadius:8, fontSize:11, fontWeight:700 }}>
                    {t.icon} {t.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Success/Error Alerts */}
          {success && <div style={{ background:'#ecfdf5', color:'#059669', padding:15, borderRadius:12, marginBottom:20, fontWeight:600, border:'1px solid #10b981' }}>✓ {success}</div>}
          {error && <div style={{ background:'#fef2f2', color:'#dc2626', padding:15, borderRadius:12, marginBottom:20, fontWeight:600, border:'1px solid #ef4444' }}>⚠️ {error}</div>}

          {/* Navigation Tabs */}
          <div style={{ display:'flex', overflowX:'auto', gap:10, marginBottom:2, background:'#fff', padding:'0 10px', borderTopLeftRadius:24, borderTopRightRadius:24, borderBottom:'1px solid #f1f5f9' }}>
            {TABS.map(t => (
              <button key={t.id} type="button" className={`tab-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>

          {/* Content Card */}
          <div className="card-main animate-up" style={{ padding:30, borderTopLeftRadius:0, borderTopRightRadius:0 }}>
            
            {activeTab === 'basic' && (
              <div>
                <SectionHeader icon="🚀" label="Basic Details" color="#6366f1" />
                <div className="g-responsive" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                  <FL label="Full Name (English)">
                    <input className="input-glow" name="fullName" value={form.fullName} onChange={handleChange} required />
                  </FL>
                  <FL label="আপনার নাম (বাংলা)">
                    <input className="input-glow" name="fullNameBn" value={form.fullNameBn} onChange={handleChange} style={{ fontFamily:"'Noto Serif Bengali', serif" }} />
                  </FL>
                  <FL label="Gender">
                    <select className="input-glow" name="gender" value={form.gender} onChange={handleChange}>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </FL>
                  <FL label="Date of Birth">
                    <input className="input-glow" type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
                  </FL>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div>
                <SectionHeader icon="📍" label="Contact & Map" color="#06b6d4" />
                <FL label="Present Address">
                  <textarea className="input-glow" name="presentAddress" value={form.presentAddress} onChange={handleChange} rows={2} />
                </FL>
                <div className="g-responsive" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                  <FL label="District">
                    <select className="input-glow" name="district" value={form.district} onChange={handleChange}>
                      <option value="">Select District</option>
                      {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </FL>
                  <FL label="WhatsApp Number">
                    <input className="input-glow" name="whatsAppNumber" value={form.whatsAppNumber} onChange={handleChange} placeholder="017..." />
                  </FL>
                </div>
                
                <button type="button" onClick={handleGPS} disabled={gpsLoading} style={{ width:'100%', padding:15, background:'#f0f9ff', border:'2px dashed #06b6d4', borderRadius:15, color:'#0891b2', fontWeight:700, cursor:'pointer', marginBottom:20 }}>
                  {gpsLoading ? 'Locating...' : '🎯 Get Current Location'}
                </button>

                <div style={{ height:300, borderRadius:20, overflow:'hidden', border:'2px solid #f1f5f9' }}>
                  <iframe id="map-frame" srcDoc={MAP_HTML(mapLat, mapLng, hasLoc)} width="100%" height="100%" style={{ border:'none' }} />
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div>
                <SectionHeader icon="🎓" label="Academic Background" color="#f59e0b" />
                <div className="g-responsive" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                  <FL label="University">
                    <input className="input-glow" name="universityName" value={form.universityName} onChange={handleChange} />
                  </FL>
                  <FL label="Department">
                    <input className="input-glow" name="department" value={form.department} onChange={handleChange} />
                  </FL>
                  <FL label="College Name">
                    <input className="input-glow" name="collegeName" value={form.collegeName} onChange={handleChange} />
                  </FL>
                  <FL label="Passing Year">
                    <input className="input-glow" type="number" name="collegePassingYear" value={form.collegePassingYear} onChange={handleChange} />
                  </FL>
                </div>
              </div>
            )}

            {activeTab === 'blood' && (
              <div>
                <SectionHeader icon="🩸" label="Blood Donation" color="#ef4444" />
                <FL label="Select Blood Group">
                  <div className="blood-grid">
                    {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => (
                      <div key={bg} className={`blood-item ${form.bloodGroup === bg ? 'selected' : ''}`} onClick={() => setForm(p => ({ ...p, bloodGroup:bg }))}>
                        <div style={{ fontSize:18, fontWeight:800, color:'#ef4444' }}>{bg}</div>
                      </div>
                    ))}
                  </div>
                </FL>
                <div className="g-responsive" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginTop:20 }}>
                  <FL label="Last Donation Date">
                    <input className="input-glow" type="date" name="lastDonationDate" value={form.lastDonationDate} onChange={handleChange} />
                  </FL>
                  <FL label="Total Donations">
                    <input className="input-glow" type="number" name="totalDonationCount" value={form.totalDonationCount} onChange={handleChange} />
                  </FL>
                </div>
              </div>
            )}

            {activeTab === 'bio' && (
              <div>
                <SectionHeader icon="✍️" label="About You" color="#ec4899" />
                <FL label="Short Biography">
                  <textarea className="input-glow" name="shortBio" value={form.shortBio} onChange={handleChange} rows={5} placeholder="Tell us about yourself..." />
                </FL>
                <FL label="Hobbies">
                  <input className="input-glow" name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="Photography, Traveling..." />
                </FL>
              </div>
            )}

            {activeTab === 'social' && (
              <div>
                <SectionHeader icon="🌐" label="Social Profiles" color="#10b981" />
                <FL label="Facebook Profile Link">
                  <input className="input-glow" name="facebook" value={form.facebook} onChange={handleChange} placeholder="https://fb.com/..." />
                </FL>
                <FL label="Portfolio or Website">
                  <input className="input-glow" name="portfolioWebsite" value={form.portfolioWebsite} onChange={handleChange} placeholder="https://..." />
                </FL>
              </div>
            )}

          </div>

          {/* Action Bar */}
          <div style={{ position:'fixed', bottom:20, left:'50%', transform:'translateX(-50%)', width:'90%', maxWidth:400, background:'rgba(15, 23, 42, 0.9)', backdropFilter:'blur(10px)', padding:10, borderRadius:20, display:'flex', gap:10, boxShadow:'0 20px 50px rgba(0,0,0,0.3)', zIndex:2000 }}>
            <button type="button" onClick={() => router.push('/dashboard/profile')} style={{ flex:1, padding:14, borderRadius:15, border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'#fff', fontWeight:600, cursor:'pointer' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} style={{ flex:2, padding:14, borderRadius:15, border:'none', background:'#6366f1', color:'#fff', fontWeight:700, cursor:'pointer', boxShadow:'0 10px 20px rgba(99,102,241,0.3)' }}>
              {saving ? 'Saving...' : '💾 Save Changes'}
            </button>
          </div>

        </form>
      </main>
    </div>
  )
}