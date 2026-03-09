import { createFileRoute, Link } from '@tanstack/react-router'
import { Field, FieldError, FieldGroup, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, } from '../../../components/ui/card'
import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { useCreateEvent } from '../../../features/events/queries/event.mutations'
import type { EventCreate } from '../../../features/events/types/events.types'
import { sileo } from 'sileo'
import { router } from '../../../router'
import { Textarea } from '../../../components/ui/textarea'
import { Spinner } from '../../../components/ui/spinner'
import { format, parseISO } from 'date-fns'
import type { AxiosError } from 'axios'
import axios from 'axios'

export const Route = createFileRoute('/_authenticated/events/create')({
  component: CreateEventComponent,
  staticData: {
    title: 'Create Event'
  }
})

const formSchema = z.object({
  title: z.string().nonempty('Title is required.'),
  eventDate: z
    .string()
    .nonempty('Date is required.')
    .refine((val) => {
      const selectedDate = new Date(val)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, {
      message: 'Date must be today or in the future.',
    }),
  startTime: z.string().nonempty('Start time is required.'),
  endTime: z.string().nonempty('End time is required.'),
  location: z.string().nonempty('Location is required'),
  capacity: z.number().nonnegative('Capacity must be a non-negative number'),
  description: z.string(),
})

function CreateEventComponent() {
  const { mutateAsync, isPending, error } = useCreateEvent()

  const form = useForm({
    defaultValues: {
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
      try {

        const eventDateObj = parseISO(value.eventDate)
        const startTimeObj = parseISO(`${value.eventDate}T${value.startTime}`)
        const endTimeObj = parseISO(`${value.eventDate}T${value.endTime}`)

        const payload: EventCreate = {
          ...value,
          eventDate: format(eventDateObj, 'yyyy-MM-dd'),
          startTime: format(startTimeObj, 'HH:mm:ss'),
          endTime: format(endTimeObj, 'HH:mm:ss'),
        }

        await mutateAsync(payload)

        router.navigate({ to: '/events' })

        sileo.success({
          title: 'Success',
          description: 'You have successfully created a new event.',
        })
      } catch (err: any) {
        console.log('FULL ERROR:', err)
        console.log('RESPONSE:', err.response)
        console.log('DATA:', err.response?.data)
        sileo.error({
          title: 'Failed',
          description: 'You have failed to create an event.',
        })
      }
    },
  })

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card lg:col-span-3">
        <CardHeader>
          <CardDescription>Create new event</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }
          }>
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <form.Field
                name="title"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Title</FieldLabel>
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
                name="eventDate"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type='date'
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
                      <FieldLabel htmlFor={field.name}>Start Time</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type='time'
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
                      <FieldLabel htmlFor={field.name}>End Time</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type='time'
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
                      <FieldLabel htmlFor={field.name}>Location</FieldLabel>
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
                name="capacity"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Capacity</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(parseInt(e.target.value))}
                        aria-invalid={isInvalid}
                        type='number'
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />

              <div className='md:col-span-2'>
                <form.Field
                  name="description"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                        <Textarea
                          id={field.name}
                          name={field.name}
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
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                <Link to="/events">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={isPending}>{isPending ? `${<Spinner data-slot="inline-start" />} Creating...` : `Create Event`}</Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div >


  )
}
