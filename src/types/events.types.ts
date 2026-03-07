export interface Events {
  id: number
  title: string
  eventDate: Date
  startTime: Date
  endTime: Date
  status: EventStatus
}

const EventStatus = {
  OPEN: 'OPEN' as const,
  CLOSED: 'CLOSED' as const,
  CANCELLED: 'CANCELLED' as const,
} as const

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus]
