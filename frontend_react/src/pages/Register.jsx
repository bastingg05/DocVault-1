import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5051'

export default function Register(){
  const nav = useNavigate()
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirm,setConfirm] = useState('')
  const [msg,setMsg] = useState('')
  const [loading,setLoading] = useState(false)

  async function onSubmit(e){
    e.preventDefault()
    if(password !== confirm){ setMsg('Passwords do not match'); return }
    setLoading(true); setMsg('Creating account...')
    try{
      const { data } = await axios.post(`${API_BASE}/api/auth/register`, { name, email, password })
      localStorage.setItem('dv_token', data.token)
      nav('/documents')
    }catch(err){ setMsg(err.response?.data?.message || 'Registration failed') }
    finally{ setLoading(false) }
  }

  return (
    <div className="container auth-page" style={{display:'grid', placeItems:'center'}}>
      <form onSubmit={onSubmit} className="panel auth-card" style={{maxWidth:880}}>
        <div className="auth-emblem">
          <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="authRG" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop stopColor="#35c3ff"/>
                <stop offset="1" stopColor="#8b5cff"/>
              </linearGradient>
            </defs>
            <rect x="10" y="24" width="44" height="28" rx="8" stroke="url(#authRG)" strokeWidth="3" fill="rgba(139,92,255,0.18)"/>
            <path d="M18 24v-5a14 14 0 0 1 28 0v5" stroke="url(#authRG)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="32" cy="38" r="3.5" fill="#fff"/>
          </svg>
        </div>
        <h2 className="auth-title">Create your account</h2>
        <div className="row inline">
          <div>
            <label>Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div>
            <label>Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
          </div>
        </div>
        <div className="row inline">
          <div>
            <label>Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
          </div>
          <div>
            <label>Confirm</label>
            <input value={confirm} onChange={e=>setConfirm(e.target.value)} type="password" required />
          </div>
        </div>
        <div className="row"><button className="btn btn-block" style={{height:48, fontSize:16}} disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button></div>
        <div className="help">{msg}</div>
        <div className="help">Have an account? <Link className="link-violet" to="/login">Sign in</Link></div>
      </form>
    </div>
  )
}


