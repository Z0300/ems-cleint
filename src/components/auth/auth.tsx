import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../../api/client'

interface User {
  id: string
  fullName: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await api.get('/auth/me')

        setUser(res.data)
        setIsAuthenticated(true)
      } catch {
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password })

    localStorage.setItem('accessToken', res.data.token)

    setUser(res.data.user)
    setIsAuthenticated(true)
  }

  const logout = async () => {
    await api.post('/auth/logout')

    localStorage.removeItem('accessToken')

    setUser(null)
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
