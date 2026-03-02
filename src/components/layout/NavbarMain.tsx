'use client'

import { ChevronRight, CircleFadingPlus, MailCheckIcon, type LucideIcon } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '../../components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'

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
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link to={item.url} className={activeClasses}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
