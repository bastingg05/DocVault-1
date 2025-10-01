import { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || (typeof __API_BASE__ !== 'undefined' ? __API_BASE__ : 'https://docvault-1.onrender.com')

export default function Documents(){
  const nav = useNavigate()
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [msg, setMsg] = useState('')
  const [deletingId, setDeletingId] = useState('')
  const [editing, setEditing] = useState(null)
  const [editValues, setEditValues] = useState({ name:'', category:'Academic', expiryDate:'', notes:'', file:null })

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

  function openEdit(d){
    setEditing(d)
    setEditValues({
      name: d.name || '',
      category: d.category || 'Academic',
      expiryDate: d.expiryDate ? new Date(d.expiryDate).toISOString().slice(0,10) : '',
      notes: d.notes || '',
      file: null
    })
  }

  async function saveEdit(e){
    e?.preventDefault?.()
    if(!editing) return
    try{
      const token = localStorage.getItem('dv_token')
      const fd = new FormData()
      if(editValues.name) fd.append('name', editValues.name)
      if(editValues.category) fd.append('category', editValues.category)
      if(editValues.expiryDate) fd.append('expiryDate', editValues.expiryDate)
      if(typeof editValues.notes === 'string') fd.append('notes', editValues.notes)
      if(editValues.file) fd.append('file', editValues.file)
      await axios.put(`${API_BASE}/api/documents/${editing._id}`, fd, { headers: { Authorization: `Bearer ${token}` }})
      setEditing(null)
      await load()
    }catch(err){
      console.log('Update failed:', err.message)
      setMsg('Update failed')
    }
  }

  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2 className="title-underline">Your documents</h2>
        <div style={{display:'flex',gap:8}}>
          <Link className="btn" to="/add-document">Add document</Link>
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
                    <button className="btn" onClick={()=>openEdit(d)}>Edit</button>
                    <button className="btn" onClick={()=>deleteDoc(d._id)} disabled={deletingId===d._id}>{deletingId===d._id ? 'Deleting…' : 'Delete'}</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="help">{msg}</div>
      </div>

      {editing && (
        <div className="modal-backdrop" style={{position:'fixed', inset:0, background:'rgba(0,0,0,.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000}} onClick={()=>setEditing(null)}>
          <form onClick={e=>e.stopPropagation()} onSubmit={saveEdit} className="panel auth-card" style={{maxWidth:820, width:'90%', background:'linear-gradient(180deg, rgba(16,16,27,.96), rgba(16,16,27,.9))'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h3>Edit document</h3>
              <button type="button" className="btn" onClick={()=>setEditing(null)}>Close</button>
            </div>
            <div className="row inline">
              <div>
                <label>Name</label>
                <input value={editValues.name} onChange={e=>setEditValues(v=>({...v, name:e.target.value}))} required />
              </div>
              <div>
                <label>Category</label>
                <select value={editValues.category} onChange={e=>setEditValues(v=>({...v, category:e.target.value}))}>
                  <option>Academic</option>
                  <option>ID Proof</option>
                  <option>Certificates</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="row inline">
              <div>
                <label>Expiry date</label>
                <input type="date" value={editValues.expiryDate} onChange={e=>setEditValues(v=>({...v, expiryDate:e.target.value}))} />
              </div>
              <div>
                <label>Replace file (optional)</label>
                <input type="file" onChange={e=>setEditValues(v=>({...v, file: e.target.files?.[0] || null}))} />
              </div>
            </div>
            <div className="row">
              <label>Notes</label>
              <textarea rows={3} value={editValues.notes} onChange={e=>setEditValues(v=>({...v, notes:e.target.value}))} />
            </div>
            <div className="row" style={{display:'flex', gap:8}}>
              <button className="btn" type="submit" style={{height:48, fontWeight:800}}>Save changes</button>
              <button className="btn" type="button" onClick={()=>setEditing(null)} style={{height:48}}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}


