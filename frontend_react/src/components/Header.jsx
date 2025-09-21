import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Logo(){
  return (
    <div style={{display:'flex',alignItems:'center',gap:10}}>
      <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#35c3ff"/>
            <stop offset="1" stopColor="#8b5cff"/>
          </linearGradient>
        </defs>
        <rect x="10" y="24" width="44" height="28" rx="8" stroke="url(#g1)" strokeWidth="3" fill="rgba(139,92,255,0.12)"/>
        <path d="M18 24v-5a14 14 0 0 1 28 0v5" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="32" cy="38" r="3.5" fill="#fff"/>
      </svg>
      <span className="logo">DocuVault</span>
    </div>
  )
}

export default function Header(){
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="app-header">
      <nav className="nav">
        <Link to="/" style={{textDecoration:'none'}}><Logo /></Link>
        <div style={{display:'flex',gap:16,alignItems:'center'}}>
          <Link to="/">
            <span role="img" aria-label="home">🏠</span> Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/documents">
                <span role="img" aria-label="documents">📁</span> Documents
              </Link>
              <Link to="/add">
                <span role="img" aria-label="add">➕</span> Add Document
              </Link>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span>👤 {user?.name}</span>
                <button 
                  onClick={logout}
                  className="btn" 
                  style={{padding:'8px 12px', background:'#ff4757', color:'white'}}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <span role="img" aria-label="login">🔐</span> Login
              </Link>
              <Link to="/register" className="btn" style={{padding:'8px 12px'}}>
                <span role="img" aria-label="register">📄</span> Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}


