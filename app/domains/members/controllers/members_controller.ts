import { inject } from '@adonisjs/core'
import MemberService from '#domains/members/services/member_service'
import { HttpContext } from '@adonisjs/core/http'
import {
  createMemberValidator,
  getMembersValidator,
} from '#domains/members/validators/member_validator'
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

  async store({ params, request, bouncer, response }: HttpContext) {
    const { structureId } = params
    await bouncer.with(MemberPolicy).authorize('create', structureId)

    const data = await request.validateUsing(createMemberValidator)
    const member = await this.memberService.create({ ...data, structureId })
    return response.created(member)
  }

  async update({}: HttpContext) {}

  async delete({}: HttpContext) {}
}
