import { useAuth } from '../components/auth/auth'
 
export function usePermissions() {
    const { hasRole } = useAuth()
 
    return {
        hasRole,
    }
}