import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { NotFound } from '../components/common/not-found'

interface AuthState {
  isAuthenticated: boolean
  user: {
    id: string;
    fullName: string;
    email: string,
    role: string
    // roles: string[]
    // permissions: string[]
  } | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  hasRole: (role: string) => boolean
  hasAnyRole: (roles: string[]) => boolean
  // hasPermission: (permission: string) => boolean
  // hasAnyPermission: (permissions: string[]) => boolean
}

interface MyRouterContext {
  auth: AuthState
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  ),
  notFoundComponent: () => <NotFound />,
})
