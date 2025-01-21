import { inject } from '@adonisjs/core'
import MemberService from '#domains/members/services/member_service'

export enum Permissions {
  INTERNAL_PLATFORM = 1 << 0,
  INTERNAL_MANAGER = 1 << 1,

  ADMINISTRATOR = 1 << 10,
  MANAGE_STRUCTURE = 1 << 11,
  MANAGE_ROLES = 1 << 12,
  MANAGE_MEMBERS = 1 << 14,
  VIEW_MEMBERS = 1 << 14,
  MANAGE_PRACTICES = 1 << 15,
  VIEW_LOGS = 1 << 16,
  MANAGE_NOTIFICATIONS = 1 << 17,
}

@inject()
export class PermissionService {
  constructor(protected memberService: MemberService) {}

  async fromBitfield(bitfield: number): Promise<Permissions[]> {
    return Object.entries(Permissions)
      .filter(([_key, value]) => typeof value === 'number' && (bitfield & value) === value)
      .map(([key]) => Permissions[key as keyof typeof Permissions])
  }

  async getUserPermissionsForStructure(userId: string, structureId: string): Promise<number> {
    const member = await this.memberService.findFromStructure(structureId, userId)
    const t = member.roles.map((role) => role.permissions)
    let permissions: Permissions[] = []

    for (const x of t) {
      let a = await this.fromBitfield(x)
      permissions = permissions.concat(a)
    }

    return permissions.reduce((acc, permission) => acc | permission, 0)
  }

  async hasPermission(
    userId: string,
    structureId: string,
    permission: Permissions
  ): Promise<boolean> {
    const permissions = await this.getUserPermissionsForStructure(userId, structureId)
    return (permissions & permission) === permission
  }

  async hasSomePermissions(
    userId: string,
    structureId: string,
    permissions: Permissions[]
  ): Promise<boolean> {
    const bitfield = await this.getUserPermissionsForStructure(userId, structureId)
    return permissions.some((permission) => (bitfield & permission) === permission)
  }
}
