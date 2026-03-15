import { usePermissions } from "../../hooks/use-permission"

interface PermissionGuardProps {
    children: React.ReactNode
    role?: string
}

export function PermissionGuard({
    children,
    role
}: PermissionGuardProps) {
    const { hasRole } = usePermissions()

    const hasRequiredRole =
        role === undefined || hasRole(role)

    if (hasRequiredRole) {
        return <>{children}</>
    }

    return null
}