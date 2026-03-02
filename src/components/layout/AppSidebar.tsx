'use client'

import { AlarmClockCheckIcon, GaugeCircle, ListCheckIcon } from 'lucide-react'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '../ui/sidebar'
import { NavMain } from './NavbarMain'
import { Link } from '@tanstack/react-router'

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: GaugeCircle,
    },
    {
      title: 'Events',
      url: '/events',
      icon: ListCheckIcon,
    },
  ],
}

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link to="/">
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
    </Sidebar>
  )
}
