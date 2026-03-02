import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/$eventsId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/events/$eventsId"!</div>
}
