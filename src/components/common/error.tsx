import { Link, useRouter } from '@tanstack/react-router'
import { AlertTriangle, Home, RotateCcw } from 'lucide-react'
import { Button } from '../ui/button'

interface ErrorProps {
    error?: unknown
    reset?: () => void
}

export function ErrorComponent({ error, reset }: ErrorProps) {
    const router = useRouter()

    const errorMessage =
        error instanceof Error
            ? error.message
            : typeof error === 'string'
                ? error
                : 'An unexpected error occurred. Please try again later.'

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-max flex-col items-center justify-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 ring-1 ring-destructive/20">
                    <AlertTriangle className="h-10 w-10 text-destructive" />
                </div>

                <h1 className="mt-8 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
                    Something went wrong
                </h1>

                <div className="mt-6 max-w-md w-full rounded-md bg-muted/50 p-4 border border-border">
                    <p className="text-sm font-medium text-muted-foreground wrap-break-word">
                        {errorMessage}
                    </p>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm sm:max-w-none">
                    {reset ? (
                        <Button
                            size="lg"
                            className="w-full sm:w-auto gap-2"
                            onClick={reset}
                        >
                            <RotateCcw className="h-4 w-4" />
                            Try Again
                        </Button>
                    ) : (
                        <Button
                            size="lg"
                            className="w-full sm:w-auto gap-2"
                            onClick={() => router.history.back()}
                        >
                            <RotateCcw className="h-4 w-4" />
                            Go Back
                        </Button>
                    )}

                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto gap-2"
                    >
                        <Link to="/">
                            <Home className="h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
