'use client'

import type { ColumnDef } from '@tanstack/react-table'

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../../components/ui/dropdown-menu'
import { Eraser, FileMinusCorner, FilePlusCorner, Loader } from 'lucide-react'
import { format } from 'date-fns'
import { TableRowActions } from '../../components/common/data-table/TableRowActions'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import type { Events } from './types/events.types'
import { Link } from '@tanstack/react-router'

export const columns: ColumnDef<Events>[] = [
  {
    accessorKey: 'title',
    enableResizing: false,
    size: 300,
    header: 'Title',
    cell: ({ row }) => {
      return <div className="max-w-[300px] truncate">{row.original.title}</div>
    }
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
    size: 50,
    cell: ({ row }) => {
      const status = row.original.status
      const isOpen = status === 'OPEN'
      const color = isOpen ? 'text-green-400' : 'text-red-400'

      return <Badge
        variant="outline"
        className={`px-1.5 flex items-center gap-1 font-normal ${color}`}
      >
        {isOpen ? <Loader className="h-3 w-3" /> : <Eraser className="h-3 w-3" />}
        {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
      </Badge>
    },
  },
  {
    id: 'actions',
    size: 50,
    cell: function Cell({ row }) {
      const event = row.original;

      return (
        <div className="flex items-center justify-end gap-2 w-full">

          <TableRowActions>
            <DropdownMenuItem asChild>
              <Link
                to="/events/$eventId/edit"
                params={{ eventId: event.id.toString() }}
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Close</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Cancel</DropdownMenuItem>
          </TableRowActions>
        </div>
      )
    },
  },
]
