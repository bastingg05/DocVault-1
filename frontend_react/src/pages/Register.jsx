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

  async function onSubmit(e){
    e.preventDefault()
    if(password !== confirm){ setMsg('Passwords do not match'); return }
    setMsg('Creating account...')
    try{
      const { data } = await axios.post(`${API_BASE}/api/auth/register`, { name, email, password })
      localStorage.setItem('dv_token', data.token)
      nav('/documents')
    }catch(err){ setMsg(err.response?.data?.message || 'Registration failed') }
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={onSubmit} className="panel" style={{maxWidth:620}}>
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
        <div className="row"><button className="btn">Create account</button></div>
        <div className="help">{msg}</div>
        <div className="help">Have an account? <Link to="/login">Sign in</Link></div>
      </form>
    </div>
  )
}


