'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { Events } from '../../types/events.types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import { Button } from '../../components/ui/button'
import {
  BellDotIcon,
  BombIcon,
  CalendarCheckIcon,
  CalendarX2,
  CalendarX2Icon,
  EllipsisVertical,
  StampIcon,
} from 'lucide-react'
import { format } from 'date-fns'
import { Badge } from '../../components/ui/badge'

export const columns: ColumnDef<Events>[] = [
  {
    accessorKey: 'title',
    enableResizing: false,
    size: 300,
    header: 'Title',
  },
  {
    accessorKey: 'eventDate',
    header: 'Date',
    size: 100,
    cell: ({ row }) => {
      return format(new Date(row.original.eventDate), 'MMM dd, yyyy')
    },
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    size: 100,
    cell: ({ row }) => {
      const time = row.getValue<string>('startTime')

      return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
  {
    accessorKey: 'endTime',
    header: 'End Time',
    size: 100,
    cell: ({ row }) => {
      const time = row.getValue<string>('endTime')

      return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 100,
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.original.status === 'OPEN' ? <BellDotIcon /> : <BombIcon />}
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: 'actions',
    size: 50,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Close</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Cancel</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
