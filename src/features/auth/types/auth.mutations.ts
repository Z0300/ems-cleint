import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login, logout } from '../api/auth.api'
import { authKeys } from '../queries/auth.keys'
import { toast } from 'sonner'

export const useUserLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      await queryClient.setQueryData(authKeys.user, data)
      toast.success('Logged in successfully')
    },
    onError: () => {
      toast.error('Failed to login. Please check your credentials.')
    },
  })
}

export const useUserLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.setQueryData(authKeys.user, null)
      toast.success('Logged out successfully')
    },
  })
}
