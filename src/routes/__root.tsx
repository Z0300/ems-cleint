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
  } | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  hasRole: (role: string) => boolean
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
