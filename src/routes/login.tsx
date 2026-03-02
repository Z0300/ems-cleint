import { createFileRoute, redirect } from '@tanstack/react-router'
import AuthLayout from '../components/layout/AuthLayout'
import { LoginForm } from '../components/auth/LoginForm'

export const Route = createFileRoute('/login')({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || '/',
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect })
    }
  },
  component: LoginComponent,
})

function LoginComponent() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
