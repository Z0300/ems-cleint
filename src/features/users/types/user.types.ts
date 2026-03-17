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

interface UserUpdate {
  fullName: string
  email: string
  mobileNo: string
  role: string
}
