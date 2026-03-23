'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProfileViewPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') { window.location.href = '/login'; return }
    if (status === 'authenticated') fetchProfile()
  }, [status])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      const data = await res.json()
      setProfile(data.profile)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0c1a0c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ width: 52, height: 52, border: '3px solid #86b369', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: '#86b369', fontSize: 13, fontFamily: 'DM Sans, sans-serif', letterSpacing: 1, textTransform: 'uppercase' }}>Loading Profile</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const userName = session?.user?.name || 'Alumni'
  const userInitial = userName.charAt(0).toUpperCase()
  const avatar = profile?.profileImagePath || session?.user?.image || null

  const completionFields = [
    profile?.fullName, profile?.dateOfBirth, profile?.gender,
    profile?.bloodGroup, profile?.presentAddress, profile?.district,
    profile?.collegeName, profile?.collegePassingYear, profile?.universityName,
    profile?.shortBio, profile?.facebook, profile?.profileImagePath,
  ]
  const filled = completionFields.filter(Boolean).length
  const completion = Math.round((filled / completionFields.length) * 100)

  const Val = ({ v, fallback = '—' }) => v
    ? <span style={{ color: '#1a1a1a', fontWeight: 400 }}>{v}</span>
    : <span style={{ color: '#ccc', fontStyle: 'italic', fontSize: 13 }}>{fallback}</span>

  return (
    <div style={{ minHeight: '100vh', background: '#f7f4ef', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=Noto+Serif+Bengali:wght@500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes barGrow { from { width: 0; } to { width: var(--w); } }

        .ani-1 { animation: fadeUp 0.5s ease 0.05s both; }
        .ani-2 { animation: fadeUp 0.5s ease 0.15s both; }
        .ani-3 { animation: fadeUp 0.5s ease 0.25s both; }
        .ani-4 { animation: fadeUp 0.5s ease 0.35s both; }
        .ani-5 { animation: fadeUp 0.5s ease 0.45s both; }

        /* Cards */
        .card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        .card-head {
          padding: 18px 26px;
          display: flex; align-items: center; gap: 12px;
          border-bottom: 1px solid #f0ede6;
          background: linear-gradient(to right, #fafaf8, #fff);
        }

        .card-icon {
          width: 38px; height: 38px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; flex-shrink: 0;
        }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 15px; font-weight: 700; color: #1a1a1a;
          letter-spacing: 0.2px;
        }

        .card-body { padding: 22px 26px; }

        /* Grid */
        .ig { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .ig-full { grid-column: 1 / -1; }

        /* Field */
        .fl { font-size: 10px; font-weight: 700; color: #bbb; letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 4px; }
        .fv { font-size: 14px; color: #1a1a1a; line-height: 1.5; font-weight: 400; }

        /* Section Sub-heading */
        .sub-head {
          font-size: 11px; font-weight: 700; color: #86b369;
          letter-spacing: 1.5px; text-transform: uppercase;
          margin-bottom: 14px; display: flex; align-items: center; gap: 6px;
        }

        /* Divider */
        .div-line { height: 1px; background: linear-gradient(to right, #f0ede6, transparent); margin: 18px 0; }

        /* Badge */
        .bdg {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 12px; border-radius: 20px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
        }

        /* Social */
        .soc-link {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 16px; border-radius: 10px;
          font-size: 13px; color: #444; text-decoration: none;
          border: 1px solid #e8e4dc; background: #fafaf8;
          transition: all 0.2s;
        }
        .soc-link:hover { border-color: #86b369; color: #1a2e1a; background: #f0f8ee; transform: translateY(-1px); }

        /* Blood badge */
        .bb {
          width: 64px; height: 64px; border-radius: 50%;
          background: linear-gradient(135deg, #dc2626, #991b1b);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 18px; font-weight: 900; color: #fff;
          box-shadow: 0 6px 20px rgba(220,38,38,0.3); flex-shrink: 0;
        }

        /* Action buttons */
        .btn-edit {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px; background: #1a2e1a; color: #f0ede6;
          border: none; border-radius: 10px; font-size: 13px; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .btn-edit:hover { background: #243d24; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(26,46,26,0.25); }

        .btn-del {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 18px; background: transparent; color: #dc2626;
          border: 1.5px solid rgba(220,38,38,0.25); border-radius: 10px;
          font-size: 13px; font-weight: 500; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .btn-del:hover { background: rgba(220,38,38,0.05); border-color: #dc2626; }

        /* Completion bar */
        .bar-bg { height: 5px; background: #f0ede6; border-radius: 3px; overflow: hidden; margin-top: 6px; }
        .bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #86b369, #b8d498); animation: barGrow 1.2s ease forwards; }

        /* Cover */
        .cover {
          height: 180px;
          background: linear-gradient(135deg, #0d1a0d 0%, #1a2e1a 35%, #243d24 65%, #0d1a0d 100%);
          position: relative; overflow: hidden;
        }
        .cover::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 15% 50%, rgba(134,179,105,0.2) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 20%, rgba(134,179,105,0.12) 0%, transparent 45%);
        }
        .cover::after {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            -45deg, transparent, transparent 30px,
            rgba(134,179,105,0.025) 30px, rgba(134,179,105,0.025) 31px
          );
        }
        .cover-text {
          position: absolute; bottom: 20px; right: 28px;
          font-family: 'Playfair Display', serif;
          font-size: 11px; color: rgba(134,179,105,0.5);
          letter-spacing: 3px; text-transform: uppercase;
        }

        /* Avatar */
        .av-wrap {
          position: absolute; bottom: -60px; left: 36px;
          width: 120px; height: 120px; border-radius: 50%;
          border: 5px solid #f7f4ef;
          overflow: hidden; background: #1a2e1a;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 28px rgba(0,0,0,0.18);
        }

        /* Empty state */
        .empty-state {
          text-align: center; padding: 64px 32px;
        }
        .empty-icon {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, #f0f8ee, #e0f0d0);
          display: flex; align-items: center; justify-content: center;
          font-size: 36px; margin: 0 auto 20px;
          border: 2px dashed rgba(134,179,105,0.3);
        }

        @media (max-width: 768px) {
          .ig { grid-template-columns: 1fr; }
          .main-cols { grid-template-columns: 1fr !important; }
          .av-wrap { width: 90px; height: 90px; left: 24px; bottom: -45px; }
          .cover { height: 140px; }
        }
      `}</style>

      {/* ── Top Action Bar ── */}
      <div style={{ background: 'linear-gradient(to right, #0d1a0d, #1a2e1a)', padding: '13px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(134,179,105,0.15)' }}>
        <button onClick={() => router.push('/dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', color: '#86b369', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
          ← Dashboard
        </button>

        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 14, color: '#c8d8b8', fontStyle: 'italic' }}>
          Alumni Profile
        </span>

        <div style={{ display: 'flex', gap: 10 }}>
          {profile ? (
            <>
              <button className="btn-edit" onClick={() => router.push('/dashboard/profile/edit')}>
                ✏️ Edit
              </button>
              <button className="btn-del" onClick={async () => {
                if (confirm('Profile delete করতে চাও?')) {
                  await fetch('/api/profile', { method: 'DELETE' })
                  setProfile(null)
                }
              }}>
                🗑️
              </button>
            </>
          ) : (
            <button className="btn-edit" onClick={() => router.push('/dashboard/profile/create')}>
              + Create Profile
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '32px 24px 64px' }}>

        {/* ── Hero Card ── */}
        <div className="card ani-1" style={{ marginBottom: 24, position: 'relative' }}>
          <div className="cover">
            <div className="cover-text">HPCAA Alumni</div>
          </div>

          <div className="av-wrap">
            {avatar ? (
              <img src={avatar} alt={userName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 44, fontWeight: 900, color: '#86b369' }}>{userInitial}</span>
            )}
          </div>

          <div style={{ padding: '80px 36px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>

              <div style={{ flex: 1 }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 900, color: '#0d1a0d', marginBottom: 4, lineHeight: 1.2 }}>
                  {profile?.fullName || userName}
                </h1>
                {profile?.fullNameBn && (
                  <p style={{ fontFamily: 'Noto Serif Bengali, serif', fontSize: 19, color: '#2a5c2a', marginBottom: 10, fontWeight: 600 }}>
                    {profile.fullNameBn}
                  </p>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 12 }}>
                  {profile?.memberType && (
                    <span className="bdg" style={{ background: '#fef9ee', color: '#92400e', border: '1px solid #fde68a' }}>
                      ⭐ {profile.memberType === 'life' ? 'Life Member' : profile.memberType === 'honorary' ? 'Honorary Member' : 'General Member'}
                    </span>
                  )}
                  {profile?.committeePosition && (
                    <span className="bdg" style={{ background: '#f0f8ee', color: '#1a4d1a', border: '1px solid #c8e6b0' }}>
                      🏛️ {profile.committeePosition}
                    </span>
                  )}
                  {session?.user?.role && (
                    <span className="bdg" style={{ background: '#f0f4ff', color: '#1e40af', border: '1px solid #bfdbfe' }}>
                      🎓 {session.user.role}
                    </span>
                  )}
                  {profile?.bloodGroup && (
                    <span className="bdg" style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}>
                      🩸 {profile.bloodGroup}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13, color: '#888' }}>
                  <span>📧 {session?.user?.email}</span>
                  {profile?.district && <span>📍 {profile.district}{profile.upazila ? `, ${profile.upazila}` : ''}</span>}
                  {profile?.memberSince && <span>📅 Member since {new Date(profile.memberSince).getFullYear()}</span>}
                </div>

                {/* Social */}
                {(profile?.facebook || profile?.portfolioWebsite || profile?.whatsAppNumber) && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                    {profile?.facebook && <a href={profile.facebook} target="_blank" rel="noreferrer" className="soc-link">📘 Facebook</a>}
                    {profile?.portfolioWebsite && <a href={profile.portfolioWebsite} target="_blank" rel="noreferrer" className="soc-link">🌐 Portfolio</a>}
                    {profile?.whatsAppNumber && <a href={`https://wa.me/${profile.whatsAppNumber}`} target="_blank" rel="noreferrer" className="soc-link">💬 WhatsApp</a>}
                  </div>
                )}
              </div>

              {/* Completion */}
              <div style={{ background: 'linear-gradient(135deg, #f8f8f6, #f0f8ee)', borderRadius: 16, padding: '20px 24px', minWidth: 170, border: '1px solid rgba(134,179,105,0.2)' }}>
                <div style={{ fontSize: 10, color: '#86b369', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>Profile Complete</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 900, color: completion >= 80 ? '#1a4d1a' : completion >= 50 ? '#b45309' : '#dc2626', lineHeight: 1 }}>
                  {completion}%
                </div>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ '--w': `${completion}%`, width: `${completion}%` }} />
                </div>
                <p style={{ fontSize: 11, color: '#888', marginTop: 8, lineHeight: 1.5 }}>
                  {completion < 100 ? `${completionFields.length - filled} fields বাকি` : '✅ সম্পূর্ণ!'}
                </p>
              </div>

            </div>

            {/* Bio Quote */}
            {profile?.shortBio && (
              <div style={{ marginTop: 20, padding: '16px 20px', background: 'linear-gradient(to right, #f0f8ee, #f7fdf4)', borderRadius: 12, borderLeft: '4px solid #86b369' }}>
                <p style={{ fontSize: 14, color: '#2a5c2a', lineHeight: 1.8, fontStyle: 'italic', fontFamily: 'Playfair Display, serif' }}>
                  &ldquo;{profile.shortBio}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── No Profile ── */}
        {!profile && (
          <div className="card ani-2">
            <div className="empty-state">
              <div className="empty-icon">👤</div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#1a1a1a', marginBottom: 10 }}>
                Profile তৈরি হয়নি
              </h2>
              <p style={{ fontSize: 14, color: '#888', marginBottom: 28, maxWidth: 360, margin: '0 auto 28px', lineHeight: 1.7 }}>
                তোমার profile তৈরি করো এবং HPCAA alumni community তে নিজেকে পরিচয় করিয়ে দাও।
              </p>
              <button className="btn-edit" onClick={() => router.push('/dashboard/profile/create')}
                style={{ fontSize: 14, padding: '13px 32px' }}>
                + Profile তৈরি করো
              </button>
            </div>
          </div>
        )}

        {profile && (
          <div className="main-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

            {/* ── LEFT ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Basic */}
              <div className="card ani-2">
                <div className="card-head">
                  <div className="card-icon" style={{ background: '#f0f8ee' }}>👤</div>
                  <span className="card-title">Basic Information</span>
                </div>
                <div className="card-body">
                  <div className="ig">
                    <div><div className="fl">পূর্ণ নাম</div><div className="fv"><Val v={profile.fullName} /></div></div>
                    <div><div className="fl">বাংলা নাম</div><div className="fv" style={{ fontFamily: 'Noto Serif Bengali, serif' }}><Val v={profile.fullNameBn} /></div></div>
                    <div><div className="fl">লিঙ্গ</div><div className="fv"><Val v={profile.gender === 'male' ? '♂ পুরুষ' : profile.gender === 'female' ? '♀ মহিলা' : profile.gender} /></div></div>
                    <div><div className="fl">জন্ম তারিখ</div><div className="fv"><Val v={profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('bn-BD') : null} /></div></div>
                    <div><div className="fl">Member Type</div><div className="fv"><Val v={profile.memberType} /></div></div>
                    <div><div className="fl">Position</div><div className="fv"><Val v={profile.committeePosition} fallback="নেই" /></div></div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="card ani-3">
                <div className="card-head">
                  <div className="card-icon" style={{ background: '#eff6ff' }}>📞</div>
                  <span className="card-title">Contact</span>
                </div>
                <div className="card-body">
                  <div className="ig">
                    <div className="ig-full"><div className="fl">বর্তমান ঠিকানা</div><div className="fv"><Val v={profile.presentAddress} /></div></div>
                    <div className="ig-full"><div className="fl">স্থায়ী ঠিকানা</div><div className="fv"><Val v={profile.permanentAddress} /></div></div>
                    <div><div className="fl">জেলা</div><div className="fv"><Val v={profile.district} /></div></div>
                    <div><div className="fl">উপজেলা</div><div className="fv"><Val v={profile.upazila} /></div></div>
                    <div><div className="fl">Mobile</div><div className="fv"><Val v={profile.alternativeMobile} /></div></div>
                    <div><div className="fl">WhatsApp</div><div className="fv"><Val v={profile.whatsAppNumber} /></div></div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="card ani-4">
                <div className="card-head">
                  <div className="card-icon" style={{ background: '#fff8f0' }}>✍️</div>
                  <span className="card-title">Personal Bio</span>
                </div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {[
                    { l: 'Short Bio', v: profile.shortBio },
                    { l: 'কেন join করলে', v: profile.whyJoined },
                    { l: 'Future Goals', v: profile.futureGoals },
                    { l: 'Hobbies', v: profile.hobbies },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="fl">{item.l}</div>
                      <div className="fv" style={{ marginTop: 5, lineHeight: 1.8 }}><Val v={item.v} /></div>
                      {i < 3 && <div className="div-line" />}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── RIGHT ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Education */}
              <div className="card ani-2">
                <div className="card-head">
                  <div className="card-icon" style={{ background: '#fefce8' }}>🎓</div>
                  <span className="card-title">Education</span>
                </div>
                <div className="card-body">
                  <div className="sub-head">🏫 স্কুল</div>
                  <div className="ig" style={{ marginBottom: 16 }}>
                    <div><div className="fl">স্কুল</div><div className="fv"><Val v={profile.schoolName} /></div></div>
                    <div><div className="fl">Group</div><div className="fv"><Val v={profile.schoolGroup} /></div></div>
                    <div><div className="fl">Passing Year</div><div className="fv"><Val v={profile.schoolPassingYear} /></div></div>
                  </div>

                  <div className="div-line" />
                  <div className="sub-head">🏛️ কলেজ</div>
                  <div className="ig" style={{ marginBottom: 16 }}>
                    <div><div className="fl">কলেজ</div><div className="fv"><Val v={profile.collegeName} /></div></div>
                    <div><div className="fl">বিভাগ</div><div className="fv"><Val v={profile.collegeGroup === 'science' ? 'বিজ্ঞান' : profile.collegeGroup === 'arts' ? 'মানবিক' : profile.collegeGroup === 'commerce' ? 'বাণিজ্য' : profile.collegeGroup} /></div></div>
                    <div><div className="fl">Passing Year</div><div className="fv"><Val v={profile.collegePassingYear} /></div></div>
                  </div>

                  <div className="div-line" />
                  <div className="sub-head">🎓 বিশ্ববিদ্যালয়</div>
                  <div className="ig">
                    <div className="ig-full"><div className="fl">University</div><div className="fv"><Val v={profile.universityName} /></div></div>
                    <div><div className="fl">Department</div><div className="fv"><Val v={profile.department} /></div></div>
                    <div><div className="fl">Student ID</div><div className="fv"><Val v={profile.studentId} /></div></div>
                    <div><div className="fl">Year</div><div className="fv"><Val v={profile.currentYear ? `${profile.currentYear}ম বর্ষ` : null} /></div></div>
                    <div><div className="fl">Semester</div><div className="fv"><Val v={profile.currentSemester ? `${profile.currentSemester}ম` : null} /></div></div>
                  </div>
                </div>
              </div>

              {/* Blood */}
              <div className="card ani-3">
                <div className="card-head">
                  <div className="card-icon" style={{ background: '#fff1f2' }}>🩸</div>
                  <span className="card-title">Blood Information</span>
                </div>
                <div className="card-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20, padding: '16px', background: 'linear-gradient(135deg, #fff1f2, #fff)', borderRadius: 14, border: '1px solid #fecdd3' }}>
                    {profile.bloodGroup
                      ? <div className="bb">{profile.bloodGroup}</div>
                      : <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f0ede6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🩸</div>
                    }
                    <div>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 900, color: '#1a1a1a', marginBottom: 4 }}>
                        {profile.bloodGroup || 'জানা নেই'}
                      </div>
                      <div style={{ fontSize: 11, color: '#888', marginBottom: 6 }}>Blood Group</div>
                      {profile.donationEligibility && (
                        <span className="bdg" style={{
                          background: profile.donationEligibility === 'eligible' ? '#f0fdf4' : '#fef2f2',
                          color: profile.donationEligibility === 'eligible' ? '#15803d' : '#dc2626',
                          border: `1px solid ${profile.donationEligibility === 'eligible' ? '#bbf7d0' : '#fecaca'}`,
                        }}>
                          {profile.donationEligibility === 'eligible' ? '✅ Eligible to Donate' : '⏸ Not Eligible'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="ig">
                    <div><div className="fl">Last Donation</div><div className="fv"><Val v={profile.lastDonationDate ? new Date(profile.lastDonationDate).toLocaleDateString('bn-BD') : null} /></div></div>
                    <div><div className="fl">Next Available</div><div className="fv"><Val v={profile.nextAvailableDonationDate ? new Date(profile.nextAvailableDonationDate).toLocaleDateString('bn-BD') : null} /></div></div>
                    <div>
                      <div className="fl">Total Donations</div>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 900, color: '#dc2626', lineHeight: 1.1 }}>
                        {profile.totalDonationCount || 0}
                        <span style={{ fontSize: 12, color: '#888', fontFamily: 'DM Sans, sans-serif', fontWeight: 400, marginLeft: 4 }}>বার</span>
                      </div>
                    </div>
                    <div><div className="fl">Preferred Location</div><div className="fv"><Val v={profile.preferredDonationLocation} /></div></div>
                  </div>
                </div>
              </div>

              {/* Location */}
              {(profile.latitude && profile.longitude) && (
                <div className="card ani-4">
                  <div className="card-head">
                    <div className="card-icon" style={{ background: '#eff6ff' }}>📍</div>
                    <span className="card-title">Location</span>
                  </div>
                  <div className="card-body">
                    <div className="ig" style={{ marginBottom: 16 }}>
                      <div><div className="fl">Latitude</div><div className="fv">{profile.latitude}</div></div>
                      <div><div className="fl">Longitude</div><div className="fv">{profile.longitude}</div></div>
                      {profile.locationDms && (
                        <div className="ig-full"><div className="fl">DMS</div><div className="fv">{profile.locationDms}</div></div>
                      )}
                    </div>
                    <a href={`https://maps.google.com/?q=${profile.latitude},${profile.longitude}`}
                      target="_blank" rel="noreferrer" className="soc-link">
                      🗺️ Google Maps এ দেখো
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  )
}