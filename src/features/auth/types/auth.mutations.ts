import { useMutation } from '@tanstack/react-query'
import { login, logout } from '../api/auth.api'
import { toast } from 'sonner'

export const useUserLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      toast.success('Logged in successfully')
    },
    onError: () => {
      toast.error('Failed to login. Please check your credentials.')
    },
  })
}

export const useUserLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      toast.success('Logged out successfully')
    },
  })
}
