import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from '../components/layout/AuthLayout'
import { SignupForm } from '../components/auth/SignupForm'

export const Route = createFileRoute('/signup')({
  component: SignupComponent,
})

function SignupComponent() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  )
}
