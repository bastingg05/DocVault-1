import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Documents from './pages/Documents.jsx'
import AddDocument from './pages/AddDocument.jsx'
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import Header from './components/Header.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

function withLayout(el){
  return (
    <>
      <Header />
      {el}
    </>
  )
}

const router = createBrowserRouter([
  { path: '/', element: withLayout(<Home />), errorElement: <NotFound /> },
  { path: '/login', element: withLayout(<Login />) },
  { path: '/register', element: withLayout(<Register />) },
  { path: '/documents', element: withLayout(<ProtectedRoute><Documents /></ProtectedRoute>) },
  { path: '/add', element: withLayout(<ProtectedRoute><AddDocument /></ProtectedRoute>) },
  { path: '*', element: withLayout(<NotFound />) },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
