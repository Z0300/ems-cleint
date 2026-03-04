import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardComponent,
  staticData: {
    title: 'Dashboard',
  },
})

function DashboardComponent() {
  const { auth } = Route.useRouteContext()
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {' '}
      <p className="text-gray-600">
        Hello, <strong>{auth.user?.fullName}</strong>! You are successfully authenticated.
      </p>
    </div>
  )
}
