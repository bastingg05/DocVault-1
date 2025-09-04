const jwt = require('jsonwebtoken');

function getTokenFromRequest(req) {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) return header.slice(7);
  const cookie = req.headers.cookie || '';
  if (cookie) {
    const map = Object.fromEntries(cookie.split(';').map(p => p.trim().split('=')));
    if (map.dv_token) return decodeURIComponent(map.dv_token);
  }
  return null;
}

function requireAuth(req, res, next) {
  const token = getTokenFromRequest(req);
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function issueTokenCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production';
  res.setHeader('Set-Cookie', `dv_token=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax${isProd ? '; Secure' : ''}`);
}

module.exports = { requireAuth, issueTokenCookie };


