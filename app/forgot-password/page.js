'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    setTimeout(() => {
      setMessage('Password reset link পাঠানো হয়েছে (demo)')
      setLoading(false)
    }, 1000)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Forgot Password</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          {loading ? 'Sending...' : 'Reset Password'}
        </button>
      </form>

      <p>
        <Link href="/login">Back to Login</Link>
      </p>
    </div>
  )
}