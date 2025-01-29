import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import MemberService from '#domains/members/services/member_service'
import MemberPolicy from '../policies/member_policy.js'

@inject()
export default class MemberRolesController {
  constructor(protected memberService: MemberService) {}

  async create({ params, bouncer }: HttpContext) {
    const { structureId, userId, roleId } = params
    await bouncer.with(MemberPolicy).authorize('create', structureId)

    await this.memberService.addRole({ structureId, userId, roleId })
  }

  async delete({ params, bouncer }: HttpContext) {
    const { structureId, userId, roleId } = params

    await bouncer.with(MemberPolicy).authorize('removeRole', structureId, userId)

    await this.memberService.removeRole({ structureId, userId, roleId })
  }
}
