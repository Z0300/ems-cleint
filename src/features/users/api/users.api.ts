import { api } from '../../../api/client'
import type { CreateUserPayload } from '../types/user.types'

export const createUser = async (data: CreateUserPayload) => {
  const res = await api.post('/users', data)
  return res.data
}
