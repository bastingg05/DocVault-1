import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <section className="container" style={{textAlign:'center', paddingTop: 60}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:18}}>
          <div className="pulse-glow" style={{width:160,height:160,borderRadius:100,background:'radial-gradient(closest-side, rgba(139,92,255,.38), rgba(53,195,255,.22) 60%, transparent)',display:'grid',placeItems:'center', boxShadow:'0 30px 120px rgba(139,92,255,.4), 0 -20px 100px rgba(53,195,255,.25)'}}>
            <svg width="74" height="74" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{filter:'drop-shadow(0 8px 22px rgba(139,92,255,.35))'}}>
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
        <h1 className="gradient" style={{fontSize:52, marginBottom:12}}>DocuVault</h1>
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
        <div className="panel" style={{maxWidth:1040}}>
          <h2 className="title-underline" style={{marginTop:0}}>Why DocuVault?</h2>
          <div className="grid-3">
            <div className="card-soft">
              <div className="badge">🔐</div>
              <h3>Enterprise Security</h3>
              <p>Military‑grade encryption, secure auth, and audit‑friendly logs keep your documents safe.</p>
            </div>
            <div className="card-soft">
              <div className="badge">⚡</div>
              <h3>Fast & Organized</h3>
              <p>Upload, tag and categorize documents. Powerful search brings anything back instantly.</p>
            </div>
            <div className="card-soft">
              <div className="badge">⏰</div>
              <h3>Expiry Reminders</h3>
              <p>Stay ahead with automated reminders for IDs, certificates, and licenses.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="panel" style={{maxWidth:1040}}>
          <h2 className="title-underline" style={{marginTop:0}}>How it works</h2>
          <ol className="steps">
            <li>
              <span className="step-index">1</span>
              <div>
                <strong>Create your account</strong>
                <div className="muted">Register securely with your email and password.</div>
              </div>
            </li>
            <li>
              <span className="step-index">2</span>
              <div>
                <strong>Upload your documents</strong>
                <div className="muted">Choose a category, add notes, and set expiry dates.</div>
              </div>
            </li>
            <li>
              <span className="step-index">3</span>
              <div>
                <strong>Search, view, and download</strong>
                <div className="muted">Filter by name, type, or expiry and open files instantly.</div>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="container" style={{textAlign:'center'}}>
        <div className="panel" style={{maxWidth:840}}>
          <h2 className="title-underline" style={{marginTop:0}}>Ready to protect your documents?</h2>
          <p className="help" style={{margin:'0 auto 18px',maxWidth:700}}>Join DocuVault today and experience secure, stress‑free document management with beautiful clarity.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center'}}>
            <Link className="btn" to="/register">Create Free Account</Link>
            <Link className="btn" to="/documents" style={{background:'linear-gradient(90deg,#10101b,#0c0c16)', boxShadow:'0 0 0 1px rgba(53,195,255,.2) inset'}}>Browse Documents</Link>
          </div>
        </div>
      </section>

      <footer style={{padding:'24px 16px', textAlign:'center', color:'#9aa0b4'}}>
        <div>© {new Date().getFullYear()} DocuVault. All rights reserved.</div>
      </footer>
    </div>
  )
}


