import User from '#app/commons/models/user'
import { PermissionService, Permissions } from '#app/commons/services/permission_service'
import { BasePolicy } from '@adonisjs/bouncer'

export default class MemberPolicy extends BasePolicy {
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
    ])

    if (isAdmin) return true
  }

  async create(user: User, structureId: string) {
    return this.permissionService.hasSomePermissions(user.id, structureId, [
      Permissions.MANAGE_MEMBERS,
    ])
  }

  async view(user: User, structureId: string) {
    const structures = user.structures
    const isPresentInStructure = structures.some((structure) => structure.id === structureId)

    return isPresentInStructure
  }

  async update(user: User, structureId: string)
}
