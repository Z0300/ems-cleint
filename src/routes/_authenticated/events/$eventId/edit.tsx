import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEvent } from '../../../../features/events/queries/event.queries'
import { EventForm } from '../../../../features/events/form'
import { useUpdateEvent } from '../../../../features/events/queries/event.mutations'
import { NotFound } from '../../../../components/common/not-found'

export const Route = createFileRoute('/_authenticated/events/$eventId/edit')({
  beforeLoad({ context, location }) {
    console.log("beforeLoad edit route", context.auth.user)
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
  component: EditEventComponent,
  staticData: {
    title: 'Edit Event'
  }
})



function EditEventComponent() {

  const { eventId } = Route.useParams()
  const { data } = useEvent(eventId)
  const { mutateAsync, isPending } = useUpdateEvent()

  if (!data) {
    return <NotFound />
  }

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
