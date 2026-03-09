export interface Events {
  id: number
  title: string
  eventDate: Date
  startTime: Date
  endTime: Date
  status: EventStatuses
}

export interface Event {
  id: number
  title: string
  eventDate: Date
  startTime: Date
  endTime: Date
  status: EventStatuses
}

export interface EventFilters {
  status?: string
  page?: number
  size?: number
  name?: string
}

export interface EventCreate {
  title: string
  eventDate: string
  startTime: string
  endTime: string
  description: string
  location: string
  capacity: number
}

const EventStatuses = {
  OPEN: 'OPEN' as const,
  CLOSED: 'CLOSED' as const,
  CANCELLED: 'CANCELLED' as const,
} as const

export type EventStatuses = (typeof EventStatuses)[keyof typeof EventStatuses]
