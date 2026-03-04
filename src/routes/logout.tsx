import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../components/auth/auth'
import { useEffect } from 'react'

export const Route = createFileRoute('/logout')({
  component: LogoutComponent,
})

function LogoutComponent() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const doLogout = async () => {
      logout()
      navigate({ to: '/login', replace: true })
    }

    doLogout()
  }, [logout, navigate])
}
