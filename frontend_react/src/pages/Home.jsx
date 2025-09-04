import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <section className="container" style={{textAlign:'center', paddingTop: 40}}>
        <h1 style={{fontSize:36, marginBottom:12}}>Secure your documents in style</h1>
        <p className="help" style={{margin:'0 auto 20px', maxWidth:680}}>
          DocuVault keeps your personal and academic documents safe, searchable and always at hand.
        </p>
        <div style={{display:'flex', gap:12, justifyContent:'center'}}>
          <Link className="btn" to="/register">Get Started</Link>
          <Link className="btn" to="/documents">View Documents</Link>
        </div>
      </section>

      <section className="container">
        <div className="panel">
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


