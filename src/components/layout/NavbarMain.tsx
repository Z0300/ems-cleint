'use client'

import { type LucideIcon } from 'lucide-react'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
} from '../../components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import { PermissionGuard } from '../auth/permission-guard'

const activeClasses =
  '[&.active]:bg-primary \
   [&.active]:text-primary-foreground \
   [&.active]:hover:bg-primary/90 \
   [&.active]:hover:text-primary-foreground \
   [&.active]:active:bg-primary/90 \
   [&.active]:active:text-primary-foreground \
   min-w-8 duration-200 ease-linear'



export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    role?: string
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <PermissionGuard key={item.title} role={item.role}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link to={item.url} className={activeClasses}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </PermissionGuard>

          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
