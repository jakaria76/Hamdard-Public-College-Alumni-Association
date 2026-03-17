'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    batch: '',
    department: '',
    phone: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (formData.password !== formData.confirmPassword) {
      setError('Password মিলছে না')
      return
    }

    if (formData.password.length < 6) {
      setError('Password কমপক্ষে ৬ অক্ষরের হতে হবে')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          batch: Number(formData.batch),
          department: formData.department,
          phone: formData.phone,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
      } else {
        setSuccess('Registration সফল! Login page এ নিয়ে যাচ্ছি...')
        setTimeout(() => {
          window.location.replace('/login')
        }, 2000)
      }
    } catch (err) {
      setError('কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করো')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0f0a',
      display: 'flex',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }

        /* Left Panel */
        .reg-left {
          flex: 1;
          background: linear-gradient(135deg, #0d1a0d 0%, #111a11 50%, #0a150a 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }

        .reg-left::before {
          content: '';
          position: absolute;
          top: -100px; left: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(134,179,105,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .reg-left::after {
          content: '';
          position: absolute;
          bottom: -80px; right: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(134,179,105,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .reg-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .reg-logo-circle {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 2px solid #86b369;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 20px; font-weight: 900;
          color: #86b369;
        }

        .reg-logo-text .main { font-weight: 600; color: #f0ede6; font-size: 15px; }
        .reg-logo-text .sub  { font-size: 11px; color: #86b369; letter-spacing: 1.5px; text-transform: uppercase; }

        .reg-left-content { position: relative; z-index: 1; }

        .reg-left-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: 44px;
          font-weight: 900;
          color: #f0ede6;
          line-height: 1.15;
          margin-bottom: 20px;
        }

        .reg-left-content h2 em { font-style: italic; color: #86b369; }

        .reg-left-content p {
          font-size: 15px;
          color: #7a7570;
          line-height: 1.8;
          font-weight: 300;
          max-width: 360px;
        }

        /* Steps */
        .reg-steps { position: relative; z-index: 1; }

        .reg-steps p {
          font-size: 11px;
          color: #4a4845;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .step-list { display: flex; flex-direction: column; gap: 10px; }

        .step-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: #7a7570;
        }

        .step-dot {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: rgba(134,179,105,0.15);
          border: 1px solid rgba(134,179,105,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          color: #86b369;
          font-weight: 600;
          flex-shrink: 0;
        }

        /* Right Panel */
        .reg-right {
          width: 520px;
          background: #f5f2eb;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 44px;
          overflow-y: auto;
        }

        .reg-form-wrap { width: 100%; }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .form-sub {
          font-size: 13px;
          color: #999;
          margin-bottom: 28px;
          font-weight: 300;
        }

        .error-box {
          padding: 11px 14px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          font-size: 13px;
          color: #dc2626;
          margin-bottom: 16px;
        }

        .success-box {
          padding: 11px 14px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          font-size: 13px;
          color: #16a34a;
          margin-bottom: 16px;
        }

        .field { margin-bottom: 14px; }

        .field label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: #555;
          margin-bottom: 6px;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }

        .field input,
        .field select {
          width: 100%;
          padding: 11px 13px;
          background: #fff;
          border: 1.5px solid #e0ddd6;
          border-radius: 7px;
          font-size: 14px;
          color: #1a1a1a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
          appearance: none;
        }

        .field input:focus,
        .field select:focus { border-color: #86b369; }
        .field input::placeholder { color: #bbb; }

        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 14px;
        }

        .field-row .field { margin-bottom: 0; }

        .submit-btn {
          width: 100%;
          padding: 13px 20px;
          background: #1a2e1a;
          color: #f0ede6;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.3px;
          transition: all 0.2s;
          margin-top: 6px;
          margin-bottom: 18px;
        }

        .submit-btn:hover {
          background: #243d24;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(26,46,26,0.3);
        }

        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }

        .login-link {
          text-align: center;
          font-size: 13px;
          color: #999;
        }

        .login-link a {
          color: #1a2e1a;
          font-weight: 600;
          text-decoration: none;
        }

        .login-link a:hover { text-decoration: underline; }

        @media (max-width: 900px) {
          .reg-left { display: none; }
          .reg-right { width: 100%; padding: 32px 24px; }
        }
      `}</style>

      {/* Left Panel */}
      <div className="reg-left">
        <Link href="/" className="reg-logo">
          <div className="reg-logo-circle">H</div>
          <div className="reg-logo-text">
            <div className="main">HPCAA</div>
            <div className="sub">Alumni Association</div>
          </div>
        </Link>

        <div className="reg-left-content">
          <h2>
            আমাদের<br />
            <em>Community তে</em><br />
            যোগ দাও
          </h2>
          <p>
            Hamdard Public College এর প্রাক্তন শিক্ষার্থী হিসেবে register করো এবং হাজারো alumni-র সাথে সংযুক্ত হও।
          </p>
        </div>

        <div className="reg-steps">
          <p>Registration Steps</p>
          <div className="step-list">
            <div className="step-item">
              <div className="step-dot">১</div>
              <span>তোমার তথ্য দিয়ে form পূরণ করো</span>
            </div>
            <div className="step-item">
              <div className="step-dot">২</div>
              <span>Account তৈরি হবে — login করো</span>
            </div>
            <div className="step-item">
              <div className="step-dot">৩</div>
              <span>Alumni community তে যোগ দাও ✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="reg-right">
        <div className="reg-form-wrap">
          <h1 className="form-title">Register করো</h1>
          <p className="form-sub">নতুন account তৈরি করো — সম্পূর্ণ বিনামূল্যে</p>

          {error && <div className="error-box">⚠️ {error}</div>}
          {success && <div className="success-box">✅ {success}</div>}

          <form onSubmit={handleSubmit}>

            <div className="field">
              <label htmlFor="name">পূর্ণ নাম *</label>
              <input
                id="name" name="name"
                placeholder="তোমার পূর্ণ নাম লেখো"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email *</label>
              <input
                id="email" name="email"
                type="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="batch">Batch (পাসের বছর) *</label>
                <input
                  id="batch" name="batch"
                  type="number"
                  placeholder="2018"
                  value={formData.batch}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="department">বিভাগ</label>
                <select
                  id="department" name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select করো</option>
                  <option value="science">বিজ্ঞান</option>
                  <option value="arts">মানবিক</option>
                  <option value="commerce">বাণিজ্য</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="phone">ফোন নম্বর</label>
              <input
                id="phone" name="phone"
                placeholder="01XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="password">Password *</label>
                <input
                  id="password" name="password"
                  type="password"
                  placeholder="কমপক্ষে ৬ অক্ষর"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  id="confirmPassword" name="confirmPassword"
                  type="password"
                  placeholder="আবার লেখো"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Registration হচ্ছে...' : 'Register করো →'}
            </button>

          </form>

          <div className="login-link">
            আগেই account আছে?{' '}
            <Link href="/login">Login করো</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
