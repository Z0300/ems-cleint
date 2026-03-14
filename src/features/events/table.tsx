'use client'

import { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { PaginatedResponse } from '../common/types/page.types'
import { columns } from './columns'
import { TableToolbar } from '../../components/common/data-table/TableToolbar'
import { TablePagination } from '../../components/common/data-table/TablePagination'
import type { Events } from './types/events.types'
import React from 'react'
import { useEvent } from './queries/event.queries'
import { Skeleton } from '../../components/ui/skeleton'
import { format } from 'date-fns'
import { Activity, Calendar, Clock, FileText, MapPin, Users } from 'lucide-react'
import { Badge } from '../../components/ui/badge'

function ExpandedEventRow({ eventId }: { eventId: number }) {
  const { data, isPending } = useEvent(String(eventId))

  if (isPending) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="rounded-md  bg-white dark:bg-background p-4 flex flex-col gap-4 text-sm">

      <div className="flex items-center gap-3 ">
        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Title</p>
          <p className="text-foreground">
            {data.title}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Description</p>
          <p className="text-foreground max-w-[500px] truncate">
            {data.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Location</p>
          <p className="text-foreground max-w-[500px] truncate">
            {data.location}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
        <div>
          <p className="text-xs text-muted-foreground">Date</p>
          <p className="text-foreground">
            {format(new Date(data.eventDate), "MMM dd, yyyy")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
        <div>
          <p className="text-xs text-muted-foreground">Time</p>
          <p className="text-foreground">
            {new Date(`1970-01-01T${data.startTime}`).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" – "}
            {new Date(`1970-01-01T${data.endTime}`).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Capacity</p>
          <p className="text-foreground max-w-[500px] truncate">
            {data.capacity}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Activity className="h-4 w-4 text-muted-foreground mt-0.5" />
        <div>
          <p className="text-xs text-muted-foreground">Status</p>
          <Badge variant="outline" className="font-normal capitalize">
            {data.status.toLowerCase()}
          </Badge>
        </div>
      </div>
    </div>
  )
}

interface DataTableProps {
  data: PaginatedResponse<Events>
  status: string
  search: string
  onPageChange: (page: number, size?: number, search?: string) => void
  onStatusChange?: (status: string) => void
  onSearchChange?: (search: string) => void,
  expandedContent?: React.ReactNode
}

const statusOptions = [
  { value: 'OPEN', label: 'Open' },
  { value: 'CLOSED', label: 'Closed' },
  { value: 'CANCELLED', label: 'Cancelled' },
] as const

export function EventsTable({ data, status, search, onPageChange, onStatusChange, onSearchChange }: DataTableProps) {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null)

  const table = useReactTable({
    data: data.content,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: data.totalPages,
    getRowId: (row) => row.id.toString(),
    state: {
      pagination: {
        pageIndex: data.page,
        pageSize: data.size,
      },
      expanded: expandedRowId ? { [expandedRowId]: true } : {},
    },
    onExpandedChange: (updater) => {
      const oldState = expandedRowId ? { [expandedRowId]: true } : {};
      const newState = typeof updater === 'function' ? updater(oldState) : updater;

      if (typeof newState === 'boolean') {
        setExpandedRowId(null)
        return
      }

      const prevKeys = Object.keys(oldState);
      const newKeys = Object.keys(newState).filter(key => newState[key] === true);

      const newlyOpened = newKeys.find(key => !prevKeys.includes(key));

      setExpandedRowId(newlyOpened ? Number(newlyOpened) : null);
    },
  })

  return (
    <>
      <TableToolbar
        to="/events/create"
        value={status}
        onChange={(s) => {
          onStatusChange?.(s)
          onPageChange(0, data.size, search)
        }}
        searchValue={search}
        onSearchChange={onSearchChange}
        tabs={statusOptions}
        searchPlaceholder="Search title..."
      />

      <div className='relative flex flex-col gap-4 overflow-auto px-4 lg:px-6'>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {

                    return (
                      <TableHead key={header.id} style={{ width: header.getSize() }}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  const isExpanded = expandedRowId === row.original.id

                  return (
                    <React.Fragment key={row.id}>
                      <TableRow
                        data-state={row.getIsSelected() && "selected"}
                        onClick={() => row.toggleExpanded()}
                        className="cursor-pointer"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="py-1">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>

                      {isExpanded && (
                        <TableRow className="bg-muted/50 border-b hover:bg-muted/50">
                          <TableCell colSpan={columns.length} className="p-4">
                            <ExpandedEventRow eventId={row.original.id} />
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-20 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {data.totalElements > data.size && (
          <TablePagination
            table={table}
            page={data.page}
            pageSize={data.size}
            onPageChange={onPageChange}
          />
        )}

      </div>


    </>
  )
}
