import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/logout')({
  component: LogoutComponent,

})

function LogoutComponent() {
  const { auth } = Route.useRouteContext()
  const navigate = useNavigate()

  useEffect(() => {
    const doLogout = async () => {
      auth.logout()
      navigate({ to: '/login', replace: true })
    }

    doLogout()
  }, [auth, navigate])
}
