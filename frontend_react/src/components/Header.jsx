import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header className="app-header">
      <nav className="nav">
        <Link to="/" className="logo">DocuVault</Link>
        <div style={{display:'flex',gap:12}}>
          <Link to="/documents">Documents</Link>
          <Link to="/add">Add</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
    </header>
  )
}


