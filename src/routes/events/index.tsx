import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/')({
  component: EventsComponent,
})

function EventsComponent() {
  return <h2>Events</h2>
}
