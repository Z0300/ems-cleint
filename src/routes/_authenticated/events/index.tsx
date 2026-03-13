import { createFileRoute } from '@tanstack/react-router'
import { DataTableSkeleton } from '../../../components/common/data-table/TableLoader'
import { EventsTable } from '../../../features/events/table'
import { useEvents } from '../../../features/events/queries/event.queries'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../components/auth/auth'

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
  const user = useAuth();
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(handler)
  }, [search])


  const { isPending, error, data } = useEvents({
    status,
    page,
    size: pageSize,
    name: debouncedSearch,
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
