import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Link } from '@tanstack/react-router'
import AppSidebar from '../components/layout/AppSidebar'
import { SidebarProvider } from '../components/ui/sidebar'

export const Route = createRootRoute({
  component: () => (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex gap-2 p-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </div>
        <Outlet />
        <TanStackRouterDevtools />
      </SidebarProvider>
    </>
  ),
})
