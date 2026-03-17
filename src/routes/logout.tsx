import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/logout')({
  component: LogoutComponent,
})

function LogoutComponent() {
  const { auth } = Route.useRouteContext()
  const navigate = useNavigate()
  const didLogout = useRef(false)

  useEffect(() => {
    if (didLogout.current) return
    didLogout.current = true

    const doLogout = async () => {
      auth.logout()
      navigate({ to: '/login', replace: true })
    }

    doLogout()
  }, [auth, navigate])

  return null
}

