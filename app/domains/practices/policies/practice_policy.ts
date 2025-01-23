import { BasePolicy } from '@adonisjs/bouncer'
import { inject } from '@adonisjs/core'
import { Permissions, PermissionService } from '#app/commons/services/permission_service'
import User from '#models/user'

@inject()
export default class PracticePolicy extends BasePolicy {
  constructor(protected permissionService: PermissionService) {
    super()
  }

  async before(user: User, _action: string, structureId: string) {
    await user.load('structures')
    const structures = user.structures

    if (
      await this.permissionService.hasSomePermissions(user.id, structureId, [
        Permissions.ADMINISTRATOR,
        Permissions.INTERNAL_MANAGER,
      ])
    ) {
      return true
    }

    if (structures.some((structure) => structure.id === structureId)) {
      // return true
    }
  }

  async view(user: User, structureId: string) {
    return this.permissionService.hasSomePermissions(user.id, structureId, [
      Permissions.MANAGE_PRACTICES,
    ])
  }

  async create(user: User, structureId: string) {
    return this.permissionService.hasSomePermissions(user.id, structureId, [
      Permissions.MANAGE_PRACTICES,
    ])
  }

  async update(user: User, structureId: string) {
    return this.permissionService.hasSomePermissions(user.id, structureId, [
      Permissions.MANAGE_PRACTICES,
    ])
  }

  async delete(user: User, structureId: string) {
    return this.permissionService.hasSomePermissions(user.id, structureId, [
      Permissions.MANAGE_PRACTICES,
    ])
  }
}
