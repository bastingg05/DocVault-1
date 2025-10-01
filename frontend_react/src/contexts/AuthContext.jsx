import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

// Prefer env; fall back to build-time define (__API_BASE__) then Render URL
// This avoids accidentally calling the old Railway API
// eslint-disable-next-line no-undef
const API_BASE = import.meta.env.VITE_API_BASE || (typeof __API_BASE__ !== 'undefined' ? __API_BASE__ : 'https://docvault-1.onrender.com')

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('dv_token')
    if (token) {
      // Verify token with backend
      verifyToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async (token) => {
    try {
      const response = await axios.get(`${API_BASE}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data.user)
      setIsAuthenticated(true)
    } catch (err) {
      // Token is invalid, remove it
      console.log('Token verification failed:', err.message)
      localStorage.removeItem('dv_token')
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_BASE}/api/auth/login`, { email, password })
      localStorage.setItem('dv_token', data.token)
      setUser(data.user)
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(`${API_BASE}/api/auth/register`, { name, email, password })
      localStorage.setItem('dv_token', data.token)
      setUser(data.user)
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('dv_token')
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
