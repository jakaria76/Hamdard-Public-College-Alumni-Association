'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

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

const STEPS = [
  { id: 1, label: 'Basic', icon: '👤', desc: 'নাম, লিঙ্গ' },
  { id: 2, label: 'Contact', icon: '📞', desc: 'ঠিকানা' },
  { id: 3, label: 'Education', icon: '🎓', desc: 'শিক্ষা' },
  { id: 4, label: 'Blood', icon: '🩸', desc: 'রক্তের গ্রুপ' },
  { id: 5, label: 'Bio', icon: '✍️', desc: 'পরিচয়' },
  { id: 6, label: 'Photo', icon: '📷', desc: 'ছবি' },
]

export default function ProfileCreatePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const fileInputRef = useRef(null)
  const formCardRef = useRef(null)
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
    if (status === 'unauthenticated') window.location.href = '/login'
  }, [status])

  const scrollTop = () => {
    setTimeout(() => formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
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

  const handleSubmit = async () => {
    setSaving(true); setError('')
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'imageFile' && value) formData.append('imageFile', value)
        else if (value !== '' && value !== null && value !== undefined) formData.append(key, value)
      })
      const res = await fetch('/api/profile', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'কিছু একটা সমস্যা হয়েছে'); setSaving(false) }
      else router.push('/dashboard/profile')
    } catch { setError('Server error হয়েছে'); setSaving(false) }
  }

  const goNext = () => {
    if (step === 1 && !form.fullName.trim()) { setError('নাম দেওয়া বাধ্যতামূলক!'); return }
    setError(''); setStep(s => Math.min(s + 1, STEPS.length)); scrollTop()
  }
  const goBack = () => { setError(''); setStep(s => Math.max(s - 1, 1)); scrollTop() }
  const goSkip = () => { setError(''); setStep(s => Math.min(s + 1, STEPS.length)); scrollTop() }

  if (status === 'loading') return (
    <div style={{ minHeight: '100vh', background: '#060f06', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ position: 'relative', width: 56, height: 56 }}>
        <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(134,179,105,0.12)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', inset: 0, border: '2px solid transparent', borderTopColor: '#86b369', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
      </div>
      <p style={{ color: 'rgba(134,179,105,0.5)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui' }}>Loading</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  const progress = ((step - 1) / (STEPS.length - 1)) * 100
  const userName = session?.user?.name || 'Alumni'
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div style={{ minHeight: '100vh', background: '#060f06', color: '#e8e4db', fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600&family=Noto+Serif+Bengali:wght@500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:translateX(0)}}
        @keyframes barGrow{from{width:0}to{width:var(--w)}}

        .ani{animation:fadeUp 0.45s ease both}
        .step-ani{animation:slideIn 0.3s ease both}

        .glass{
          background:rgba(255,255,255,0.028);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:18px;
        }

        /* Fields */
        .fl{display:block;font-size:10px;font-weight:700;color:rgba(134,179,105,0.5);letter-spacing:1.4px;text-transform:uppercase;margin-bottom:7px}
        .fl .req{color:#f87171;margin-left:3px}

        .fi,.fs,.ft{
          width:100%;padding:12px 14px;
          background:rgba(255,255,255,0.04);
          border:1.5px solid rgba(255,255,255,0.08);
          border-radius:11px;font-size:14px;color:#e8e4db;
          font-family:'Outfit',sans-serif;outline:none;transition:all 0.18s;appearance:none;
        }
        .fi:focus,.fs:focus,.ft:focus{
          border-color:rgba(134,179,105,0.5);
          background:rgba(134,179,105,0.05);
          box-shadow:0 0 0 3px rgba(134,179,105,0.08);
        }
        .fi::placeholder,.ft::placeholder{color:rgba(255,255,255,0.15)}
        .fs option{background:#0c1a0c;color:#e8e4db}
        .ft{resize:vertical;min-height:85px;line-height:1.65}
        .fg{margin-bottom:15px}
        .fr{display:grid;grid-template-columns:1fr 1fr;gap:13px}
        .fr3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:11px}

        /* Section head */
        .sh{display:flex;align-items:center;gap:9px;margin-bottom:15px;margin-top:20px;padding-bottom:10px;border-bottom:1px solid rgba(134,179,105,0.1)}
        .sh:first-child{margin-top:0}
        .sh-i{width:30px;height:30px;border-radius:9px;background:rgba(134,179,105,0.1);border:1px solid rgba(134,179,105,0.18);display:flex;align-items:center;justify-content:center;font-size:14px}
        .sh-t{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:700;color:#c8dba8;letter-spacing:0.3px}

        /* Step pill nav */
        .step-pills{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;padding:2px}
        .step-pills::-webkit-scrollbar{display:none}
        .sp{
          flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:3px;
          padding:9px 14px;border-radius:12px;
          background:transparent;border:1.5px solid transparent;
          cursor:pointer;transition:all 0.18s;
        }
        .sp.done{background:rgba(134,179,105,0.08);border-color:rgba(134,179,105,0.15);cursor:pointer}
        .sp.active{background:rgba(134,179,105,0.12);border-color:rgba(134,179,105,0.25)}
        .sp.pending{opacity:0.35;cursor:default}
        .sp-icon{font-size:18px}
        .sp-label{font-size:10px;font-weight:600;letter-spacing:0.3px;font-family:'Outfit',sans-serif}
        .sp.done .sp-label,.sp.active .sp-label{color:#86b369}
        .sp.pending .sp-label{color:rgba(255,255,255,0.3)}

        /* Blood selector */
        .bo{padding:12px 6px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.07);cursor:pointer;text-align:center;background:rgba(255,255,255,0.02);transition:all 0.16s}
        .bo:hover{border-color:rgba(220,38,38,0.35);background:rgba(220,38,38,0.06)}
        .bo.sel{border-color:#ef4444;background:rgba(220,38,38,0.12)}
        .bt{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:#f87171}

        /* Elig */
        .eo{flex:1;padding:11px 8px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.07);background:transparent;cursor:pointer;text-align:center;font-size:12px;color:#e8e4db;font-family:'Outfit',sans-serif;transition:all 0.16s}

        /* Upload zone */
        .uz{border:2px dashed rgba(134,179,105,0.2);border-radius:18px;padding:40px 24px;text-align:center;cursor:pointer;transition:all 0.2s;background:rgba(134,179,105,0.02)}
        .uz:hover{border-color:rgba(134,179,105,0.5);background:rgba(134,179,105,0.05)}

        /* Buttons */
        .btn-next{
          display:inline-flex;align-items:center;gap:8px;
          padding:13px 28px;
          background:linear-gradient(135deg,#86b369,#6d9a52);
          color:#060f06;border:none;border-radius:12px;font-size:14px;font-weight:700;
          cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.2s;
        }
        .btn-next:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(134,179,105,0.3)}
        .btn-next:disabled{opacity:0.5;cursor:not-allowed;transform:none;box-shadow:none}

        .btn-back{
          display:inline-flex;align-items:center;gap:6px;
          padding:13px 22px;background:transparent;color:rgba(255,255,255,0.3);
          border:1.5px solid rgba(255,255,255,0.08);border-radius:12px;font-size:14px;
          cursor:pointer;font-family:'Outfit',sans-serif;transition:all 0.2s;
        }
        .btn-back:hover{border-color:rgba(255,255,255,0.2);color:rgba(255,255,255,0.6)}

        .btn-skip{
          padding:13px 16px;background:transparent;color:rgba(255,255,255,0.18);
          border:none;font-size:13px;cursor:pointer;font-family:'Outfit',sans-serif;transition:color 0.2s;
        }
        .btn-skip:hover{color:rgba(255,255,255,0.45)}

        /* Error */
        .err{padding:12px 16px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.2);border-radius:10px;font-size:13px;color:#f87171;margin-bottom:16px;display:flex;align-items:center;gap:8px}

        /* Summary item */
        .sum-item{display:flex;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04)}
        .sum-label{font-size:11px;color:rgba(255,255,255,0.25);min-width:80px;flex-shrink:0}
        .sum-val{font-size:13px}

        @media(max-width:600px){
          .fr,.fr3{grid-template-columns:1fr}
          .sp{padding:8px 10px}
        }
      `}</style>

      {/* ── Sticky Top Nav ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(6,15,6,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(134,179,105,0.1)', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.push('/dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: 'rgba(134,179,105,0.6)', fontSize: 13, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>
          ← Dashboard
        </button>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, color: 'rgba(134,179,105,0.45)', fontStyle: 'italic' }}>
          Create Profile
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(134,179,105,0.1)', border: '1.5px solid rgba(134,179,105,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cormorant Garamond, serif', fontSize: 14, fontWeight: 700, color: '#86b369' }}>
            {initials}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 16px 80px' }}>

        {/* ── Page Title ── */}
        <div className="ani" style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(134,179,105,0.08)', border: '1px solid rgba(134,179,105,0.15)', borderRadius: 20, marginBottom: 14 }}>
            <span style={{ fontSize: 14 }}>🌿</span>
            <span style={{ fontSize: 11, color: 'rgba(134,179,105,0.7)', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>HPCAA Alumni</span>
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 700, color: '#e8e4db', marginBottom: 6, lineHeight: 1.2 }}>
            Profile তৈরি করো
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>
            Alumni community তে নিজেকে পরিচয় করিয়ে দাও
          </p>
        </div>

        {/* ── Progress Bar ── */}
        <div className="ani glass" style={{ padding: '16px 18px', marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: 0.5 }}>
              Step {step} / {STEPS.length} — <span style={{ color: '#86b369' }}>{STEPS[step - 1].label}</span>
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: progress >= 80 ? '#86b369' : '#e8e4db' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #4a7c4a, #86b369, #9dc97f)', borderRadius: 2, transition: 'width 0.5s ease' }} />
          </div>

          {/* Step pills */}
          <div className="step-pills" style={{ marginTop: 14 }}>
            {STEPS.map(s => {
              const state = step > s.id ? 'done' : step === s.id ? 'active' : 'pending'
              return (
                <div key={s.id} className={`sp ${state}`}
                  onClick={() => state === 'done' && setStep(s.id)}>
                  <span className="sp-icon">{state === 'done' ? '✓' : s.icon}</span>
                  <span className="sp-label">{s.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Form Card ── */}
        <div ref={formCardRef} className="glass ani" style={{ padding: '22px 20px', marginBottom: 0 }} key={`step-${step}`}>

          {error && <div className="err">⚠️ {error}</div>}

          {/* STEP 1: Basic */}
          {step === 1 && (
            <div className="step-ani">
              <div className="sh"><div className="sh-i">👤</div><span className="sh-t">Basic Information</span></div>
              <div className="fr">
                <div className="fg"><label className="fl">পূর্ণ নাম <span className="req">*</span></label><input className="fi" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" /></div>
                <div className="fg"><label className="fl">বাংলা নাম</label><input className="fi" name="fullNameBn" value={form.fullNameBn} onChange={handleChange} placeholder="তোমার নাম" style={{ fontFamily: 'Noto Serif Bengali, serif' }} /></div>
              </div>
              <div className="fr">
                <div className="fg"><label className="fl">লিঙ্গ</label>
                  <select className="fs" name="gender" value={form.gender} onChange={handleChange}>
                    <option value="">Select করো</option>
                    <option value="male">পুরুষ</option>
                    <option value="female">মহিলা</option>
                    <option value="other">অন্যান্য</option>
                  </select>
                </div>
                <div className="fg"><label className="fl">জন্ম তারিখ</label><input className="fi" type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} /></div>
              </div>
              <div className="fr">
                <div className="fg"><label className="fl">Member Type</label>
                  <select className="fs" name="memberType" value={form.memberType} onChange={handleChange}>
                    <option value="general">General Member</option>
                    <option value="life">Life Member</option>
                    <option value="honorary">Honorary Member</option>
                  </select>
                </div>
                <div className="fg"><label className="fl">Member Since</label><input className="fi" type="date" name="memberSince" value={form.memberSince} onChange={handleChange} /></div>
              </div>
              <div className="fg"><label className="fl">Committee Position</label><input className="fi" name="committeePosition" value={form.committeePosition} onChange={handleChange} placeholder="সভাপতি, সম্পাদক, সদস্য..." /></div>
            </div>
          )}

          {/* STEP 2: Contact */}
          {step === 2 && (
            <div className="step-ani">
              <div className="sh"><div className="sh-i">📞</div><span className="sh-t">Contact</span></div>
              <div className="fg"><label className="fl">বর্তমান ঠিকানা</label><textarea className="ft" name="presentAddress" value={form.presentAddress} onChange={handleChange} placeholder="তোমার বর্তমান ঠিকানা" rows={3} /></div>
              <div className="fg"><label className="fl">স্থায়ী ঠিকানা</label><textarea className="ft" name="permanentAddress" value={form.permanentAddress} onChange={handleChange} placeholder="তোমার স্থায়ী ঠিকানা" rows={3} /></div>
              <div className="fr">
                <div className="fg"><label className="fl">জেলা</label>
                  <select className="fs" name="district" value={form.district} onChange={handleChange}>
                    <option value="">জেলা select করো</option>
                    {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="fg"><label className="fl">উপজেলা</label><input className="fi" name="upazila" value={form.upazila} onChange={handleChange} placeholder="উপজেলার নাম" /></div>
              </div>
              <div className="fr">
                <div className="fg"><label className="fl">Alternative Mobile</label><input className="fi" name="alternativeMobile" value={form.alternativeMobile} onChange={handleChange} placeholder="01XXXXXXXXX" /></div>
                <div className="fg"><label className="fl">WhatsApp</label><input className="fi" name="whatsAppNumber" value={form.whatsAppNumber} onChange={handleChange} placeholder="01XXXXXXXXX" /></div>
              </div>
              <div className="fg"><label className="fl">Facebook Link</label><input className="fi" name="facebookLink" value={form.facebookLink} onChange={handleChange} placeholder="https://facebook.com/yourname" /></div>
            </div>
          )}

          {/* STEP 3: Education */}
          {step === 3 && (
            <div className="step-ani">
              <div className="sh"><div className="sh-i">🏫</div><span className="sh-t">School</span></div>
              <div className="fr">
                <div className="fg"><label className="fl">স্কুল</label><input className="fi" name="schoolName" value={form.schoolName} onChange={handleChange} placeholder="স্কুলের পূর্ণ নাম" /></div>
                <div className="fg"><label className="fl">Group</label><input className="fi" name="schoolGroup" value={form.schoolGroup} onChange={handleChange} placeholder="বিজ্ঞান / মানবিক" /></div>
              </div>
              <div className="fg" style={{ maxWidth: 160 }}><label className="fl">Passing Year</label><input className="fi" type="number" name="schoolPassingYear" value={form.schoolPassingYear} onChange={handleChange} placeholder="2018" /></div>

              <div className="sh"><div className="sh-i">🏛️</div><span className="sh-t">College</span></div>
              <div className="fr">
                <div className="fg"><label className="fl">কলেজ</label><input className="fi" name="collegeName" value={form.collegeName} onChange={handleChange} placeholder="কলেজের পূর্ণ নাম" /></div>
                <div className="fg"><label className="fl">বিভাগ</label>
                  <select className="fs" name="collegeGroup" value={form.collegeGroup} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="science">বিজ্ঞান</option>
                    <option value="arts">মানবিক</option>
                    <option value="commerce">বাণিজ্য</option>
                  </select>
                </div>
              </div>
              <div className="fg" style={{ maxWidth: 160 }}><label className="fl">Passing Year</label><input className="fi" type="number" name="collegePassingYear" value={form.collegePassingYear} onChange={handleChange} placeholder="2020" /></div>

              <div className="sh"><div className="sh-i">🎓</div><span className="sh-t">University</span></div>
              <div className="fr">
                <div className="fg"><label className="fl">University</label><input className="fi" name="universityName" value={form.universityName} onChange={handleChange} placeholder="University name" /></div>
                <div className="fg"><label className="fl">Department</label><input className="fi" name="department" value={form.department} onChange={handleChange} placeholder="CSE, EEE, BBA..." /></div>
              </div>
              <div className="fr3">
                <div className="fg"><label className="fl">Student ID</label><input className="fi" name="studentId" value={form.studentId} onChange={handleChange} placeholder="2021-1-60-XXX" /></div>
                <div className="fg"><label className="fl">Year</label>
                  <select className="fs" name="currentYear" value={form.currentYear} onChange={handleChange}>
                    <option value="">Select</option>
                    {[1,2,3,4,5].map(y => <option key={y} value={y}>{y}ম বর্ষ</option>)}
                  </select>
                </div>
                <div className="fg"><label className="fl">Semester</label>
                  <select className="fs" name="currentSemester" value={form.currentSemester} onChange={handleChange}>
                    <option value="">Select</option>
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(s => <option key={s} value={s}>{s}ম</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Blood */}
          {step === 4 && (
            <div className="step-ani">
              <div className="sh"><div className="sh-i">🩸</div><span className="sh-t">Blood Information</span></div>
              <div className="fg">
                <label className="fl">Blood Group</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 4 }}>
                  {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => (
                    <div key={bg} className={`bo${form.bloodGroup === bg ? ' sel' : ''}`}
                      onClick={() => setForm(p => ({ ...p, bloodGroup: bg }))}>
                      <div className="bt">{bg}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="fg">
                <label className="fl">Donation Eligibility</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { v: 'eligible', l: '✅ Eligible', c: '#86b369', bc: 'rgba(134,179,105,0.12)' },
                    { v: 'not_eligible', l: '❌ Not Eligible', c: '#ef4444', bc: 'rgba(220,38,38,0.1)' },
                    { v: 'unknown', l: '❓ জানি না', c: '#86b369', bc: 'rgba(134,179,105,0.06)' },
                  ].map(opt => (
                    <div key={opt.v} className="eo"
                      onClick={() => setForm(p => ({ ...p, donationEligibility: opt.v }))}
                      style={{
                        border: `1.5px solid ${form.donationEligibility === opt.v ? opt.c : 'rgba(255,255,255,0.07)'}`,
                        background: form.donationEligibility === opt.v ? opt.bc : 'transparent',
                        color: form.donationEligibility === opt.v ? opt.c : 'rgba(255,255,255,0.35)',
                      }}>
                      {opt.l}
                    </div>
                  ))}
                </div>
              </div>
              <div className="fr">
                <div className="fg"><label className="fl">Last Donation</label><input className="fi" type="date" name="lastDonationDate" value={form.lastDonationDate} onChange={handleChange} /></div>
                <div className="fg"><label className="fl">Next Available</label><input className="fi" type="date" name="nextAvailableDonationDate" value={form.nextAvailableDonationDate} onChange={handleChange} /></div>
              </div>
              <div className="fr">
                <div className="fg"><label className="fl">Total Donations</label><input className="fi" type="number" min="0" name="totalDonationCount" value={form.totalDonationCount} onChange={handleChange} placeholder="0" /></div>
                <div className="fg"><label className="fl">Preferred Location</label><input className="fi" name="preferredDonationLocation" value={form.preferredDonationLocation} onChange={handleChange} placeholder="DMCH, CMH..." /></div>
              </div>
            </div>
          )}

          {/* STEP 5: Bio & Social */}
          {step === 5 && (
            <div className="step-ani">
              <div className="sh"><div className="sh-i">✍️</div><span className="sh-t">Personal Bio</span></div>
              <div className="fg">
                <label className="fl">Short Bio</label>
                <textarea className="ft" name="shortBio" value={form.shortBio} onChange={handleChange} placeholder="নিজের সম্পর্কে সংক্ষিপ্ত পরিচয়..." rows={4} />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 4, display: 'block' }}>{form.shortBio.length} / 500</span>
              </div>
              <div className="fr">
                <div className="fg"><label className="fl">কেন join করলে?</label><textarea className="ft" name="whyJoined" value={form.whyJoined} onChange={handleChange} placeholder="তোমার কারণ..." rows={3} /></div>
                <div className="fg"><label className="fl">Future Goals</label><textarea className="ft" name="futureGoals" value={form.futureGoals} onChange={handleChange} placeholder="তোমার লক্ষ্য..." rows={3} /></div>
              </div>
              <div className="fg"><label className="fl">Hobbies</label><input className="fi" name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="Reading, Coding, Photography..." /></div>

              <div className="sh"><div className="sh-i">🔗</div><span className="sh-t">Social Links</span></div>
              <div className="fg">
                <label className="fl">Facebook</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 15 }}>📘</span>
                  <input className="fi" name="facebook" value={form.facebook} onChange={handleChange} placeholder="https://facebook.com/yourprofile" style={{ paddingLeft: 38 }} />
                </div>
              </div>
              <div className="fg">
                <label className="fl">Portfolio / Website</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 15 }}>🌐</span>
                  <input className="fi" name="portfolioWebsite" value={form.portfolioWebsite} onChange={handleChange} placeholder="https://yourwebsite.com" style={{ paddingLeft: 38 }} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Photo + Summary */}
          {step === 6 && (
            <div className="step-ani">
              <div className="sh"><div className="sh-i">📷</div><span className="sh-t">Profile Photo</span></div>
              <div className="uz" onClick={() => fileInputRef.current?.click()}>
                {preview ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                    <img src={preview} alt="preview" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(134,179,105,0.5)', boxShadow: '0 8px 28px rgba(134,179,105,0.2)' }} />
                    <p style={{ fontSize: 13, color: '#86b369' }}>✅ Photo selected — click to change</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(134,179,105,0.07)', border: '2px dashed rgba(134,179,105,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>📷</div>
                    <p style={{ fontSize: 14, color: '#e8e4db', fontWeight: 500 }}>Photo upload করো</p>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>JPG, PNG — max 5MB</p>
                    <span style={{ padding: '8px 18px', background: 'rgba(134,179,105,0.08)', border: '1px solid rgba(134,179,105,0.2)', borderRadius: 8, fontSize: 12, color: '#86b369' }}>Browse করো</span>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />

              {/* Summary */}
              <div style={{ marginTop: 20, background: 'rgba(134,179,105,0.04)', border: '1px solid rgba(134,179,105,0.1)', borderRadius: 14, padding: '18px 18px' }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(134,179,105,0.5)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Profile Summary</p>
                {[
                  { l: 'নাম', v: form.fullName },
                  { l: 'Blood', v: form.bloodGroup },
                  { l: 'District', v: form.district },
                  { l: 'College', v: form.collegeName },
                  { l: 'University', v: form.universityName },
                  { l: 'Dept', v: form.department },
                ].map((item, i) => (
                  <div key={i} className="sum-item">
                    <span className="sum-label">{item.l}</span>
                    <span className="sum-val" style={{ color: item.v ? '#c8dba8' : 'rgba(255,255,255,0.15)', fontStyle: item.v ? 'normal' : 'italic' }}>
                      {item.v || 'দেওয়া হয়নি'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ── Sticky Bottom Navigation ── */}
        <div style={{ position: 'sticky', bottom: 0, zIndex: 50, background: 'rgba(6,15,6,0.97)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 0 }}>
          <div>
            {step > 1 && (
              <button className="btn-back" onClick={goBack}>← আগে</button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {step < STEPS.length && (
              <button className="btn-skip" onClick={goSkip}>Skip</button>
            )}
            {step < STEPS.length ? (
              <button className="btn-next" onClick={goNext}>
                পরের ধাপ →
              </button>
            ) : (
              <button className="btn-next" onClick={handleSubmit} disabled={saving}
                style={{ background: saving ? 'rgba(134,179,105,0.3)' : 'linear-gradient(135deg,#86b369,#6d9a52)', minWidth: 160, justifyContent: 'center' }}>
                {saving ? '⏳ তৈরি হচ্ছে...' : '🎉 Profile তৈরি করো'}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}