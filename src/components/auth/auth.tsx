import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../../api/client'
import { jwtDecode } from "jwt-decode";
import { useUserLogin, useUserLogout } from '../../features/auth/types/auth.mutations';

interface User {
  id: string
  fullName: string
  email: string
  role: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  hasRole: (role: string) => boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { mutateAsync: loginMutation } = useUserLogin()
  const { mutateAsync: logoutMutation } = useUserLogout()

  const hasRole = (role: string) => {
    return user?.role === role
  }

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
    const data = await loginMutation({ email, password })
    const decodedToken: { role: string } = jwtDecode(data.token);

    localStorage.setItem('accessToken', data.token)

    setUser({ ...data.user, role: decodedToken.role })
    setIsAuthenticated(true)
  }

  const logout = async () => {
    await logoutMutation()

    localStorage.removeItem('accessToken')

    setUser(null)
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      hasRole,
    }}>
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
