import { BasePolicy } from '@adonisjs/bouncer'
import User from '#models/user'
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

    const isOwner = structures.some(
      (structure) => structure.ownerId === user.id && structure.id === structureId
    )

    if (isOwner) return true

    const isAdmin = await this.permissionService.hasSomePermissions(user.id, structureId, [
      Permissions.ADMINISTRATOR,
      Permissions.MANAGE_STRUCTURE,
    ])

    if (isAdmin) return true
  }

  async create(user: User, structureId: string) {
    return this.permissionService.hasSomePermissions(user.id, structureId, [
      Permissions.MANAGE_ROLES,
    ])
  }

  async view(user: User, structureId: string) {
    return this.permissionService.hasSomePermissions(user.id, structureId, [
      Permissions.VIEW_ROLES,
      Permissions.MANAGE_ROLES,
    ])
  }

  async update(user: User, structureId: string) {
    return this.permissionService.hasSomePermissions(user.id, structureId, [
      Permissions.MANAGE_ROLES,
    ])
  }

  async delete(user: User, structureId: string) {
    return this.permissionService.hasSomePermissions(user.id, structureId, [
      Permissions.MANAGE_ROLES,
    ])
  }
}
