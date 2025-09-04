import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5051'

export default function Documents(){
  const nav = useNavigate()
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [msg, setMsg] = useState('')

  async function load(){
    try{
      const token = localStorage.getItem('dv_token')
      if(!token){ nav('/login'); return }
      const params = new URLSearchParams()
      if(q) params.set('q', q)
      if(category) params.set('category', category)
      const { data } = await axios.get(`${API_BASE}/api/documents?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` }})
      setItems(data.items || [])
      setMsg(`${(data.items||[]).length} documents`)
    }catch(err){ setMsg('Failed to load') }
  }
  useEffect(()=>{ load() }, [])

  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Your documents</h2>
        <div style={{display:'flex',gap:8}}>
          <Link className="btn" to="/add">Add document</Link>
          <button className="btn" onClick={()=>{ localStorage.removeItem('dv_token'); nav('/login') }}>Logout</button>
        </div>
      </div>

      <div className="panel">
        <div className="row inline">
          <div>
            <label>Search</label>
            <input value={q} onChange={e=>setQ(e.target.value)} onInput={load} placeholder="Name or keyword" />
          </div>
          <div>
            <label>Category</label>
            <select value={category} onChange={e=>{setCategory(e.target.value); load()}}>
              <option value="">All</option>
              <option>Academic</option>
              <option>ID Proof</option>
              <option>Certificates</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <table className="table">
          <thead><tr><th>Name</th><th>Category</th><th>Expiry</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(d=>{
              const exp = d.expiryDate ? new Date(d.expiryDate).toLocaleDateString() : '-'
              const base = API_BASE.replace(/\/$/,'')
              const path = d.downloadUrl || d.filePath || ''
              const href = path ? (path.startsWith('http') ? path : `${base}${path.startsWith('/')? path : '/'+path}`) : ''
              return (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td>{d.category}</td>
                  <td>{exp}</td>
                  <td style={{display:'flex',gap:8}}>
                    {href && <a className="btn" href={href} target="_blank" rel="noopener">View</a>}
                    {href && <a className="btn" href={href} download>Download</a>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="help">{msg}</div>
      </div>
    </div>
  )
}


