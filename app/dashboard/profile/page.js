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
    if (status === 'unauthenticated') {
      window.location.href = '/login'
      return
    }
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
      <div style={{ minHeight: '100vh', background: '#0a0f0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '3px solid #86b369', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#7a7570', fontSize: 14, fontFamily: 'DM Sans, sans-serif' }}>Loading profile...</p>
        </div>
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

  return (
    <div style={{ minHeight: '100vh', background: '#f4f1eb', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&family=Noto+Serif+Bengali:wght@500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.5s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.5s ease 0.2s both; }
        .fade-up-3 { animation: fadeUp 0.5s ease 0.3s both; }
        .fade-up-4 { animation: fadeUp 0.5s ease 0.4s both; }
        .fade-up-5 { animation: fadeUp 0.5s ease 0.5s both; }

        .section-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .section-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); }

        .section-header {
          padding: 20px 28px;
          border-bottom: 1px solid #f0ede6;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .section-body { padding: 24px 28px; }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .info-item {}

        .info-label {
          font-size: 11px;
          font-weight: 600;
          color: #aaa;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .info-value {
          font-size: 14px;
          color: #333;
          font-weight: 400;
          line-height: 1.5;
        }

        .info-value.empty {
          color: #ccc;
          font-style: italic;
          font-size: 13px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .edit-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          background: #1a2e1a;
          color: #f0ede6;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
          text-decoration: none;
        }
        .edit-btn:hover { background: #243d24; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(26,46,26,0.3); }

        .delete-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: transparent;
          color: #dc2626;
          border: 1px solid rgba(220,38,38,0.3);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .delete-btn:hover { background: rgba(220,38,38,0.05); border-color: #dc2626; }

        .progress-bar-bg {
          height: 6px;
          background: #f0ede6;
          border-radius: 3px;
          overflow: hidden;
          margin-top: 8px;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 3px;
          background: linear-gradient(90deg, #86b369, #9dc97f);
          transition: width 1s ease;
        }

        .cover-pattern {
          height: 160px;
          background: linear-gradient(135deg, #1a2e1a 0%, #0d1f0d 40%, #1a3a1a 70%, #243d24 100%);
          position: relative;
          overflow: hidden;
        }

        .cover-pattern::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 50%, rgba(134,179,105,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(134,179,105,0.1) 0%, transparent 40%);
        }

        .cover-pattern::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(134,179,105,0.03) 20px,
            rgba(134,179,105,0.03) 21px
          );
        }

        .avatar-ring {
          width: 110px; height: 110px;
          border-radius: 50%;
          border: 4px solid #fff;
          overflow: hidden;
          background: #1a2e1a;
          display: flex; align-items: center; justify-content: center;
          position: absolute;
          bottom: -55px;
          left: 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .social-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border: 1px solid #e0ddd6;
          border-radius: 8px;
          font-size: 13px;
          color: #555;
          text-decoration: none;
          transition: all 0.2s;
          background: #fafaf8;
        }
        .social-link:hover { border-color: #86b369; color: #1a2e1a; background: #f0f8ee; }

        .blood-badge {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 700; color: #fff;
          font-family: 'Playfair Display', serif;
          box-shadow: 0 4px 12px rgba(220,38,38,0.3);
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .info-grid { grid-template-columns: 1fr; }
          .main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Back button + Actions ── */}
      <div style={{ background: '#1a2e1a', padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.push('/dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', color: '#c8d8b8', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
          ← Dashboard এ ফিরে যাও
        </button>
        <div style={{ display: 'flex', gap: 10 }}>
          {profile ? (
            <>
              <button className="edit-btn" onClick={() => router.push('/dashboard/profile/edit')}>
                ✏️ Edit Profile
              </button>
              <button className="delete-btn" onClick={async () => {
                if (confirm('Profile delete করতে চাও?')) {
                  await fetch('/api/profile', { method: 'DELETE' })
                  setProfile(null)
                }
              }}>
                🗑️ Delete
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => router.push('/dashboard/profile/create')}>
              + Profile তৈরি করো
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>

        {/* ── Hero Card ── */}
        <div className="section-card fade-up" style={{ marginBottom: 24, position: 'relative' }}>

          {/* Cover */}
          <div className="cover-pattern" />

          {/* Avatar */}
          <div className="avatar-ring">
            {avatar ? (
              <img src={avatar} alt={userName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, fontWeight: 900, color: '#86b369' }}>
                {userInitial}
              </span>
            )}
          </div>

          {/* Name area */}
          <div style={{ padding: '72px 32px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 900, color: '#1a1a1a', marginBottom: 4 }}>
                  {profile?.fullName || userName}
                </h1>
                {profile?.fullNameBn && (
                  <p style={{ fontFamily: 'Noto Serif Bengali, serif', fontSize: 18, color: '#555', marginBottom: 8 }}>
                    {profile.fullNameBn}
                  </p>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  {profile?.committeePosition && (
                    <span className="badge" style={{ background: '#f0f8ee', color: '#1a2e1a', border: '1px solid #c8e6b0' }}>
                      🏛️ {profile.committeePosition}
                    </span>
                  )}
                  {profile?.memberType && (
                    <span className="badge" style={{ background: '#fef9ee', color: '#92400e', border: '1px solid #fde68a' }}>
                      ⭐ {profile.memberType === 'life' ? 'Life Member' : profile.memberType === 'honorary' ? 'Honorary Member' : 'General Member'}
                    </span>
                  )}
                  {session?.user?.role && (
                    <span className="badge" style={{ background: '#f0f4ff', color: '#1e40af', border: '1px solid #bfdbfe' }}>
                      🎓 {session.user.role}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: '#888' }}>
                  📧 {session?.user?.email}
                  {profile?.memberSince && ` • Member since ${new Date(profile.memberSince).getFullYear()}`}
                </p>
              </div>

              {/* Completion */}
              <div style={{ background: '#f8f8f6', borderRadius: 12, padding: '16px 20px', minWidth: 180, border: '1px solid #e8e4dc' }}>
                <div style={{ fontSize: 11, color: '#aaa', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>Profile Completion</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: completion >= 80 ? '#86b369' : completion >= 50 ? '#d4956b' : '#dc2626' }}>
                  {completion}%
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${completion}%` }} />
                </div>
                {completion < 100 && (
                  <p style={{ fontSize: 11, color: '#aaa', marginTop: 6 }}>Profile সম্পূর্ণ করো</p>
                )}
              </div>
            </div>

            {/* Bio */}
            {profile?.shortBio && (
              <div style={{ marginTop: 16, padding: '14px 18px', background: '#f8f8f6', borderRadius: 10, borderLeft: '3px solid #86b369' }}>
                <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, fontStyle: 'italic' }}>&ldquo;{profile.shortBio}&rdquo;</p>
              </div>
            )}

            {/* Social links */}
            {(profile?.facebook || profile?.portfolioWebsite || profile?.facebookLink) && (
              <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                {profile?.facebook && (
                  <a href={profile.facebook} target="_blank" rel="noreferrer" className="social-link">
                    <span>📘</span> Facebook
                  </a>
                )}
                {profile?.portfolioWebsite && (
                  <a href={profile.portfolioWebsite} target="_blank" rel="noreferrer" className="social-link">
                    <span>🌐</span> Portfolio
                  </a>
                )}
                {profile?.whatsAppNumber && (
                  <a href={`https://wa.me/${profile.whatsAppNumber}`} target="_blank" rel="noreferrer" className="social-link">
                    <span>💬</span> WhatsApp
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* No profile message */}
        {!profile && (
          <div className="section-card fade-up-1" style={{ padding: 48, textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👤</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: '#1a1a1a', marginBottom: 8 }}>Profile এখনো তৈরি হয়নি</h2>
            <p style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>তোমার profile তৈরি করো এবং alumni community তে নিজেকে পরিচয় করিয়ে দাও।</p>
            <button className="edit-btn" onClick={() => router.push('/dashboard/profile/create')}>
              + Profile তৈরি করো
            </button>
          </div>
        )}

        {profile && (
          <div className="main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

            {/* ── Left Column ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Basic Info */}
              <div className="section-card fade-up-1">
                <div className="section-header">
                  <div className="section-icon" style={{ background: '#f0f8ee' }}>👤</div>
                  <span className="section-title">Basic Information</span>
                </div>
                <div className="section-body">
                  <div className="info-grid">
                    <div className="info-item">
                      <div className="info-label">পূর্ণ নাম</div>
                      <div className="info-value">{profile.fullName || <span className="empty">দেওয়া হয়নি</span>}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">বাংলা নাম</div>
                      <div className="info-value" style={{ fontFamily: 'Noto Serif Bengali, serif' }}>{profile.fullNameBn || <span className="empty">দেওয়া হয়নি</span>}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">লিঙ্গ</div>
                      <div className="info-value">{profile.gender === 'male' ? '♂ পুরুষ' : profile.gender === 'female' ? '♀ মহিলা' : profile.gender || <span className="empty">দেওয়া হয়নি</span>}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">জন্ম তারিখ</div>
                      <div className="info-value">{profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('bn-BD') : <span className="empty">দেওয়া হয়নি</span>}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">Member Type</div>
                      <div className="info-value">{profile.memberType || <span className="empty">দেওয়া হয়নি</span>}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">Committee Position</div>
                      <div className="info-value">{profile.committeePosition || <span className="empty">নেই</span>}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="section-card fade-up-2">
                <div className="section-header">
                  <div className="section-icon" style={{ background: '#f0f4ff' }}>📞</div>
                  <span className="section-title">Contact Information</span>
                </div>
                <div className="section-body">
                  <div className="info-grid">
                    <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                      <div className="info-label">বর্তমান ঠিকানা</div>
                      <div className="info-value">{profile.presentAddress || <span className="empty">দেওয়া হয়নি</span>}</div>
                    </div>
                    <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                      <div className="info-label">স্থায়ী ঠিকানা</div>
                      <div className="info-value">{profile.permanentAddress || <span className="empty">দেওয়া হয়নি</span>}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">জেলা</div>
                      <div className="info-value">{profile.district || <span className="empty">দেওয়া হয়নি</span>}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">উপজেলা</div>
                      <div className="info-value">{profile.upazila || <span className="empty">দেওয়া হয়নি</span>}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">Alternative Mobile</div>
                      <div className="info-value">{profile.alternativeMobile || <span className="empty">দেওয়া হয়নি</span>}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">WhatsApp</div>
                      <div className="info-value">{profile.whatsAppNumber || <span className="empty">দেওয়া হয়নি</span>}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="section-card fade-up-3">
                <div className="section-header">
                  <div className="section-icon" style={{ background: '#fff8f0' }}>✍️</div>
                  <span className="section-title">Personal Bio</span>
                </div>
                <div className="section-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { label: 'Short Bio', value: profile.shortBio },
                    { label: 'কেন join করলে', value: profile.whyJoined },
                    { label: 'Future Goals', value: profile.futureGoals },
                    { label: 'Hobbies', value: profile.hobbies },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="info-label">{item.label}</div>
                      <div className="info-value" style={{ marginTop: 4, lineHeight: 1.7 }}>
                        {item.value || <span className="empty">দেওয়া হয়নি</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── Right Column ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Education */}
              <div className="section-card fade-up-1">
                <div className="section-header">
                  <div className="section-icon" style={{ background: '#fef9ee' }}>🎓</div>
                  <span className="section-title">Education</span>
                </div>
                <div className="section-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                  {/* School */}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#86b369', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>
                      🏫 স্কুল
                    </div>
                    <div className="info-grid">
                      <div className="info-item">
                        <div className="info-label">স্কুলের নাম</div>
                        <div className="info-value">{profile.schoolName || <span className="empty">দেওয়া হয়নি</span>}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Group</div>
                        <div className="info-value">{profile.schoolGroup || <span className="empty">—</span>}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Passing Year</div>
                        <div className="info-value">{profile.schoolPassingYear || <span className="empty">—</span>}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: 1, background: '#f0ede6' }} />

                  {/* College */}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#86b369', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>
                      🏛️ কলেজ
                    </div>
                    <div className="info-grid">
                      <div className="info-item">
                        <div className="info-label">কলেজের নাম</div>
                        <div className="info-value">{profile.collegeName || <span className="empty">দেওয়া হয়নি</span>}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Group / বিভাগ</div>
                        <div className="info-value">{profile.collegeGroup === 'science' ? 'বিজ্ঞান' : profile.collegeGroup === 'arts' ? 'মানবিক' : profile.collegeGroup === 'commerce' ? 'বাণিজ্য' : profile.collegeGroup || <span className="empty">—</span>}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Passing Year</div>
                        <div className="info-value">{profile.collegePassingYear || <span className="empty">—</span>}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: 1, background: '#f0ede6' }} />

                  {/* University */}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#86b369', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>
                      🎓 বিশ্ববিদ্যালয়
                    </div>
                    <div className="info-grid">
                      <div className="info-item">
                        <div className="info-label">বিশ্ববিদ্যালয়</div>
                        <div className="info-value">{profile.universityName || <span className="empty">দেওয়া হয়নি</span>}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Department</div>
                        <div className="info-value">{profile.department || <span className="empty">—</span>}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Student ID</div>
                        <div className="info-value">{profile.studentId || <span className="empty">—</span>}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Year / Semester</div>
                        <div className="info-value">
                          {profile.currentYear || profile.currentSemester
                            ? `${profile.currentYear ? profile.currentYear + 'য় বর্ষ' : ''} ${profile.currentSemester ? profile.currentSemester + 'য় সেমিস্টার' : ''}`
                            : <span className="empty">—</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Blood Info */}
              <div className="section-card fade-up-2">
                <div className="section-header">
                  <div className="section-icon" style={{ background: '#fef2f2' }}>🩸</div>
                  <span className="section-title">Blood Information</span>
                </div>
                <div className="section-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
                    {profile.bloodGroup ? (
                      <div className="blood-badge">{profile.bloodGroup}</div>
                    ) : (
                      <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#f0ede6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🩸</div>
                    )}
                    <div>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#1a1a1a' }}>
                        {profile.bloodGroup || 'জানা নেই'}
                      </div>
                      <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Blood Group</div>
                      {profile.donationEligibility && (
                        <span className="badge" style={{
                          marginTop: 6,
                          background: profile.donationEligibility === 'eligible' ? '#f0fdf4' : '#fef2f2',
                          color: profile.donationEligibility === 'eligible' ? '#16a34a' : '#dc2626',
                          border: `1px solid ${profile.donationEligibility === 'eligible' ? '#bbf7d0' : '#fecaca'}`,
                        }}>
                          {profile.donationEligibility === 'eligible' ? '✅ Eligible to Donate' : '⏸ Not Eligible'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="info-grid">
                    <div className="info-item">
                      <div className="info-label">Last Donation</div>
                      <div className="info-value">{profile.lastDonationDate ? new Date(profile.lastDonationDate).toLocaleDateString('bn-BD') : <span className="empty">—</span>}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">Next Available</div>
                      <div className="info-value">{profile.nextAvailableDonationDate ? new Date(profile.nextAvailableDonationDate).toLocaleDateString('bn-BD') : <span className="empty">—</span>}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">Total Donations</div>
                      <div className="info-value" style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#dc2626' }}>
                        {profile.totalDonationCount || 0} <span style={{ fontSize: 12, color: '#888', fontFamily: 'DM Sans, sans-serif', fontWeight: 400 }}>times</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">Preferred Location</div>
                      <div className="info-value">{profile.preferredDonationLocation || <span className="empty">—</span>}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              {(profile.latitude && profile.longitude) && (
                <div className="section-card fade-up-3">
                  <div className="section-header">
                    <div className="section-icon" style={{ background: '#f0f4ff' }}>📍</div>
                    <span className="section-title">Location</span>
                  </div>
                  <div className="section-body">
                    <div className="info-grid">
                      <div className="info-item">
                        <div className="info-label">Latitude</div>
                        <div className="info-value">{profile.latitude}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Longitude</div>
                        <div className="info-value">{profile.longitude}</div>
                      </div>
                      {profile.locationDms && (
                        <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                          <div className="info-label">DMS</div>
                          <div className="info-value">{profile.locationDms}</div>
                        </div>
                      )}
                    </div>
                    <a
                      href={`https://maps.google.com/?q=${profile.latitude},${profile.longitude}`}
                      target="_blank" rel="noreferrer"
                      className="social-link"
                      style={{ marginTop: 12, display: 'inline-flex' }}
                    >
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