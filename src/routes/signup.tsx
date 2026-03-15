import { createFileRoute } from '@tanstack/react-router'
import AuthLayout from '../components/layout/AuthLayout'


export const Route = createFileRoute('/signup')({
  component: SignupComponent,
})

function SignupComponent() {
  return (
    <AuthLayout>
      <div>Signup</div>
    </AuthLayout>
  )
}
