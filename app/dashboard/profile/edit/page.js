'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

const DISTRICTS = [
  'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ',
  'কুমিল্লা', 'নারায়ণগঞ্জ', 'গাজীপুর', 'টাঙ্গাইল', 'ফরিদপুর', 'মাদারীপুর',
  'গোপালগঞ্জ', 'শরীয়তপুর', 'রাজবাড়ী', 'কিশোরগঞ্জ', 'নেত্রকোণা', 'ময়মনসিংহ',
  'জামালপুর', 'শেরপুর', 'সিরাজগঞ্জ', 'পাবনা', 'নাটোর', 'নওগাঁ', 'চাঁপাইনবাবগঞ্জ',
  'বগুড়া', 'জয়পুরহাট', 'যশোর', 'সাতক্ষীরা', 'মেহেরপুর', 'নড়াইল', 'কুষ্টিয়া',
  'চুয়াডাঙ্গা', 'মাগুরা', 'ঝিনাইদহ', 'বাগেরহাট', 'পিরোজপুর', 'ঝালকাঠি',
  'বরগুনা', 'পটুয়াখালী', 'ভোলা', 'ব্রাহ্মণবাড়িয়া', 'চাঁদপুর', 'লক্ষ্মীপুর',
  'নোয়াখালী', 'ফেনী', 'খাগড়াছড়ি', 'রাঙামাটি', 'বান্দরবান', 'কক্সবাজার',
  'হবিগঞ্জ', 'মৌলভীবাজার', 'সুনামগঞ্জ', 'কুড়িগ্রাম', 'গাইবান্ধা', 'লালমনিরহাট',
  'নীলফামারী', 'পঞ্চগড়', 'ঠাকুরগাঁও', 'দিনাজপুর',
]

