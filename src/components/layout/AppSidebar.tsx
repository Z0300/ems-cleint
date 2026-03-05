'use client'

import { AlarmClockCheckIcon, GaugeCircle, ListCheckIcon, LucideLogOut } from 'lucide-react'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '../ui/sidebar'
import { NavMain } from './NavbarMain'
import { Link } from '@tanstack/react-router'
import { NavUser } from './NavbarUser'

import { useAuth } from '../auth/auth'

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: GaugeCircle,
    },
    {
      title: 'Events',
      url: '/events',
      icon: ListCheckIcon,
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: LucideLogOut,
    },
  ],
}

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link
                to="/"
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent data-[state=open]:bg-accent"
              >
                <AlarmClockCheckIcon className="size-5!" />
                <span className="text-base font-semibold">eMs Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
