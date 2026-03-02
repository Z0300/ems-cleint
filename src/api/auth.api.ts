import { api } from './axios'
import { setAccessToken } from '../lib/token'

export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', {
    email,
    password,
  })

  setAccessToken(res.data.accessToken)

  return res.data
}

export const logout = async () => {
  await api.post('/auth/logout')
  setAccessToken(null)
}
