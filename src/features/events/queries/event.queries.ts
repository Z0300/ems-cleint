import { useQuery } from '@tanstack/react-query'
import { eventKeys } from './event.keys'
import { getEvents, getEvent } from '../api/events.api'
import type { EventFilters } from '../types/events.types'

export const useEvents = (filters: EventFilters) => {
  return useQuery({
    queryKey: eventKeys.list(filters),
    queryFn: () => getEvents(filters),
    placeholderData: (prev) => prev,
  })
}

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => getEvent(id),
    enabled: !!id,
  })
}
