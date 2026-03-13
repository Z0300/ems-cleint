import { createFileRoute, redirect } from '@tanstack/react-router'
import { useCreateEvent } from '../../../features/events/queries/event.mutations'
import { EventForm } from '../../../features/events/form'

export const Route = createFileRoute('/_authenticated/events/create')({
  beforeLoad({ context, location }) {
    if (!context.auth.hasRole('ORGANIZER')) {
      throw redirect({
        to: '/unauthorized',
        search: {
          redirect: location.href,
          reason: 'insufficient_role'
        }
      })
    }
  },
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
      actionTitle='Create Event'
      actionDescription='Add a new event to your schedule'
      isPending={isPending}
      onSubmit={async (payload) => {
        await mutateAsync(payload)
      }}
    />

  )
}
