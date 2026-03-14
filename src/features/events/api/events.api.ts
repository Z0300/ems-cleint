import { api } from '../../../api/client'
import type { PaginatedResponse } from '../../common/types/page.types'
import type {
  EventCreate as CreateEventPayload,
  Event,
  Events,
  UpdateEventPayload,
} from '../types/events.types'
import type { EventFilters } from '../types/events.types'

export const getEvents = async (filters: EventFilters) => {
  const res = await api.get<PaginatedResponse<Events>>('/events', {
    params: filters,
  })
  return res.data
}

export const getEvent = async (id: string) => {
  const res = await api.get<Event>(`/events/${id}`)
  return res.data
}

export const createEvent = async (data: CreateEventPayload) => {
  const res = await api.post('/events', data)
  return res.data
}

export const updateEvent = async ({ id, data }: UpdateEventPayload) => {
  const res = await api.put(`/events/${id}`, data)
  return res.data
}
