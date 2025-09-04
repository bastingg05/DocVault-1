import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5051'

export default function Login(){
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  async function onSubmit(e){
    e.preventDefault()
    setMsg('Signing in...')
    try{
      const { data } = await axios.post(`${API_BASE}/api/auth/login`, { email, password })
      localStorage.setItem('dv_token', data.token)
      nav('/documents')
    }catch(err){ setMsg(err.response?.data?.message || 'Login failed') }
  }

  return (
    <div className="container auth-page" style={{display:'grid', placeItems:'center'}}>
      <form onSubmit={onSubmit} className="panel auth-card" style={{maxWidth:640}}>
        <div className="auth-emblem">
          <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="authG" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop stopColor="#35c3ff"/>
                <stop offset="1" stopColor="#8b5cff"/>
              </linearGradient>
            </defs>
            <rect x="10" y="24" width="44" height="28" rx="8" stroke="url(#authG)" strokeWidth="3" fill="rgba(139,92,255,0.18)"/>
            <path d="M18 24v-5a14 14 0 0 1 28 0v5" stroke="url(#authG)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="32" cy="38" r="3.5" fill="#fff"/>
          </svg>
        </div>
        <h2 className="auth-title">Welcome back</h2>
        <div className="row">
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </div>
        <div className="row">
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </div>
        <div className="row"><button className="btn">Sign in</button></div>
        <div className="help">{msg}</div>
        <div className="help">No account? <Link className="link-violet" to="/register">Create one</Link></div>
      </form>
    </div>
  )
}


