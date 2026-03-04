import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardComponent,
})

function DashboardComponent() {
  const { auth } = Route.useRouteContext()
  console.log(auth)
  return (
    <div>
      {' '}
      <p className="text-gray-600">
        Hello, <strong>{auth.user?.fullName}</strong>! You are successfully authenticated.
      </p>
    </div>
  )
}
