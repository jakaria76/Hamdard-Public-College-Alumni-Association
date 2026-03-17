'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    setTimeout(() => {
      setMessage('✅ Password reset link তোমার email এ পাঠানো হয়েছে।')
      setLoading(false)
    }, 1000)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0f0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      padding: '20px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        .fp-card {
          background: #f5f2eb;
          border-radius: 16px;
          padding: 48px 40px;
          width: 100%;
          max-width: 400px;
        }
        .fp-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px; font-weight: 700;
          color: #1a1a1a; margin-bottom: 6px;
        }
        .fp-sub {
          font-size: 14px; color: #888;
          margin-bottom: 28px; font-weight: 300; line-height: 1.6;
        }
        .fp-label {
          display: block; font-size: 13px; font-weight: 500;
          color: #444; margin-bottom: 7px;
        }
        .fp-input {
          width: 100%; padding: 12px 14px;
          background: #fff; border: 1.5px solid #e0ddd6;
          border-radius: 8px; font-size: 14px; color: #1a1a1a;
          font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s;
          margin-bottom: 20px;
        }
        .fp-input:focus { border-color: #86b369; }
        .fp-input::placeholder { color: #bbb; }
        .fp-btn {
          width: 100%; padding: 13px 20px;
          background: #1a2e1a; color: #f0ede6;
          border: none; border-radius: 8px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s; margin-bottom: 20px;
        }
        .fp-btn:hover { background: #243d24; transform: translateY(-1px); }
        .fp-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .success-box {
          padding: 12px 14px; background: #f0fdf4;
          border: 1px solid #bbf7d0; border-radius: 8px;
          font-size: 13px; color: #16a34a; margin-bottom: 16px;
        }
        .error-box {
          padding: 12px 14px; background: #fef2f2;
          border: 1px solid #fecaca; border-radius: 8px;
          font-size: 13px; color: #dc2626; margin-bottom: 16px;
        }
        .back-link {
          text-align: center; font-size: 13px; color: #888;
        }
        .back-link a {
          color: #1a2e1a; font-weight: 600; text-decoration: none;
        }
        .back-link a:hover { text-decoration: underline; }
      `}</style>

      <div className="fp-card">
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #86b369', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 900, color: '#86b369' }}>H</div>
          <div>
            <div style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 13, lineHeight: 1.2 }}>HPCAA</div>
            <div style={{ fontSize: 10, color: '#86b369', letterSpacing: 1, textTransform: 'uppercase' }}>Alumni Association</div>
          </div>
        </div>

        <h1 className="fp-title">Password Reset</h1>
        <p className="fp-sub">
          তোমার email দাও — আমরা password reset করার link পাঠাবো।
        </p>

        {message && <div className="success-box">{message}</div>}
        {error && <div className="error-box">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="fp-label" htmlFor="email">Email</label>
          <input
            className="fp-input"
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="fp-btn" disabled={loading}>
            {loading ? 'পাঠানো হচ্ছে...' : 'Reset Link পাঠাও →'}
          </button>
        </form>

        <div className="back-link">
          <Link href="/login">← Login page এ ফিরে যাও</Link>
        </div>
      </div>
    </div>
  )
}