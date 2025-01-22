import { inject } from '@adonisjs/core'
import MemberService from '#domains/members/services/member_service'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MembersController {
  constructor(protected memberService: MemberService) {}

  async index({}: HttpContext) {}

  async show({}: HttpContext) {}

  async store({}: HttpContext) {}

  async update({}: HttpContext) {}

  async delete({}: HttpContext) {}
}
