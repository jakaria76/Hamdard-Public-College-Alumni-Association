'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

const DISTRICTS = [
  'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ',
  'কুমিল্লা', 'নারায়ণগঞ্জ', 'গাজীপুর', 'টাঙ্গাইল', 'ফরিদপুর', 'মাদারীপুর',
  'গোপালগঞ্জ', 'শরীয়তপুর', 'রাজবাড়ী', 'কিশোরগঞ্জ', 'নেত্রকোণা',
  'জামালপুর', 'শেরপুর', 'সিরাজগঞ্জ', 'পাবনা', 'নাটোর', 'নওগাঁ', 'চাঁপাইনবাবগঞ্জ',
  'বগুড়া', 'জয়পুরহাট', 'যশোর', 'সাতক্ষীরা', 'মেহেরপুর', 'নড়াইল', 'কুষ্টিয়া',
  'চুয়াডাঙ্গা', 'মাগুরা', 'ঝিনাইদহ', 'বাগেরহাট', 'পিরোজপুর', 'ঝালকাঠি',
  'বরগুনা', 'পটুয়াখালী', 'ভোলা', 'ব্রাহ্মণবাড়িয়া', 'চাঁদপুর', 'লক্ষ্মীপুর',
  'নোয়াখালী', 'ফেনী', 'খাগড়াছড়ি', 'রাঙামাটি', 'বান্দরবান', 'কক্সবাজার',
  'হবিগঞ্জ', 'মৌলভীবাজার', 'সুনামগঞ্জ', 'কুড়িগ্রাম', 'গাইবান্ধা', 'লালমনিরহাট',
  'নীলফামারী', 'পঞ্চগড়', 'ঠাকুরগাঁও', 'দিনাজপুর',
]

