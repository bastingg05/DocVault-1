import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <section className="container" style={{textAlign:'center', paddingTop: 60}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:14}}>
          <div style={{width:120,height:120,borderRadius:60,background:'radial-gradient(closest-side, rgba(139,92,255,.35), rgba(53,195,255,.2) 60%, transparent)',display:'grid',placeItems:'center',boxShadow:'0 0 120px rgba(139,92,255,.35)'}}>
            <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="h1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#35c3ff"/>
                  <stop offset="1" stopColor="#8b5cff"/>
                </linearGradient>
              </defs>
              <rect x="8" y="18" width="32" height="22" rx="6" stroke="url(#h1)" strokeWidth="3" fill="rgba(139,92,255,0.18)"/>
              <path d="M16 18v-4a8 8 0 0 1 16 0v4" stroke="url(#h1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="24" cy="30" r="3" fill="#fff"/>
            </svg>
          </div>
        </div>
        <h1 style={{fontSize:44, marginBottom:12, background:'linear-gradient(90deg, #35c3ff, #8b5cff)', WebkitBackgroundClip:'text', color:'transparent'}}>Secure your documents in style</h1>
        <p className="help" style={{margin:'0 auto 22px', maxWidth:720}}>
          DocuVault keeps your personal and academic documents safe, searchable and always at hand.
        </p>
        <div style={{display:'flex', gap:12, justifyContent:'center'}}>
          <Link className="btn" to="/register">Get Started</Link>
          <Link className="btn" to="/documents">View Documents</Link>
        </div>
      </section>

      <section className="container">
        <div className="panel" style={{maxWidth:960}}>
          <h2>Why DocuVault?</h2>
          <ul>
            <li>Encrypted storage and secure access</li>
            <li>Quick upload with categories and expiry reminders</li>
            <li>Fast search and instant viewing/downloading</li>
          </ul>
        </div>
      </section>
    </div>
  )
}


