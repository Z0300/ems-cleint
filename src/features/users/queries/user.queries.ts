import { useQuery } from '@tanstack/react-query'
import { dashboard } from '../api/users.api'
import { userKeys } from './user.keys'

export const useUserDashboard = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: () => dashboard(),
    placeholderData: (prev) => prev,
  })
}
