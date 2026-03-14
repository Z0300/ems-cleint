import { Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { format, parseISO } from 'date-fns'
import { Field, FieldError, FieldGroup, FieldLabel } from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Spinner } from '../../components/ui/spinner'
import type { Event, EventCreate } from './types/events.types'



const formSchema = z.object({
    title: z.string().nonempty('Title is required.'),
    eventDate: z.string().nonempty('Date is required.'),
    startTime: z.string().nonempty('Start time is required.'),
    endTime: z.string().nonempty('End time is required.'),
    location: z.string().nonempty('Location is required'),
    capacity: z.number().nonnegative('Capacity must be non-negative'),
    description: z.string(),
})

type EventFormProps = {
    defaultValues?: Event
    onSubmit: (payload: EventCreate) => Promise<void>
    isPending?: boolean
    actionTitle?: string;
    actionDescription: string;
    submitLabel?: string
}

export function EventForm({
    defaultValues,
    onSubmit,
    isPending,
    actionTitle,
    actionDescription,
    submitLabel = 'Save',
}: EventFormProps) {

    const form = useForm({
        defaultValues: defaultValues ?? {
            title: '',
            eventDate: '',
            startTime: '',
            endTime: '',
            description: '',
            location: '',
            capacity: 0,
        },
        validators: {
            onChange: formSchema,
        },
        onSubmit: async ({ value }) => {

            const eventDateObj = parseISO(value.eventDate)
            const startTimeObj = parseISO(`${value.eventDate}T${value.startTime}`)
            const endTimeObj = parseISO(`${value.eventDate}T${value.endTime}`)

            const payload: EventCreate = {
                ...value,
                eventDate: format(eventDateObj, 'yyyy-MM-dd'),
                startTime: format(startTimeObj, 'HH:mm:ss'),
                endTime: format(endTimeObj, 'HH:mm:ss'),
            }

            await onSubmit(payload)

        },

    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}

            className='w-full max-w-2xl mx-auto'
        >
            <Card>
                <CardHeader>
                    <CardTitle>{actionTitle}</CardTitle>
                    <CardDescription>{actionDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <form.Field
                            name="title"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel>Title</FieldLabel>
                                        <Input
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}
                        />


                        <form.Field
                            name="eventDate"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel>Date</FieldLabel>
                                        <Input
                                            type="date"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}
                        />


                        <form.Field
                            name="startTime"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel>Start Time</FieldLabel>
                                        <Input
                                            type="time"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}
                        />


                        <form.Field
                            name="endTime"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel>End Time</FieldLabel>
                                        <Input
                                            type="time"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}
                        />


                        <form.Field
                            name="location"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel>Location</FieldLabel>
                                        <Input
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}
                        />


                        <form.Field
                            name="capacity"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel>Capacity</FieldLabel>
                                        <Input
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                            aria-invalid={isInvalid}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}
                        />



                        <div className="md:col-span-2">
                            <form.Field
                                name="description"
                                children={(field) => (
                                    <Field>
                                        <FieldLabel>Description</FieldLabel>
                                        <Textarea
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                    </Field>
                                )}
                            />
                        </div>

                    </FieldGroup>

                </CardContent>
                <CardFooter className="flex justify-end gap-2">

                    <Link to="/events">
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </Link>

                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Spinner data-slot="inline-start" />
                                Saving...
                            </>
                        ) : (
                            submitLabel
                        )}
                    </Button>

                </CardFooter>
            </Card>

        </form>
    )
}