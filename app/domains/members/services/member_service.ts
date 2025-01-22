import Structure from '#app/commons/models/structure'
import Member from '#models/member'
import { GetMembersSchema } from '#domains/members/validators/member_validator'

export default class MemberService {
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
}
