import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../../api/client'
import { jwtDecode } from "jwt-decode";

interface User {
  id: string
  fullName: string
  email: string
  role: string
  //roles: string[]
  //permissions: string[]
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  hasRole: (role: string) => boolean
  // hasAnyRole: (roles: string[]) => boolean
  // hasPermission: (permission: string) => boolean
  // hasAnyPermission: (permissions: string[]) => boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const hasRole = (role: string) => {
    return user?.role === role
  }

  // const hasAnyRole = (roles: string[]) => {
  //   return roles.some((role) => user?.role === role)
  // }

  // const hasPermission = (permission: string) => {
  //   return user?.permissions.includes(permission) ?? false
  // }

  // const hasAnyPermission = (permissions: string[]) => {
  //   return (
  //     permissions.some((permission) =>
  //       user?.permissions.includes(permission),
  //     ) ?? false
  //   )
  // }

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
    const decodedToken: { role: string | null } = jwtDecode(res.data.token);

    localStorage.setItem('accessToken', res.data.token)

    setUser({ ...res.data.user, role: decodedToken.role })
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
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      hasRole,
      // hasAnyRole,
      // hasPermission,
      // hasAnyPermission
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
