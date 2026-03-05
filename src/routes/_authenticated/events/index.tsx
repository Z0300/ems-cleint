import { createFileRoute } from '@tanstack/react-router'
import { columns } from '../../../features/events/columns'
import { DataTable } from '../../../features/events/data-table'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../../api/axios'

export const Route = createFileRoute('/_authenticated/events/')({
  component: EventsComponent,
  staticData: {
    title: 'Events',
  },
})

function EventsComponent() {
  const { isPending, error, data } = useQuery({
    queryKey: ['events'],
    queryFn: async () => await api.get('/events').then((res) => res.data.content),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
