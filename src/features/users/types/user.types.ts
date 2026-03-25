export interface User {
  id: number
  fullName: string
  email: string
  mobileNo: string
  role: string
}

export interface UserFilters {
  role?: string
  page?: number
  size?: number
  name?: string
}

export interface CreateUserPayload {
  fullName: string
  email: string
  password: string
  mobileNo: string
}

export interface UserDashboardResponse {
  recommended: UserEventsResponse[]
  popular: UserEventsResponse[]
  registered: UserEventsResponse[]
  past: UserEventsResponse[]
}

interface UserEventsResponse {
  id: number
  title: string
  description: string
  eventDate: string
  startTime: string
  endTime: string
  location: string
  capacity: number
  type: string
  status: string
  tags: string[]
}
