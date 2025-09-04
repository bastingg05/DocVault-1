window.DocuVault = {
  getCookie(name){ return document.cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith(name+'='))?.split('=')[1]; },
  requireAuth(){ const c=this.getCookie('dv_token'); if(!c) location.href='/login.html'; }
};

// Minimal client-side behaviors and helpers
const api = {
  // Placeholder endpoints; wire these to your backend later
  baseUrl: '',
  async request(path, options = {}) {
    const token = localStorage.getItem('dv_token');
    const headers = { ...(options.headers || {}), 'Accept': 'application/json' };
    if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${this.baseUrl}${path}`, { ...options, headers });
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || 'Request failed');
    return res.headers.get('content-type')?.includes('application/json') ? res.json() : res.text();
  },
  login(data) { return this.request('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }); },
  register(data) { return this.request('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }); },
  listDocuments(query = '') { return this.request(`/api/documents${query}`); },
  createDocument(formData) { return this.request('/api/documents', { method: 'POST', body: formData }); },
};

function setStatus(el, message, isError = false) {
  if (!el) return;
  el.textContent = message;
  el.className = isError ? 'error' : 'help';
}

function getCookie(name) {
  return document.cookie.split(';').map(s => s.trim()).find(s => s.startsWith(name + '='))?.split('=')[1];
}

function requireAuth() {
  const tokenLS = localStorage.getItem('dv_token');
  const tokenCookie = getCookie('dv_token');
  if (!tokenLS && !tokenCookie) window.location.href = '/login.html';
}

async function logout() {
  try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
  localStorage.removeItem('dv_token');
  window.location.href = '/login.html';
}

window.DocuVault = { api, setStatus, requireAuth, logout };


