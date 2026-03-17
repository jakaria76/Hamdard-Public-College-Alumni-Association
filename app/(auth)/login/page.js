'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })
      if (result?.error) {
        setError('Email বা Password ভুল হয়েছে')
      } else if (result?.ok) {
        window.location.replace('/dashboard')
      }
    } catch (err) {
      setError('কিছু একটা সমস্যা হয়েছে')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    await signIn('google', { callbackUrl: '/dashboard' })
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

        .login-left {
          flex: 1;
          background: linear-gradient(135deg, #0d1a0d 0%, #111a11 50%, #0a150a 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }

        .login-left::before {
          content: '';
          position: absolute;
          top: -100px; left: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(134,179,105,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .login-left::after {
          content: '';
          position: absolute;
          bottom: -80px; right: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(134,179,105,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .left-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .left-logo-circle {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 2px solid #86b369;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 20px; font-weight: 900;
          color: #86b369;
        }

        .left-logo-text .main { font-weight: 600; color: #f0ede6; font-size: 15px; }
        .left-logo-text .sub { font-size: 11px; color: #86b369; letter-spacing: 1.5px; text-transform: uppercase; }

        .left-content { position: relative; z-index: 1; }

        .left-content h2 {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          font-weight: 900;
          color: #f0ede6;
          line-height: 1.15;
          margin-bottom: 20px;
        }

        .left-content h2 em { font-style: italic; color: #86b369; }

        .left-content p {
          font-size: 16px;
          color: #7a7570;
          line-height: 1.8;
          font-weight: 300;
          max-width: 380px;
        }

        .left-stats {
          display: flex;
          gap: 32px;
          position: relative;
          z-index: 1;
        }

        .left-stat .num {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: #86b369;
        }

        .left-stat .lbl {
          font-size: 12px;
          color: #4a4845;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* Right side */
        .login-right {
          width: 480px;
          background: #f5f2eb;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
        }

        .login-form-wrap {
          width: 100%;
          max-width: 360px;
        }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 30px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 6px;
        }

        .form-sub {
          font-size: 14px;
          color: #888;
          margin-bottom: 32px;
          font-weight: 300;
        }

        .google-btn {
          width: 100%;
          padding: 13px 20px;
          background: #fff;
          border: 1.5px solid #e0ddd6;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 20px;
        }

        .google-btn:hover {
          border-color: #86b369;
          background: #fafaf8;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .google-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e0ddd6;
        }

        .divider span {
          font-size: 12px;
          color: #aaa;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .field { margin-bottom: 16px; }

        .field label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #444;
          margin-bottom: 7px;
          letter-spacing: 0.2px;
        }

        .field input {
          width: 100%;
          padding: 12px 14px;
          background: #fff;
          border: 1.5px solid #e0ddd6;
          border-radius: 8px;
          font-size: 14px;
          color: #1a1a1a;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }

        .field input:focus { border-color: #86b369; }
        .field input::placeholder { color: #bbb; }

        .forgot {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }

        .forgot a {
          font-size: 13px;
          color: #86b369;
          text-decoration: none;
          font-weight: 500;
        }

        .forgot a:hover { text-decoration: underline; }

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
          margin-bottom: 20px;
        }

        .submit-btn:hover { background: #243d24; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(26,46,26,0.3); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .error-box {
          padding: 12px 14px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          font-size: 13px;
          color: #dc2626;
          margin-bottom: 16px;
        }

        .register-link {
          text-align: center;
          font-size: 13px;
          color: #888;
        }

        .register-link a {
          color: #1a2e1a;
          font-weight: 600;
          text-decoration: none;
        }

        .register-link a:hover { text-decoration: underline; }

        @media (max-width: 768px) {
          .login-left { display: none; }
          .login-right { width: 100%; }
        }
      `}</style>

      {/* Left Panel */}
      <div className="login-left">
        <Link href="/" className="left-logo">
          <div className="left-logo-circle">H</div>
          <div className="left-logo-text">
            <div className="main">HPCAA</div>
            <div className="sub">Alumni Association</div>
          </div>
        </Link>

        <div className="left-content">
          <h2>
            স্বাগতম,<br />
            <em>প্রিয় Alumni</em>
          </h2>
          <p>
            Hamdard Public College এর প্রাক্তন শিক্ষার্থীদের একটি বিশেষ জায়গায় আবার স্বাগতম।
            যোগাযোগ রাখুন, সুযোগ ভাগ করুন।
          </p>
        </div>

        <div className="left-stats">
          <div className="left-stat">
            <div className="num">২৫০০+</div>
            <div className="lbl">Alumni</div>
          </div>
          <div className="left-stat">
            <div className="num">২০+</div>
            <div className="lbl">Countries</div>
          </div>
          <div className="left-stat">
            <div className="num">৫০০+</div>
            <div className="lbl">Professionals</div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="login-right">
        <div className="login-form-wrap">
          <h1 className="form-title">Login করো</h1>
          <p className="form-sub">তোমার account এ প্রবেশ করো</p>

          {error && <div className="error-box">⚠️ {error}</div>}

          {/* Google Button */}
          <button
            className="google-btn"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            type="button"
          >
            {googleLoading ? (
              <span>Loading...</span>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google দিয়ে Login করো
              </>
            )}
          </button>

          <div className="divider"><span>অথবা email দিয়ে</span></div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="তোমার password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="forgot">
              <Link href="/forgot-password">Password ভুলে গেছো?</Link>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Login হচ্ছে...' : 'Login করো →'}
            </button>
          </form>

          <div className="register-link">
            Account নেই?{' '}
            <Link href="/register">Register করো</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