const STEPS = [
  { id: 1, label: 'Basic Info', icon: '👤', desc: 'নাম, লিঙ্গ, জন্ম তারিখ' },
  { id: 2, label: 'Contact', icon: '📞', desc: 'ঠিকানা, মোবাইল' },
  { id: 3, label: 'Education', icon: '🎓', desc: 'স্কুল, কলেজ, বিশ্ববিদ্যালয়' },
  { id: 4, label: 'Blood', icon: '🩸', desc: 'Blood group, donation' },
  { id: 5, label: 'Bio & Social', icon: '✍️', desc: 'পরিচয়, social links' },
  { id: 6, label: 'Photo', icon: '📷', desc: 'Profile photo upload' },
]

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function ProfileCreatePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(null)

  const [form, setForm] = useState({
    fullName: '', fullNameBn: '', memberType: 'general', committeePosition: '',
    memberSince: '', gender: '', dateOfBirth: '',
    alternativeMobile: '', presentAddress: '', permanentAddress: '',
    district: '', upazila: '', facebookLink: '', whatsAppNumber: '',
    bloodGroup: '', lastDonationDate: '', nextAvailableDonationDate: '',
    donationEligibility: 'unknown', totalDonationCount: 0,
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
    if (status === 'unauthenticated') {
      window.location.href = '/login'
    }
  }, [status])

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

  const handleSubmit = async () => {
    setSaving(true)
    setError('')
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'imageFile' && value) {
          formData.append('imageFile', value)
        } else if (value !== '' && value !== null && value !== undefined) {
          formData.append(key, value)
        }
      })
      const res = await fetch('/api/profile', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'কিছু একটা সমস্যা হয়েছে')
        setSaving(false)
      } else {
        router.push('/dashboard/profile')
      }
    } catch (err) {
      setError('Server error হয়েছে')
      setSaving(false)
    }
  }

  const nextStep = () => {
    setError('')
    setStep(s => Math.min(s + 1, STEPS.length))
  }

  const prevStep = () => {
    setError('')
    setStep(s => Math.max(s - 1, 1))
  }

  const handleNext = () => {
    if (step === 1 && !form.fullName.trim()) {
      setError('নাম দেওয়া বাধ্যতামূলক!')
      return
    }
    nextStep()
  }

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0f0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 48, height: 48, border: '3px solid #86b369', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const progress = ((step - 1) / (STEPS.length - 1)) * 100
  const userName = session?.user?.name || 'Alumni'
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f0a', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&family=Noto+Serif+Bengali:wght@500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .step-content { animation: slideIn 0.3s ease forwards; }

        .flabel {
          display: block; font-size: 12px; font-weight: 600;
          color: #9a9590; letter-spacing: 0.6px;
          text-transform: uppercase; margin-bottom: 8px;
        }
        .flabel .req { color: #f87171; margin-left: 2px; }

        .finput, .fselect, .ftextarea {
          width: 100%; padding: 12px 16px;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 10px; font-size: 14px; color: #f0ede6;
          font-family: 'DM Sans', sans-serif;
          outline: none; transition: all 0.2s;
          appearance: none;
        }
        .finput:focus, .fselect:focus, .ftextarea:focus {
          border-color: #86b369;
          background: rgba(134,179,105,0.06);
          box-shadow: 0 0 0 3px rgba(134,179,105,0.1);
        }
        .finput::placeholder, .ftextarea::placeholder { color: rgba(255,255,255,0.18); }
        .fselect option { background: #1a2e1a; color: #f0ede6; }
        .ftextarea { resize: vertical; min-height: 90px; line-height: 1.6; }

        .frow { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .frow3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
        .fgroup { margin-bottom: 18px; }

        .sec-title {
          font-size: 11px; font-weight: 700; color: #86b369;
          letter-spacing: 1.8px; text-transform: uppercase;
          margin-bottom: 20px; padding-bottom: 10px;
          border-bottom: 1px solid rgba(134,179,105,0.15);
          display: flex; align-items: center; gap: 8px;
        }

        .blood-opt {
          padding: 14px 10px; border-radius: 10px;
          border: 2px solid rgba(255,255,255,0.08);
          cursor: pointer; text-align: center;
          background: rgba(255,255,255,0.03);
          transition: all 0.2s;
        }
        .blood-opt:hover { border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.06); }
        .blood-opt.sel { border-color: #ef4444; background: rgba(220,38,38,0.12); }
        .blood-txt {
          font-family: 'Playfair Display', serif;
          font-size: 20px; font-weight: 900; color: #f87171;
        }

        .elig-opt {
          flex: 1; padding: 12px; border-radius: 10px;
          border: 2px solid rgba(255,255,255,0.08);
          background: transparent; cursor: pointer;
          text-align: center; font-size: 13px; color: #f0ede6;
          transition: all 0.2s;
        }

        .upload-zone {
          border: 2px dashed rgba(134,179,105,0.25);
          border-radius: 18px; padding: 48px 32px;
          text-align: center; cursor: pointer;
          transition: all 0.2s;
          background: rgba(134,179,105,0.02);
        }
        .upload-zone:hover { border-color: #86b369; background: rgba(134,179,105,0.05); }

        .btn-next {
          padding: 13px 32px; background: #86b369; color: #0a0f0a;
          border: none; border-radius: 10px; font-size: 14px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .btn-next:hover { background: #9dc97f; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(134,179,105,0.35); }
        .btn-next:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

        .btn-back {
          padding: 13px 24px; background: transparent; color: #7a7570;
          border: 1.5px solid rgba(255,255,255,0.1); border-radius: 10px;
          font-size: 14px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .btn-back:hover { border-color: rgba(255,255,255,0.25); color: #f0ede6; }

        .btn-skip {
          padding: 13px 18px; background: transparent; color: #3a3835;
          border: none; font-size: 13px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: color 0.2s;
        }
        .btn-skip:hover { color: #7a7570; }

        .err-box {
          padding: 12px 16px;
          background: rgba(220,38,38,0.1);
          border: 1px solid rgba(220,38,38,0.25);
          border-radius: 8px; font-size: 13px;
          color: #f87171; margin-bottom: 20px;
        }

        .step-dot {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; transition: all 0.3s;
          flex-shrink: 0; cursor: pointer;
        }

        @media (max-width: 768px) {
          .frow, .frow3 { grid-template-columns: 1fr; }
          .sidebar-steps { display: none !important; }
          .layout { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Top Bar */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.push('/dashboard')}
          style={{ background: 'transparent', border: 'none', color: '#4a4845', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
          ← Dashboard
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1a2e1a', border: '2px solid #86b369', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontSize: 13, fontWeight: 700, color: '#86b369' }}>
            {userInitial}
          </div>
          <span style={{ fontSize: 13, color: '#4a4845' }}>{userName}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 44, animation: 'fadeUp 0.4s ease' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 900, color: '#f0ede6', marginBottom: 8 }}>
            Profile তৈরি করো
          </h1>
          <p style={{ fontSize: 14, color: '#4a4845', fontWeight: 300 }}>
            HPCAA Alumni Community তে নিজেকে পরিচয় করিয়ে দাও
          </p>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: '#4a4845' }}>Step {step} of {STEPS.length} — {STEPS[step - 1].label}</span>
            <span style={{ fontSize: 12, color: '#86b369', fontWeight: 600 }}>{Math.round(progress)}% done</span>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #86b369, #9dc97f)', borderRadius: 2, transition: 'width 0.5s ease' }} />
          </div>
        </div>

        {/* Layout */}
        <div className="layout" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24 }}>

          {/* Sidebar Steps */}
          <div className="sidebar-steps" style={{ position: 'sticky', top: 20, alignSelf: 'start' }}>
            {STEPS.map((s) => {
              const done = step > s.id
              const active = step === s.id
              return (
                <div key={s.id}
                  onClick={() => done && setStep(s.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, marginBottom: 4, cursor: done ? 'pointer' : 'default', background: active ? 'rgba(134,179,105,0.08)' : 'transparent', border: active ? '1px solid rgba(134,179,105,0.18)' : '1px solid transparent', transition: 'all 0.2s' }}>
                  <div className="step-dot" style={{
                    background: done ? '#86b369' : active ? 'rgba(134,179,105,0.18)' : 'rgba(255,255,255,0.04)',
                    color: done ? '#0a0f0a' : active ? '#86b369' : '#3a3835',
                    border: active ? '2px solid #86b369' : done ? 'none' : '2px solid rgba(255,255,255,0.07)',
                    fontSize: done ? 16 : 15,
                  }}>
                    {done ? '✓' : s.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#f0ede6' : done ? '#86b369' : '#3a3835' }}>{s.label}</div>
                    <div style={{ fontSize: 10, color: active ? '#6a6560' : '#2a2825', marginTop: 1 }}>{s.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Form Card */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '36px 40px' }}>

            {error && <div className="err-box">⚠️ {error}</div>}

            {/* Step 1: Basic */}
            {step === 1 && (
              <div className="step-content">
                <div className="sec-title"><span>👤</span> Basic Information</div>

                <div className="frow">
                  <div className="fgroup">
                    <label className="flabel">পূর্ণ নাম (English) <span className="req">*</span></label>
                    <input className="finput" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" />
                  </div>
                  <div className="fgroup">
                    <label className="flabel">পূর্ণ নাম (বাংলা)</label>
                    <input className="finput" name="fullNameBn" value={form.fullNameBn} onChange={handleChange} placeholder="তোমার পূর্ণ নাম" style={{ fontFamily: 'Noto Serif Bengali, serif' }} />
                  </div>
                </div>

                <div className="frow">
                  <div className="fgroup">
                    <label className="flabel">লিঙ্গ</label>
                    <select className="fselect" name="gender" value={form.gender} onChange={handleChange}>
                      <option value="">Select করো</option>
                      <option value="male">পুরুষ</option>
                      <option value="female">মহিলা</option>
                      <option value="other">অন্যান্য</option>
                    </select>
                  </div>
                  <div className="fgroup">
                    <label className="flabel">জন্ম তারিখ</label>
                    <input className="finput" type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
                  </div>
                </div>

                <div className="frow">
                  <div className="fgroup">
                    <label className="flabel">Member Type</label>
                    <select className="fselect" name="memberType" value={form.memberType} onChange={handleChange}>
                      <option value="general">General Member</option>
                      <option value="life">Life Member</option>
                      <option value="honorary">Honorary Member</option>
                    </select>
                  </div>
                  <div className="fgroup">
                    <label className="flabel">Member Since</label>
                    <input className="finput" type="date" name="memberSince" value={form.memberSince} onChange={handleChange} />
                  </div>
                </div>

                <div className="fgroup">
                  <label className="flabel">Committee Position</label>
                  <input className="finput" name="committeePosition" value={form.committeePosition} onChange={handleChange} placeholder="সভাপতি, সাধারণ সম্পাদক, সদস্য..." />
                </div>
              </div>
            )}

            {/* Step 2: Contact */}
            {step === 2 && (
              <div className="step-content">
                <div className="sec-title"><span>📞</span> Contact Information</div>

                <div className="fgroup">
                  <label className="flabel">বর্তমান ঠিকানা</label>
                  <textarea className="ftextarea" name="presentAddress" value={form.presentAddress} onChange={handleChange} placeholder="তোমার বর্তমান ঠিকানা" rows={3} />
                </div>

                <div className="fgroup">
                  <label className="flabel">স্থায়ী ঠিকানা</label>
                  <textarea className="ftextarea" name="permanentAddress" value={form.permanentAddress} onChange={handleChange} placeholder="তোমার স্থায়ী ঠিকানা" rows={3} />
                </div>

                <div className="frow">
                  <div className="fgroup">
                    <label className="flabel">জেলা</label>
                    <select className="fselect" name="district" value={form.district} onChange={handleChange}>
                      <option value="">জেলা select করো</option>
                      {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="fgroup">
                    <label className="flabel">উপজেলা</label>
                    <input className="finput" name="upazila" value={form.upazila} onChange={handleChange} placeholder="উপজেলার নাম" />
                  </div>
                </div>

                <div className="frow">
                  <div className="fgroup">
                    <label className="flabel">Alternative Mobile</label>
                    <input className="finput" name="alternativeMobile" value={form.alternativeMobile} onChange={handleChange} placeholder="01XXXXXXXXX" />
                  </div>
                  <div className="fgroup">
                    <label className="flabel">WhatsApp</label>
                    <input className="finput" name="whatsAppNumber" value={form.whatsAppNumber} onChange={handleChange} placeholder="01XXXXXXXXX" />
                  </div>
                </div>

                <div className="fgroup">
                  <label className="flabel">Facebook Link</label>
                  <input className="finput" name="facebookLink" value={form.facebookLink} onChange={handleChange} placeholder="https://facebook.com/yourname" />
                </div>
              </div>
            )}

            {/* Step 3: Education */}
            {step === 3 && (
              <div className="step-content">
                <div className="sec-title"><span>🏫</span> স্কুল</div>
                <div className="frow">
                  <div className="fgroup">
                    <label className="flabel">স্কুলের নাম</label>
                    <input className="finput" name="schoolName" value={form.schoolName} onChange={handleChange} placeholder="স্কুলের পূর্ণ নাম" />
                  </div>
                  <div className="fgroup">
                    <label className="flabel">Group</label>
                    <input className="finput" name="schoolGroup" value={form.schoolGroup} onChange={handleChange} placeholder="বিজ্ঞান / মানবিক / বাণিজ্য" />
                  </div>
                </div>
                <div className="fgroup" style={{ maxWidth: 180 }}>
                  <label className="flabel">Passing Year</label>
                  <input className="finput" type="number" name="schoolPassingYear" value={form.schoolPassingYear} onChange={handleChange} placeholder="2018" />
                </div>

                <div className="sec-title" style={{ marginTop: 24 }}><span>🏛️</span> কলেজ</div>
                <div className="frow">
                  <div className="fgroup">
                    <label className="flabel">কলেজের নাম</label>
                    <input className="finput" name="collegeName" value={form.collegeName} onChange={handleChange} placeholder="কলেজের পূর্ণ নাম" />
                  </div>
                  <div className="fgroup">
                    <label className="flabel">বিভাগ</label>
                    <select className="fselect" name="collegeGroup" value={form.collegeGroup} onChange={handleChange}>
                      <option value="">Select করো</option>
                      <option value="science">বিজ্ঞান</option>
                      <option value="arts">মানবিক</option>
                      <option value="commerce">বাণিজ্য</option>
                    </select>
                  </div>
                </div>
                <div className="fgroup" style={{ maxWidth: 180 }}>
                  <label className="flabel">Passing Year</label>
                  <input className="finput" type="number" name="collegePassingYear" value={form.collegePassingYear} onChange={handleChange} placeholder="2020" />
                </div>

                <div className="sec-title" style={{ marginTop: 24 }}><span>🎓</span> বিশ্ববিদ্যালয়</div>
                <div className="frow">
                  <div className="fgroup">
                    <label className="flabel">বিশ্ববিদ্যালয়</label>
                    <input className="finput" name="universityName" value={form.universityName} onChange={handleChange} placeholder="University name" />
                  </div>
                  <div className="fgroup">
                    <label className="flabel">Department</label>
                    <input className="finput" name="department" value={form.department} onChange={handleChange} placeholder="CSE, EEE, BBA..." />
                  </div>
                </div>
                <div className="frow3">
                  <div className="fgroup">
                    <label className="flabel">Student ID</label>
                    <input className="finput" name="studentId" value={form.studentId} onChange={handleChange} placeholder="2021-1-60-XXX" />
                  </div>
                  <div className="fgroup">
                    <label className="flabel">Year</label>
                    <select className="fselect" name="currentYear" value={form.currentYear} onChange={handleChange}>
                      <option value="">Select</option>
                      {[1,2,3,4,5].map(y => <option key={y} value={y}>{y}ম বর্ষ</option>)}
                    </select>
                  </div>
                  <div className="fgroup">
                    <label className="flabel">Semester</label>
                    <select className="fselect" name="currentSemester" value={form.currentSemester} onChange={handleChange}>
                      <option value="">Select</option>
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(s => <option key={s} value={s}>{s}ম</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Blood */}
            {step === 4 && (
              <div className="step-content">
                <div className="sec-title"><span>🩸</span> Blood Information</div>

                <div className="fgroup">
                  <label className="flabel">Blood Group select করো</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 4 }}>
                    {BLOOD_GROUPS.map(bg => (
                      <div key={bg}
                        className={`blood-opt${form.bloodGroup === bg ? ' sel' : ''}`}
                        onClick={() => setForm(p => ({ ...p, bloodGroup: bg }))}>
                        <div className="blood-txt">{bg}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="fgroup">
                  <label className="flabel">Donation Eligibility</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[
                      { v: 'eligible', label: '✅ Eligible', bc: form.donationEligibility === 'eligible' ? '#86b369' : 'rgba(255,255,255,0.08)', bg: form.donationEligibility === 'eligible' ? 'rgba(134,179,105,0.12)' : 'transparent' },
                      { v: 'not_eligible', label: '❌ Not Eligible', bc: form.donationEligibility === 'not_eligible' ? '#ef4444' : 'rgba(255,255,255,0.08)', bg: form.donationEligibility === 'not_eligible' ? 'rgba(220,38,38,0.1)' : 'transparent' },
                      { v: 'unknown', label: '❓ জানি না', bc: form.donationEligibility === 'unknown' ? '#86b369' : 'rgba(255,255,255,0.08)', bg: form.donationEligibility === 'unknown' ? 'rgba(134,179,105,0.06)' : 'transparent' },
                    ].map(opt => (
                      <div key={opt.v} className="elig-opt"
                        onClick={() => setForm(p => ({ ...p, donationEligibility: opt.v }))}
                        style={{ border: `2px solid ${opt.bc}`, background: opt.bg }}>
                        {opt.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="frow">
                  <div className="fgroup">
                    <label className="flabel">Last Donation Date</label>
                    <input className="finput" type="date" name="lastDonationDate" value={form.lastDonationDate} onChange={handleChange} />
                  </div>
                  <div className="fgroup">
                    <label className="flabel">Next Available Date</label>
                    <input className="finput" type="date" name="nextAvailableDonationDate" value={form.nextAvailableDonationDate} onChange={handleChange} />
                  </div>
                </div>

                <div className="frow">
                  <div className="fgroup">
                    <label className="flabel">Total Donations (বার)</label>
                    <input className="finput" type="number" min="0" name="totalDonationCount" value={form.totalDonationCount} onChange={handleChange} placeholder="0" />
                  </div>
                  <div className="fgroup">
                    <label className="flabel">Preferred Location</label>
                    <input className="finput" name="preferredDonationLocation" value={form.preferredDonationLocation} onChange={handleChange} placeholder="DMCH, CMH, BSMMU..." />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Bio & Social */}
            {step === 5 && (
              <div className="step-content">
                <div className="sec-title"><span>✍️</span> Personal Bio</div>

                <div className="fgroup">
                  <label className="flabel">Short Bio</label>
                  <textarea className="ftextarea" name="shortBio" value={form.shortBio} onChange={handleChange} placeholder="নিজের সম্পর্কে সংক্ষিপ্ত পরিচয় লেখো..." rows={4} />
                  <span style={{ fontSize: 11, color: '#3a3835', marginTop: 4, display: 'block' }}>{form.shortBio.length} / 500</span>
                </div>

                <div className="frow">
                  <div className="fgroup">
                    <label className="flabel">কেন join করলে?</label>
                    <textarea className="ftextarea" name="whyJoined" value={form.whyJoined} onChange={handleChange} placeholder="তোমার কারণ..." rows={3} />
                  </div>
                  <div className="fgroup">
                    <label className="flabel">Future Goals</label>
                    <textarea className="ftextarea" name="futureGoals" value={form.futureGoals} onChange={handleChange} placeholder="তোমার লক্ষ্য..." rows={3} />
                  </div>
                </div>

                <div className="fgroup">
                  <label className="flabel">Hobbies</label>
                  <input className="finput" name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="Reading, Coding, Photography..." />
                </div>

                <div className="sec-title" style={{ marginTop: 24 }}><span>🔗</span> Social Links</div>

                <div className="fgroup">
                  <label className="flabel">Facebook</label>
                  <input className="finput" name="facebook" value={form.facebook} onChange={handleChange} placeholder="https://facebook.com/yourprofile" />
                </div>
                <div className="fgroup">
                  <label className="flabel">Portfolio / Website</label>
                  <input className="finput" name="portfolioWebsite" value={form.portfolioWebsite} onChange={handleChange} placeholder="https://yourwebsite.com" />
                </div>
              </div>
            )}

            {/* Step 6: Photo */}
            {step === 6 && (
              <div className="step-content">
                <div className="sec-title"><span>📷</span> Profile Photo</div>

                <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
                  {preview ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                      <img src={preview} alt="preview" style={{ width: 130, height: 130, borderRadius: '50%', objectFit: 'cover', border: '4px solid #86b369', boxShadow: '0 8px 28px rgba(134,179,105,0.25)' }} />
                      <p style={{ fontSize: 13, color: '#86b369' }}>✅ Photo selected! Click to change</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(134,179,105,0.08)', border: '2px dashed rgba(134,179,105,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📷</div>
                      <p style={{ fontSize: 14, color: '#f0ede6', fontWeight: 500 }}>Photo upload করো</p>
                      <p style={{ fontSize: 12, color: '#3a3835' }}>JPG, PNG — max 5MB</p>
                      <span style={{ padding: '8px 18px', background: 'rgba(134,179,105,0.08)', border: '1px solid rgba(134,179,105,0.25)', borderRadius: 8, fontSize: 13, color: '#86b369' }}>Browse করো</span>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />

                {/* Summary */}
                <div style={{ marginTop: 28, background: 'rgba(134,179,105,0.04)', border: '1px solid rgba(134,179,105,0.12)', borderRadius: 14, padding: '20px 24px' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#86b369', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>Profile Summary</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {[
                      { l: 'নাম', v: form.fullName },
                      { l: 'Blood Group', v: form.bloodGroup },
                      { l: 'District', v: form.district },
                      { l: 'College', v: form.collegeName },
                      { l: 'University', v: form.universityName },
                      { l: 'Department', v: form.department },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13 }}>
                        <span style={{ color: '#3a3835', minWidth: 90 }}>{item.l}:</span>
                        <span style={{ color: item.v ? '#c8d8b8' : '#2a2825', fontStyle: item.v ? 'normal' : 'italic' }}>
                          {item.v || 'দেওয়া হয়নি'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                {step > 1 && (
                  <button className="btn-back" onClick={prevStep}>← আগে</button>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {step < STEPS.length && (
                  <button className="btn-skip" onClick={nextStep}>Skip</button>
                )}

                {step < STEPS.length ? (
                  <button className="btn-next" onClick={handleNext}>
                    পরের ধাপ →
                  </button>
                ) : (
                  <button className="btn-next" onClick={handleSubmit} disabled={saving}
                    style={{ background: saving ? '#2a2825' : '#86b369', minWidth: 160 }}>
                    {saving ? '⏳ তৈরি হচ্ছে...' : '🎉 Profile তৈরি করো'}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}