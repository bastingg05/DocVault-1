import { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'https://docvault-1-production.up.railway.app'

export default function Documents(){
  const nav = useNavigate()
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [msg, setMsg] = useState('')
  const [deletingId, setDeletingId] = useState('')

  const load = useCallback(async function(){
    try{
      const token = localStorage.getItem('dv_token')
      if(!token){ nav('/login'); return }
      const params = new URLSearchParams()
      if(q) params.set('q', q)
      if(category) params.set('category', category)
      const { data } = await axios.get(`${API_BASE}/api/documents?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` }})
      setItems(data.items || [])
      setMsg(`${(data.items||[]).length} documents`)
    }catch(err){ 
      console.log('Load failed:', err.message)
      setMsg('Failed to load') 
    }
  }, [q, category, nav])
  useEffect(()=>{ load() }, [load])

  async function deleteDoc(id){
    try{
      const token = localStorage.getItem('dv_token')
      setDeletingId(id)
      await axios.delete(`${API_BASE}/api/documents/${id}`, { headers: { Authorization: `Bearer ${token}` }})
      await load()
    }catch(err){ 
      console.log('Delete failed:', err.message)
      setMsg('Delete failed') 
    }
    finally{ setDeletingId('') }
  }

  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 className="title-underline">Your documents</h2>
        <div style={{display:'flex',gap:8}}>
          <Link className="btn" to="/add">Add document</Link>
          <button className="btn" onClick={()=>{ localStorage.removeItem('dv_token'); nav('/login') }}>Logout</button>
        </div>
      </div>

      <div className="panel" style={{background:'linear-gradient(180deg, rgba(16,16,27,.96), rgba(16,16,27,.9))', boxShadow:'0 24px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(124,92,255,.08) inset'}}>
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

        <table className="table" style={{borderRadius:12, overflow:'hidden', boxShadow:'0 14px 40px rgba(0,0,0,.35)'}}>
          <thead><tr><th>Name</th><th>Category</th><th>Expiry</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(d=>{
              const exp = d.expiryDate ? new Date(d.expiryDate).toLocaleDateString() : '-'
              const base = API_BASE.replace(/\/$/,'')
              const path = d.downloadUrl || d.storagePath || ''
              const href = path ? (path.startsWith('http') ? path : `${base}${path.startsWith('/')? path : '/'+path}`) : ''
              return (
                <tr key={d._id}>
                  <td data-label="Name">{d.name}</td>
                  <td data-label="Category">{d.category}</td>
                  <td data-label="Expiry">{exp}</td>
                  <td data-label="Actions" style={{display:'flex',gap:8, flexWrap:'wrap'}}>
                    {href && <a className="btn" href={href} target="_blank" rel="noopener">View</a>}
                    {href && <a className="btn" href={href} download>Download</a>}
                    <button className="btn" onClick={()=>deleteDoc(d._id)} disabled={deletingId===d._id}>{deletingId===d._id ? 'Deleting…' : 'Delete'}</button>
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


