import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../api/users.api'
import { userKeys } from './user.keys'
import { toast } from 'sonner'
import { router } from '../../../router'

export const useCreateAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })

      toast.info('User created successfully. Please verify the user email')

      router.navigate({ to: '/login' })
    },

    onError: () => {
      toast.error('Failed to create user')
    },
  })
}
