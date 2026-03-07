import { createFileRoute } from '@tanstack/react-router'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { api } from '../../../api/client'
import { DataTableSkeleton } from '../../../components/common/data-table/TableLoader'
import { EventsTable } from '../../../features/events/table'
import type { PaginatedResponse } from '../../../types/page.types'
import type { Events } from '../../../types/events.types'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_authenticated/events/')({
  component: EventsComponent,
  staticData: {
    title: 'Events',
  },
})

function EventsComponent() {
  const [status, setStatus] = useState<string>('OPEN')
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(handler)
  }, [search])


  const { isPending, error, data } = useQuery({
    queryKey: ['events', status, page, pageSize, debouncedSearch],
    queryFn: async () =>
      await api
        .get<PaginatedResponse<Events>>('/events', {
          params: { status, page, size: pageSize, name: debouncedSearch },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  })

  const handlePageChange = (newPage: number, newSize?: number) => {
    setPage(newPage)
    if (newSize) setPageSize(newSize)
  }


  if (isPending) return <DataTableSkeleton />
  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <EventsTable
        data={data}
        status={status}
        search={search}
        onSearchChange={setSearch}
        onStatusChange={(s) => {
          setStatus(s)
          setPage(0)
        }}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
