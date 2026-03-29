import { Role } from '@prisma/client'
import { ROLES_KEY, Roles } from './roles.decorator'

describe('Roles decorator', () => {
  it('sets roles metadata on a handler', () => {
    class TestController {
      @Roles(Role.ADMIN)
      adminEndpoint() {}
    }

    const roles = Reflect.getMetadata(ROLES_KEY, TestController.prototype.adminEndpoint)
    expect(roles).toEqual([Role.ADMIN])
  })

  it('sets multiple roles on a handler', () => {
    class TestController {
      @Roles(Role.USER, Role.ADMIN)
      multiRoleEndpoint() {}
    }

    const roles = Reflect.getMetadata(ROLES_KEY, TestController.prototype.multiRoleEndpoint)
    expect(roles).toEqual([Role.USER, Role.ADMIN])
  })

  it('exports ROLES_KEY constant', () => {
    expect(ROLES_KEY).toBe('roles')
  })
})
