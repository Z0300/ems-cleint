import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEvent, updateEvent } from '../api/events.api'
import { eventKeys } from './event.keys'
import { router } from '../../../router'
import { toast } from 'sonner'

export const useCreateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEvent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventKeys.lists(),
      })

      toast.success('Event created successfully')

      router.navigate({ to: '/events' })
    },
  })
}

export const useUpdateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateEvent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventKeys.lists(),
      })

      toast.success('Event updated successfully')

      router.navigate({ to: '/events' })
    },
  })
}
