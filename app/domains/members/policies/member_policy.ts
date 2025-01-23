import User from '#app/commons/models/user'
import { PermissionService, Permissions } from '#app/commons/services/permission_service'
import { BasePolicy } from '@adonisjs/bouncer'
import { inject } from '@adonisjs/core'
import MemberService from '#domains/members/services/member_service'
import StructureService from '#domains/structures/services/structure_service'
import Member from '#app/commons/models/member'

@inject()
export default class MemberPolicy extends BasePolicy {
  constructor(
    protected permissionService: PermissionService,
    protected memberService: MemberService,
    protected structureService: StructureService
  ) {
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

  async view(user: User, structureId: string, member?: Member) {
    const structures = user.structures
    const isPresentInStructure = structures.some((structure) => structure.id === structureId)

    if (member && member.userId === user.id) return true

    return isPresentInStructure
  }

  async update(user: User, structureId: string, memberId: string) {
    const member = await this.memberService.findById(memberId)
    const structure = await this.structureService.findById(structureId)

    // The owner of the structure cannot be updated by another user
    if (structure.ownerId === member.userId && user.id !== member.userId) {
      return false
    }

    return this.permissionService.hasSomePermissions(user.id, structureId, [
      Permissions.MANAGE_MEMBERS,
    ])
  }

  async delete(user: User, structureId: string, memberId: string) {
    const member = await this.memberService.findById(memberId)
    const structure = await this.structureService.findById(structureId)

    // The owner of the structure cannot be deleted by another user
    if (structure.ownerId === member.userId && user.id !== member.userId) {
      return false
    }

    return this.permissionService.hasSomePermissions(user.id, structureId, [
      Permissions.MANAGE_MEMBERS,
    ])
  }
}
