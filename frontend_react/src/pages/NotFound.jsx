import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div className="container">
      <div className="panel" style={{maxWidth:520}}>
        <h2>Page not found</h2>
        <p className="help">The page you requested doesn't exist.</p>
        <Link className="btn" to="/login">Go to Login</Link>
      </div>
    </div>
  )
}


