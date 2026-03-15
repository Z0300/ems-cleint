import { api } from '../../../api/client'
import type { UserLoginPayload, UserLoginResponse } from '../types/auth.types'

export const login = async (data: UserLoginPayload) => {
  const res = await api.post<UserLoginResponse>('/auth/login', data)
  return res.data
}

export const logout = async () => {
  await api.post('/auth/logout')
}
