import { createFileRoute, Link } from '@tanstack/react-router'
import AuthLayout from '../components/layout/AuthLayout'
import { useForm } from '@tanstack/react-form'
import { cn } from '../lib/utils'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '../components/ui/field'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import * as z from 'zod'
import { router } from '../router'
import { sileo } from 'sileo'
import { useAuth } from '../components/auth/auth'

const formSchema = z.object({
  email: z.string().nonempty('Email is required.'),
  password: z.string().nonempty('Password is required.'),
})

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const { login } = useAuth()
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await login(value.email, value.password)
        await router.invalidate()
        router.navigate({ to: '/dashboard' })
        sileo.success({
          title: 'Login successful',
          description: 'You have successfully logged in.',
        })
      } catch (error) {
        sileo.error({
          title: 'Login failed',
          description:
            'An error occurred while logging in. Please check your credentials and try again.',
        })
      }
    },
  })

  return (
    <AuthLayout>
      <form
        className={cn('flex flex-col gap-6')}
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="password"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                    type="password"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </>
            )}
          />

          <Field>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{' '}
              <Link className="underline underline-offset-4" to="/signup">
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </AuthLayout>
  )
}
