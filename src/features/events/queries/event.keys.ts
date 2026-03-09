import type { EventFilters } from '../types/events.types'

export const eventKeys = {
  all: ['events'] as const,

  lists: () => [...eventKeys.all, 'list'] as const,

  list: (filters: EventFilters) => [...eventKeys.lists(), { filters }] as const,

  details: () => [...eventKeys.all, 'detail'] as const,

  detail: (id: string) => [...eventKeys.details(), id] as const,
}
