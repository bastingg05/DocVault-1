import { Link } from 'react-router-dom'

function Logo(){
  return (
    <div style={{display:'flex',alignItems:'center',gap:10}}>
      <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#35c3ff"/>
            <stop offset="1" stopColor="#8b5cff"/>
          </linearGradient>
        </defs>
        <rect x="8" y="18" width="32" height="22" rx="6" stroke="url(#g1)" strokeWidth="3" fill="rgba(139,92,255,0.12)"/>
        <path d="M16 18v-4a8 8 0 0 1 16 0v4" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="30" r="3" fill="#fff"/>
      </svg>
      <span className="logo">DocuVault</span>
    </div>
  )
}

export default function Header(){
  return (
    <header className="app-header">
      <nav className="nav">
        <Link to="/" style={{textDecoration:'none'}}><Logo /></Link>
        <div style={{display:'flex',gap:16,alignItems:'center'}}>
          <Link to="/">
            <span role="img" aria-label="home">🏠</span> Home
          </Link>
          <Link to="/login">
            <span role="img" aria-label="login">🔐</span> Login
          </Link>
          <Link to="/register" className="btn" style={{padding:'8px 12px'}}>
            <span role="img" aria-label="register">📄</span> Register
          </Link>
        </div>
      </nav>
    </header>
  )
}


