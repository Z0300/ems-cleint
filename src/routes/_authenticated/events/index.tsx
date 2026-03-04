import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/events/')({
  component: EventsComponent,
  staticData: {
    title: 'Events',
  },
})

function EventsComponent() {
  return <h2>Events</h2>
}
