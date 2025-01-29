import Structure from '#app/commons/models/structure'
import Member from '#models/member'
import {
  CreateMemberSchema,
  GetMembersSchema,
  MemberRoleSchema,
  UpdateMemberSchema,
} from '#domains/members/validators/member_validator'
import { inject } from '@adonisjs/core'
import RoleService from '#app/domains/roles/services/role_service'
import drive from '@adonisjs/drive/services/main'

@inject()
export default class MemberService {
  constructor(protected roleService: RoleService) {}
  async findFromStructure(structureId: string, userId: string): Promise<Member> {
    return Member.query()
      .where('structure_id', structureId)
      .andWhere('user_id', userId)
      .preload('roles')
      .firstOrFail()
  }

  async findAllByStructureId({ structureId, limit = 50, page = 1 }: GetMembersSchema) {
    const structure = await Structure.findOrFail(structureId)

    const ownerId = structure.ownerId

    return Member.query()
      .where('structure_id', structureId)
      .andWhereNot('user_id', ownerId)
      .preload('user')
      .preload('roles')
      .paginate(page, limit)
  }

  async findById(memberId: string) {
    const member = await Member.query()
      .where('id', memberId)
      .preload('user')
      .preload('roles')
      .preload('structure')
      .firstOrFail()

    member.user.avatar = member.user.avatar
      ? await drive.use('gcp').getSignedUrl(member.user.avatar)
      : null

    return member
  }

  async create({ structureId, userId, permissions }: CreateMemberSchema) {
    return Member.create({
      structureId,
      userId,
      permissions,
    })
  }

  async updateById({ memberId, permissions }: UpdateMemberSchema) {
    const member = await this.findById(memberId)

    await member
      .merge({
        permissions,
      })
      .save()
  }

  async deleteById(memberId: string) {
    const member = await this.findById(memberId)
    await member.delete()
  }

  async addRole({ structureId, userId, roleId }: MemberRoleSchema) {
    const member = await this.findFromStructure(structureId, userId)

    await member.related('roles').attach([roleId])
  }

  async removeRole({ structureId, userId, roleId }: MemberRoleSchema) {
    const member = await this.findFromStructure(structureId, userId)

    await member.related('roles').detach([roleId])
  }
}
