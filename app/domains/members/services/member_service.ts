import Structure from '#app/commons/models/structure'
import Member from '#models/member'
import {
  CreateMemberSchema,
  GetMembersSchema,
  UpdateMemberSchema,
} from '#domains/members/validators/member_validator'
import { inject } from '@adonisjs/core'
import RoleService from '#app/domains/roles/services/role_service'

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
      .preload('roles')
      .paginate(page, limit)
  }

  async findById(memberId: string) {
    return Member.query().where('id', memberId).firstOrFail()
  }

  async create({ structureId, userId }: CreateMemberSchema) {
    return Member.create({
      structureId,
      userId,
      permissions: 0,
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
}
