import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <section className="container" style={{textAlign:'center', paddingTop: 60}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:18}}>
          <div style={{width:150,height:150,borderRadius:90,background:'radial-gradient(closest-side, rgba(139,92,255,.35), rgba(53,195,255,.2) 60%, transparent)',display:'grid',placeItems:'center',boxShadow:'0 0 160px rgba(139,92,255,.4)'}}>
            <svg width="68" height="68" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="h1" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#35c3ff"/>
                  <stop offset="1" stopColor="#8b5cff"/>
                </linearGradient>
              </defs>
              <rect x="10" y="24" width="44" height="28" rx="8" stroke="url(#h1)" strokeWidth="3" fill="rgba(139,92,255,0.18)"/>
              <path d="M18 24v-5a14 14 0 0 1 28 0v5" stroke="url(#h1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="32" cy="38" r="3.5" fill="#fff"/>
            </svg>
          </div>
        </div>
        <h1 style={{fontSize:52, marginBottom:12, background:'linear-gradient(90deg, #35c3ff, #8b5cff)', WebkitBackgroundClip:'text', color:'transparent'}}>DocuVault</h1>
        <div style={{color:'#9aa0b4', letterSpacing:2, fontSize:14, marginBottom:8}}>ENTERPRISE SECURITY</div>
        <p className="help" style={{margin:'0 auto 22px', maxWidth:820}}>
          Secure Document Management with enterprise‑grade encryption, intelligent organization, and seamless collaboration.
        </p>
        <div style={{display:'flex', gap:12, justifyContent:'center'}}>
          <Link className="btn" to="/register">Get Started</Link>
          <Link className="btn" to="/login" style={{background:'linear-gradient(90deg,#10101b,#0c0c16)', boxShadow:'0 0 0 1px rgba(53,195,255,.2) inset'}}>Sign In</Link>
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


