import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

interface AuthState {
  isAuthenticated: boolean
  user: { id: string; fullName: string; email: string } | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refresh: () => Promise<void>
}

interface MyRouterContext {
  auth: AuthState
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
})
