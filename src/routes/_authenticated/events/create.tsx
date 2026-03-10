import { createFileRoute } from '@tanstack/react-router'
import { useCreateEvent } from '../../../features/events/queries/event.mutations'
import { EventForm } from '../../../features/events/form'

export const Route = createFileRoute('/_authenticated/events/create')({
  component: CreateEventComponent,
  staticData: {
    title: 'Create Event'
  }
})


function CreateEventComponent() {
  const { mutateAsync, isPending } = useCreateEvent()
  return (
    <EventForm
      submitLabel="Create"
      isPending={isPending}
      onSubmit={async (payload) => {
        await mutateAsync(payload)
      }}
    />
  )
}
