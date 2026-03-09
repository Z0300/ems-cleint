import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEvent } from '../api/events.api'
import { eventKeys } from './event.keys'

export const useCreateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEvent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventKeys.lists(),
      })
    },

    onError: (error) => {
      // console.error('Create event failed:', error)
    },
  })
}
