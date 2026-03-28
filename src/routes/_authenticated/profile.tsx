import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Profile from '../../components/user/profile'
import { PermissionGuard } from '../../components/auth/permission-guard'

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfileComponent,
  staticData: {
    title: 'Edit Profile',
  },
})

function ProfileComponent() {
  const { auth } = Route.useRouteContext()
  const navigate = useNavigate()
  return (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <PermissionGuard role="ATTENDEE">
        <Profile
          user={
            auth.user
              ? {
                  id: String(auth.user.id ?? ''),
                  fullName: auth.user.fullName ?? '',
                  email: auth.user.email ?? '',
                  mobileNo: (auth.user as { mobileNo?: string }).mobileNo ?? '',
                  role: auth.user.role ?? '',
                }
              : null
          }
          onBack={() => navigate({ to: '/' })}
        />
      </PermissionGuard>
    </div>
  )
}

