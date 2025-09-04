import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5051'

export default function AddDocument(){
  const nav = useNavigate()
  const [name,setName] = useState('')
  const [category,setCategory] = useState('Academic')
  const [expiryDate,setExpiryDate] = useState('')
  const [notes,setNotes] = useState('')
  const [file,setFile] = useState(null)
  const [msg,setMsg] = useState('')

  async function onSubmit(e){
    e.preventDefault()
    try{
      const token = localStorage.getItem('dv_token')
      const fd = new FormData()
      fd.append('name', name)
      fd.append('category', category)
      if(expiryDate) fd.append('expiryDate', expiryDate)
      if(notes) fd.append('notes', notes)
      fd.append('file', file)
      await axios.post(`${API_BASE}/api/documents`, fd, { headers: { Authorization: `Bearer ${token}` } })
      nav('/documents')
    }catch(err){ setMsg(err.response?.data?.message || 'Upload failed') }
  }

  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Add document</h2>
        <Link className="btn" to="/documents">Back</Link>
      </div>
      <form onSubmit={onSubmit} className="panel" style={{maxWidth:720}}>
        <div className="row inline">
          <div>
            <label>Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div>
            <label>Category</label>
            <select value={category} onChange={e=>setCategory(e.target.value)}>
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
            <input type="date" value={expiryDate} onChange={e=>setExpiryDate(e.target.value)} />
          </div>
          <div>
            <label>File</label>
            <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} required />
          </div>
        </div>
        <div className="row">
          <label>Notes</label>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} />
        </div>
        <div className="row"><button className="btn">Upload</button></div>
        <div className="help">{msg}</div>
      </form>
    </div>
  )
}


