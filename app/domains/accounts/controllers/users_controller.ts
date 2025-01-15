import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'
import {
  createUserValidator,
  updateUserValidator,
  userSearchValidator,
} from '#domains/accounts/validators/user_validator'
import UserService from '#domains/accounts/services/user_service'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async index({ request }: HttpContext) {
    const payload = await request.validateUsing(userSearchValidator)
    return this.userService.paginate(payload)
  }

  async deleteToken({ response, params }: HttpContext) {
    const user = await User.query().where('uid', params.uid).firstOrFail()
    await db.query().from('auth_access_tokens').where('tokenable_id', user.id).delete()

    return response.redirect().back()
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    return this.userService.store(payload)
  }

  async update({ request, params }: HttpContext) {
    const payload = await request.validateUsing(updateUserValidator)
    return this.userService.update({ ...payload, uid: params.uid })
  }

  async delete({ params }: HttpContext) {
    await this.userService.delete(params.uid)
  }
}
