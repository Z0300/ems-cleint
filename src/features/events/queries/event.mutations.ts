import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEvent, updateEvent } from '../api/events.api'
import { eventKeys } from './event.keys'
import { router } from '../../../router'

export const useCreateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEvent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventKeys.lists(),
      })

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

      router.navigate({ to: '/events' })
    },
  })
}
