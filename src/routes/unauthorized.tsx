import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react'
import { Button } from '../components/ui/button'

export const Route = createFileRoute('/unauthorized')({
  component: Unauthorized,
})

function Unauthorized() {
  const router = useRouter()

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-max flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 ring-1 ring-destructive/20">
          <ShieldAlert className="h-10 w-10 text-destructive" />
        </div>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
          401
        </h1>

        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Unauthorized Access
        </h2>

        <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
          Sorry, you don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm sm:max-w-none">
          <Button asChild size="lg" className="w-full sm:w-auto gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto gap-2"
            onClick={() => router.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
