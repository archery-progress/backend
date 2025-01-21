import { BasePolicy } from '@adonisjs/bouncer'
import User from '#models/user'
import logger from '@adonisjs/core/services/logger'
import { inject } from '@adonisjs/core'
import { Permissions, PermissionService } from '#app/commons/services/permission_service'

@inject()
export default class RolePolicy extends BasePolicy {
  constructor(protected permissionService: PermissionService) {
    super()
  }
  async before(user: User, _action: string, structureId: string) {
    await user.load('structures')
    const structures = user.structures

    if (structures.some((structure) => structure.id === structureId)) {
      return true
    }

    if (
      await this.permissionService.hasSomePermissions(user.id, structureId, [
        Permissions.ADMINISTRATOR,
        Permissions.MANAGE_STRUCTURE,
      ])
    ) {
      return true
    }
  }

  async create(user: User, structureId: string) {
    let t = await this.permissionService.hasSomePermissions(user.id, structureId, [
      Permissions.MANAGE_ROLES,
    ])

    if (t) {
      logger.info(
        `L'user ${user.email} a les permissions pour créer un rôle dans la structure: ${structureId}`
      )
      return true
    } else {
      logger.error(
        `L'user ${user.email} n'a pas les permissions pour créer un rôle dans la structure: ${structureId}`
      )
      return false
    }
  }
}
