import { api } from '../../../api/client'
import type { PaginatedResponse } from '../../common/types/page.types'
import type { EventCreate, Events } from '../types/events.types'
import type { EventFilters } from '../types/events.types'

export const getEvents = async (filters: EventFilters) => {
  const res = await api.get<PaginatedResponse<Events>>('/events', {
    params: filters,
  })
  return res.data
}

export const getEvent = async (id: number) => {
  const res = await api.get(`/events/${id}`)
  return res.data
}

export const createEvent = async (data: EventCreate) => {
  const res = await api.post('/events', data)
  return res.data
}
