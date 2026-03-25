import { api } from '../../../api/client'
import type { CreateUserPayload, UserDashboardResponse } from '../types/user.types'

export const createUser = async (data: CreateUserPayload) => {
  const res = await api.post('/users', data)
  return res.data
}

export const dashboard = async () => {
  const res = await api.get<UserDashboardResponse>('/users/dashboard')
  return res.data
}
