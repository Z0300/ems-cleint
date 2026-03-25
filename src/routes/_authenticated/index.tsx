import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '../../components/user/dashboard'
import { PermissionGuard } from '../../components/auth/permission-guard'

export const Route = createFileRoute('/_authenticated/')({
  component: DashboardComponent,
  staticData: {
    title: 'Dashboard',
  },
})

function DashboardComponent() {
  const { auth } = Route.useRouteContext()
  return (
    <div className='relative flex flex-col gap-4 overflow-auto px-4 lg:px-6'>
      <PermissionGuard role="ATTENDEE">
        <Dashboard user={auth.user} />
      </PermissionGuard>
    </div>
  )
}
