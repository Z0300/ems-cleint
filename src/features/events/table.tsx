'use client'

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

interface DataTableProps {
  data: PaginatedResponse<Events>
  status: string
  search: string
  onPageChange: (page: number, size?: number, search?: string) => void
  onStatusChange?: (status: string) => void
  onSearchChange?: (search: string) => void
}

const statusOptions = [
  { value: 'OPEN', label: 'Open' },
  { value: 'CLOSED', label: 'Closed' },
  { value: 'CANCELLED', label: 'Cancelled' },
] as const

export function EventsTable({ data, status, search, onPageChange, onStatusChange, onSearchChange }: DataTableProps) {

  const table = useReactTable({
    data: data.content,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: data.totalPages,
    state: {
      pagination: {
        pageIndex: data.page,
        pageSize: data.size,
      },
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
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          table={table}
          page={data.page}
          pageSize={data.size}
          onPageChange={onPageChange}
        />

      </div>


    </>
  )
}
