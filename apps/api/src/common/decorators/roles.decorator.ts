import { SetMetadata } from '@nestjs/common'
import type { Role } from '@prisma/client'

export const ROLES_KEY = 'roles'

/** Attach required roles to a route handler. Use with RolesGuard. */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
