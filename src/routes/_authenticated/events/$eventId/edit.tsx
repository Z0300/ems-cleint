import { createFileRoute } from '@tanstack/react-router'
import { useEvent } from '../../../../features/events/queries/event.queries'
import { EventForm } from '../../../../features/events/form'
import { useUpdateEvent } from '../../../../features/events/queries/event.mutations'

export const Route = createFileRoute('/_authenticated/events/$eventId/edit')({
  component: EditEventComponent,
  staticData: {
    title: 'Edit Event'
  }
})

function EditEventComponent() {

  const { eventId } = Route.useParams()
  const { data } = useEvent(eventId)
  const { mutateAsync, isPending } = useUpdateEvent()

  console.log(data)

  return (
    <EventForm
      defaultValues={data}
      submitLabel="Update"
      actionTitle='Update Event'
      actionDescription='Update event details'
      isPending={isPending}
      onSubmit={async (payload) => {
        await mutateAsync({ id: Number(eventId), data: payload })
      }}
    />)
}