export default function ProfileEditPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      const data = await res.json()
      if (data.profile) {
        const p = data.profile
        setForm(prev => ({
          ...prev,
          fullName: p.fullName || '',
          fullNameBn: p.fullNameBn || '',
          memberType: p.memberType || 'general',
          committeePosition: p.committeePosition || '',
          memberSince: p.memberSince ? p.memberSince.split('T')[0] : '',
          gender: p.gender || '',
          dateOfBirth: p.dateOfBirth ? p.dateOfBirth.split('T')[0] : '',
          alternativeMobile: p.alternativeMobile || '',
          presentAddress: p.presentAddress || '',
          permanentAddress: p.permanentAddress || '',
          district: p.district || '',
          upazila: p.upazila || '',
          facebookLink: p.facebookLink || '',
          whatsAppNumber: p.whatsAppNumber || '',
          bloodGroup: p.bloodGroup || '',
          lastDonationDate: p.lastDonationDate ? p.lastDonationDate.split('T')[0] : '',
          nextAvailableDonationDate: p.nextAvailableDonationDate ? p.nextAvailableDonationDate.split('T')[0] : '',
          donationEligibility: p.donationEligibility || 'unknown',
          totalDonationCount: p.totalDonationCount || '',
          preferredDonationLocation: p.preferredDonationLocation || '',
          schoolName: p.schoolName || '',
          schoolGroup: p.schoolGroup || '',
          schoolPassingYear: p.schoolPassingYear || '',
          collegeName: p.collegeName || '',
          collegeGroup: p.collegeGroup || '',
          collegePassingYear: p.collegePassingYear || '',
          universityName: p.universityName || '',
          department: p.department || '',
          studentId: p.studentId || '',
          currentYear: p.currentYear || '',
          currentSemester: p.currentSemester || '',
          shortBio: p.shortBio || '',
          whyJoined: p.whyJoined || '',
          futureGoals: p.futureGoals || '',
          hobbies: p.hobbies || '',
          facebook: p.facebook || '',
          portfolioWebsite: p.portfolioWebsite || '',
          latitude: p.latitude || '',
          longitude: p.longitude || '',
          locationDms: p.locationDms || '',
        }))
        if (p.profileImagePath) setPreview(p.profileImagePath)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'imageFile' && value) formData.append('imageFile', value)
        else if (value !== '' && value !== null) formData.append(key, value)
      })

      const res = await fetch('/api/profile', { method: 'PUT', body: formData })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'কিছু একটা সমস্যা হয়েছে')
      } else {
        setSuccess('Profile সফলভাবে update হয়েছে! ✅')
        setTimeout(() => router.push('/dashboard/profile'), 1500)
      }
    } catch (err) {
      setError('Server error হয়েছে')
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'basic', label: 'Basic', icon: '👤' },
    { id: 'contact', label: 'Contact', icon: '📞' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'blood', label: 'Blood', icon: '🩸' },
    { id: 'bio', label: 'Bio', icon: '✍️' },
    { id: 'social', label: 'Social', icon: '🔗' },
  ]

  if (status === 'loading' || loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0f0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '3px solid #86b369', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#7a7570', fontSize: 14, fontFamily: 'DM Sans, sans-serif' }}>Loading...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const userName = session?.user?.name || 'Alumni'
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <div style={{ minHeight: '100vh', background: '#f4f1eb', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&family=Noto+Serif+Bengali:wght@500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease forwards; }

        .tab-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 10px 18px; border-radius: 8px;
          font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.15s;
          border: none; background: transparent;
          color: #888; font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .tab-btn:hover { background: #f0f0ec; color: #333; }
        .tab-btn.active { background: #1a2e1a; color: #f0ede6; }

        .field-group { margin-bottom: 20px; }
        .field-label {
          display: block; font-size: 12px; font-weight: 600;
          color: #666; letter-spacing: 0.5px; text-transform: uppercase;
          margin-bottom: 7px;
        }
        .field-label span { color: #dc2626; margin-left: 2px; }

        .field-input, .field-select, .field-textarea {
          width: 100%; padding: 11px 14px;
          background: #fff; border: 1.5px solid #e0ddd6;
          border-radius: 8px; font-size: 14px; color: #1a1a1a;
          font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
        }
        .field-input:focus, .field-select:focus, .field-textarea:focus {
          border-color: #86b369;
          box-shadow: 0 0 0 3px rgba(134,179,105,0.12);
        }
        .field-input::placeholder, .field-textarea::placeholder { color: #c0bdb8; }
        .field-textarea { resize: vertical; min-height: 100px; line-height: 1.6; }

        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

        .save-btn {
          padding: 13px 36px; background: #1a2e1a; color: #f0ede6;
          border: none; border-radius: 8px; font-size: 14px; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.2s; letter-spacing: 0.3px;
        }
        .save-btn:hover { background: #243d24; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(26,46,26,0.3); }
        .save-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }

        .cancel-btn {
          padding: 13px 24px; background: transparent; color: #666;
          border: 1.5px solid #e0ddd6; border-radius: 8px; font-size: 14px;
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .cancel-btn:hover { border-color: #aaa; color: #333; }

        .section-divider {
          font-size: 11px; font-weight: 700; color: #86b369;
          letter-spacing: 1.5px; text-transform: uppercase;
          margin-bottom: 16px; padding-bottom: 8px;
          border-bottom: 1px solid #f0ede6;
        }

        .avatar-upload-zone {
          width: 110px; height: 110px; border-radius: 50%;
          border: 3px dashed #d0cdc6; background: #f8f8f6;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s; overflow: hidden;
          position: relative;
        }
        .avatar-upload-zone:hover { border-color: #86b369; background: #f0f8ee; }
        .avatar-upload-zone img { width: 100%; height: 100%; object-fit: cover; }
        .avatar-overlay {
          position: absolute; inset: 0; background: rgba(26,46,26,0.6);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.2s; border-radius: 50%;
          color: #fff; font-size: 20px;
        }
        .avatar-upload-zone:hover .avatar-overlay { opacity: 1; }

        .success-box {
          padding: 12px 16px; background: #f0fdf4; border: 1px solid #bbf7d0;
          border-radius: 8px; font-size: 13px; color: #16a34a; margin-bottom: 20px;
        }
        .error-box {
          padding: 12px 16px; background: #fef2f2; border: 1px solid #fecaca;
          border-radius: 8px; font-size: 13px; color: #dc2626; margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .field-row, .field-row-3 { grid-template-columns: 1fr; }
          .tabs-scroll { overflow-x: auto; }
        }
      `}</style>

      {/* Top Bar */}
      <div style={{ background: '#1a2e1a', padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.push('/dashboard/profile')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', color: '#c8d8b8', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
          ← Profile এ ফিরে যাও
        </button>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, color: '#86b369', fontWeight: 700 }}>
          Edit Profile
        </span>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>

        <form onSubmit={handleSubmit}>

          {/* Header Card */}
          <div className="fade-up" style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)', padding: '28px 32px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 28 }}>

            {/* Avatar Upload */}
            <div>
              <div className="avatar-upload-zone" onClick={() => fileInputRef.current?.click()}>
                {preview ? (
                  <>
                    <img src={preview} alt="preview" />
                    <div className="avatar-overlay">📷</div>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: 32 }}>📷</span>
                    <span style={{ fontSize: 11, color: '#aaa', marginTop: 4 }}>Upload</span>
                    <div className="avatar-overlay">📷</div>
                  </>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
              <p style={{ fontSize: 11, color: '#aaa', textAlign: 'center', marginTop: 8, maxWidth: 110 }}>Click to change photo</p>
            </div>

            {/* Name preview */}
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 900, color: '#1a1a1a', marginBottom: 4 }}>
                {form.fullName || userName}
              </h1>
              {form.fullNameBn && (
                <p style={{ fontFamily: 'Noto Serif Bengali, serif', fontSize: 16, color: '#555', marginBottom: 8 }}>{form.fullNameBn}</p>
              )}
              <p style={{ fontSize: 13, color: '#888' }}>📧 {session?.user?.email}</p>
              <p style={{ fontSize: 12, color: '#aaa', marginTop: 6 }}>
                Profile টা সব ভাগে ভাগ করা আছে — প্রতিটা tab এ গিয়ে তথ্য দাও
              </p>
            </div>

          </div>

          {/* Alerts */}
          {success && <div className="success-box">✅ {success}</div>}
          {error && <div className="error-box">⚠️ {error}</div>}

          {/* Tabs */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)', padding: '6px 8px', marginBottom: 20, display: 'flex', gap: 4, overflowX: 'auto' }} className="tabs-scroll">
            {tabs.map(tab => (
              <button key={tab.id} type="button" className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}>
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="fade-up" style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)', padding: '32px' }}>

            {/* ── BASIC ── */}
            {activeTab === 'basic' && (
              <div>
                <div className="section-divider">👤 Basic Information</div>

                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">পূর্ণ নাম (English) <span>*</span></label>
                    <input className="field-input" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" required />
                  </div>
                  <div className="field-group">
                    <label className="field-label">পূর্ণ নাম (বাংলা)</label>
                    <input className="field-input" name="fullNameBn" value={form.fullNameBn} onChange={handleChange} placeholder="তোমার পূর্ণ নাম বাংলায়" style={{ fontFamily: 'Noto Serif Bengali, serif' }} />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">লিঙ্গ</label>
                    <select className="field-select" name="gender" value={form.gender} onChange={handleChange}>
                      <option value="">Select করো</option>
                      <option value="male">পুরুষ</option>
                      <option value="female">মহিলা</option>
                      <option value="other">অন্যান্য</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">জন্ম তারিখ</label>
                    <input className="field-input" type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">Member Type</label>
                    <select className="field-select" name="memberType" value={form.memberType} onChange={handleChange}>
                      <option value="general">General Member</option>
                      <option value="life">Life Member</option>
                      <option value="honorary">Honorary Member</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Member Since</label>
                    <input className="field-input" type="date" name="memberSince" value={form.memberSince} onChange={handleChange} />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Committee Position</label>
                  <input className="field-input" name="committeePosition" value={form.committeePosition} onChange={handleChange} placeholder="যেমন: সভাপতি, সাধারণ সম্পাদক, সদস্য" />
                </div>
              </div>
            )}

            {/* ── CONTACT ── */}
            {activeTab === 'contact' && (
              <div>
                <div className="section-divider">📞 Contact Information</div>

                <div className="field-group">
                  <label className="field-label">বর্তমান ঠিকানা</label>
                  <textarea className="field-textarea" name="presentAddress" value={form.presentAddress} onChange={handleChange} placeholder="তোমার বর্তমান ঠিকানা লেখো" rows={3} />
                </div>

                <div className="field-group">
                  <label className="field-label">স্থায়ী ঠিকানা</label>
                  <textarea className="field-textarea" name="permanentAddress" value={form.permanentAddress} onChange={handleChange} placeholder="তোমার স্থায়ী ঠিকানা লেখো" rows={3} />
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">জেলা</label>
                    <select className="field-select" name="district" value={form.district} onChange={handleChange}>
                      <option value="">জেলা select করো</option>
                      {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">উপজেলা</label>
                    <input className="field-input" name="upazila" value={form.upazila} onChange={handleChange} placeholder="উপজেলার নাম" />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">Alternative Mobile</label>
                    <input className="field-input" name="alternativeMobile" value={form.alternativeMobile} onChange={handleChange} placeholder="01XXXXXXXXX" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">WhatsApp Number</label>
                    <input className="field-input" name="whatsAppNumber" value={form.whatsAppNumber} onChange={handleChange} placeholder="01XXXXXXXXX" />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Facebook Profile Link</label>
                  <input className="field-input" name="facebookLink" value={form.facebookLink} onChange={handleChange} placeholder="https://facebook.com/yourname" />
                </div>

                <div className="section-divider" style={{ marginTop: 24 }}>📍 Location (Optional)</div>

                <div className="field-row-3">
                  <div className="field-group">
                    <label className="field-label">Latitude</label>
                    <input className="field-input" type="number" step="any" name="latitude" value={form.latitude} onChange={handleChange} placeholder="23.8103" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Longitude</label>
                    <input className="field-input" type="number" step="any" name="longitude" value={form.longitude} onChange={handleChange} placeholder="90.4125" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">DMS</label>
                    <input className="field-input" name="locationDms" value={form.locationDms} onChange={handleChange} placeholder="23°48'37.1N" />
                  </div>
                </div>
              </div>
            )}

            {/* ── EDUCATION ── */}
            {activeTab === 'education' && (
              <div>
                {/* School */}
                <div className="section-divider">🏫 স্কুল</div>
                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">স্কুলের নাম</label>
                    <input className="field-input" name="schoolName" value={form.schoolName} onChange={handleChange} placeholder="স্কুলের পূর্ণ নাম" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Group</label>
                    <input className="field-input" name="schoolGroup" value={form.schoolGroup} onChange={handleChange} placeholder="বিজ্ঞান / মানবিক / বাণিজ্য" />
                  </div>
                </div>
                <div className="field-group" style={{ maxWidth: 200 }}>
                  <label className="field-label">Passing Year</label>
                  <input className="field-input" type="number" name="schoolPassingYear" value={form.schoolPassingYear} onChange={handleChange} placeholder="2018" min="1980" max="2030" />
                </div>

                {/* College */}
                <div className="section-divider" style={{ marginTop: 24 }}>🏛️ কলেজ</div>
                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">কলেজের নাম</label>
                    <input className="field-input" name="collegeName" value={form.collegeName} onChange={handleChange} placeholder="কলেজের পূর্ণ নাম" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">বিভাগ / Group</label>
                    <select className="field-select" name="collegeGroup" value={form.collegeGroup} onChange={handleChange}>
                      <option value="">Select করো</option>
                      <option value="science">বিজ্ঞান</option>
                      <option value="arts">মানবিক</option>
                      <option value="commerce">বাণিজ্য</option>
                    </select>
                  </div>
                </div>
                <div className="field-group" style={{ maxWidth: 200 }}>
                  <label className="field-label">Passing Year</label>
                  <input className="field-input" type="number" name="collegePassingYear" value={form.collegePassingYear} onChange={handleChange} placeholder="2020" min="1980" max="2030" />
                </div>

                {/* University */}
                <div className="section-divider" style={{ marginTop: 24 }}>🎓 বিশ্ববিদ্যালয়</div>
                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">বিশ্ববিদ্যালয়ের নাম</label>
                    <input className="field-input" name="universityName" value={form.universityName} onChange={handleChange} placeholder="University name" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Department</label>
                    <input className="field-input" name="department" value={form.department} onChange={handleChange} placeholder="CSE, EEE, BBA..." />
                  </div>
                </div>
                <div className="field-row-3">
                  <div className="field-group">
                    <label className="field-label">Student ID</label>
                    <input className="field-input" name="studentId" value={form.studentId} onChange={handleChange} placeholder="2021-1-60-XXX" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Current Year</label>
                    <select className="field-select" name="currentYear" value={form.currentYear} onChange={handleChange}>
                      <option value="">Select</option>
                      {[1,2,3,4,5].map(y => <option key={y} value={y}>{y}ম বর্ষ</option>)}
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Current Semester</label>
                    <select className="field-select" name="currentSemester" value={form.currentSemester} onChange={handleChange}>
                      <option value="">Select</option>
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(s => <option key={s} value={s}>{s}ম সেমিস্টার</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ── BLOOD ── */}
            {activeTab === 'blood' && (
              <div>
                <div className="section-divider">🩸 Blood Information</div>

                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">Blood Group <span>*</span></label>
                    <select className="field-select" name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
                      <option value="">Select করো</option>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Donation Eligibility</label>
                    <select className="field-select" name="donationEligibility" value={form.donationEligibility} onChange={handleChange}>
                      <option value="unknown">জানা নেই</option>
                      <option value="eligible">Eligible ✅</option>
                      <option value="not_eligible">Not Eligible ❌</option>
                    </select>
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">Last Donation Date</label>
                    <input className="field-input" type="date" name="lastDonationDate" value={form.lastDonationDate} onChange={handleChange} />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Next Available Date</label>
                    <input className="field-input" type="date" name="nextAvailableDonationDate" value={form.nextAvailableDonationDate} onChange={handleChange} />
                  </div>
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">Total Donations (বার)</label>
                    <input className="field-input" type="number" min="0" name="totalDonationCount" value={form.totalDonationCount} onChange={handleChange} placeholder="0" />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Preferred Donation Location</label>
                    <input className="field-input" name="preferredDonationLocation" value={form.preferredDonationLocation} onChange={handleChange} placeholder="DMCH, CMH, BSMMU..." />
                  </div>
                </div>
              </div>
            )}

            {/* ── BIO ── */}
            {activeTab === 'bio' && (
              <div>
                <div className="section-divider">✍️ Personal Bio</div>

                <div className="field-group">
                  <label className="field-label">Short Bio</label>
                  <textarea className="field-textarea" name="shortBio" value={form.shortBio} onChange={handleChange} placeholder="নিজের সম্পর্কে সংক্ষিপ্ত পরিচয় লেখো..." rows={4} />
                  <span style={{ fontSize: 11, color: '#aaa', marginTop: 4, display: 'block' }}>{form.shortBio.length} / 500 characters</span>
                </div>

                <div className="field-group">
                  <label className="field-label">কেন HPCAA তে join করলে?</label>
                  <textarea className="field-textarea" name="whyJoined" value={form.whyJoined} onChange={handleChange} placeholder="তোমার কারণ শেয়ার করো..." rows={4} />
                </div>

                <div className="field-group">
                  <label className="field-label">Future Goals</label>
                  <textarea className="field-textarea" name="futureGoals" value={form.futureGoals} onChange={handleChange} placeholder="তোমার ভবিষ্যৎ লক্ষ্য লেখো..." rows={4} />
                </div>

                <div className="field-group">
                  <label className="field-label">Hobbies & Interests</label>
                  <input className="field-input" name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="Reading, Coding, Photography, Football..." />
                </div>
              </div>
            )}

            {/* ── SOCIAL ── */}
            {activeTab === 'social' && (
              <div>
                <div className="section-divider">🔗 Social & Online Presence</div>

                <div className="field-group">
                  <label className="field-label">Facebook Profile</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>📘</span>
                    <input className="field-input" name="facebook" value={form.facebook} onChange={handleChange} placeholder="https://facebook.com/yourprofile" style={{ paddingLeft: 40 }} />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Portfolio / Website</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🌐</span>
                    <input className="field-input" name="portfolioWebsite" value={form.portfolioWebsite} onChange={handleChange} placeholder="https://yourwebsite.com" style={{ paddingLeft: 40 }} />
                  </div>
                </div>

                <div style={{ background: '#f8f8f6', borderRadius: 10, padding: '16px 20px', border: '1px solid #e8e4dc', marginTop: 8 }}>
                  <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7 }}>
                    💡 <strong>Tip:</strong> তোমার social links দিলে অন্য alumni-রা তোমার সাথে সহজে যোগাযোগ করতে পারবে।
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Save Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
            <button type="button" className="cancel-btn" onClick={() => router.push('/dashboard/profile')}>
              বাতিল করো
            </button>
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? '⏳ Save হচ্ছে...' : '💾 Save করো'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}