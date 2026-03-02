import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../../api/axios'
import { clearAccessToken, getAccessToken, setAccessToken } from '../../lib/token'

interface User {
  id: string
  fullName: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = getAccessToken()

        if (!token) {
          setIsLoading(false)
          return
        }

        const res = await api.get('/auth/me')
        setUser(res.data)
        setIsAuthenticated(true)
      } catch (err) {
        clearAccessToken()
      } finally {
        setIsLoading(false)
      }
    }

    restoreSession()
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', {
      email,
      password,
    })

    const { accessToken, user } = res.data

    setAccessToken(accessToken)
    setUser(user)
    setIsAuthenticated(true)
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (err) {}

    clearAccessToken()
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
