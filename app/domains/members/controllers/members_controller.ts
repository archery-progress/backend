import { inject } from '@adonisjs/core'
import MemberService from '#domains/members/services/member_service'
import { HttpContext } from '@adonisjs/core/http'
import { getMembersValidator } from '#domains/members/validators/member_validator'
import MemberPolicy from '#domains/members/policies/member_policy'

@inject()
export default class MembersController {
  constructor(protected memberService: MemberService) {}

  async index({ params, request, bouncer }: HttpContext) {
    const { structureId } = params
    await bouncer.with(MemberPolicy).authorize('view', structureId)
    const data = await request.validateUsing(getMembersValidator)

    return this.memberService.findAllByStructureId({ ...data, structureId })
  }

  async show({}: HttpContext) {}

  async store({}: HttpContext) {}

  async update({}: HttpContext) {}

  async delete({}: HttpContext) {}
}
