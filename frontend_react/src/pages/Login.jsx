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
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="panel" style={{maxWidth:520}}>
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
        <div className="help">No account? <Link to="/register">Create one</Link></div>
      </form>
    </div>
  )
}


