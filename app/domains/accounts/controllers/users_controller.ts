import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'
import StringHelper from '@adonisjs/core/helpers/string'
import {
  createUserValidator,
  updateUserValidator,
  userSearchValidator,
} from '#domains/accounts/validators/user_validator'
import AssetsService from '#app/commons/services/assets_service'

@inject()
export default class UsersController {
  constructor(protected assetsService: AssetsService) {}

  async index({ request }: HttpContext) {
    const { page, limit, search, type, status } = await request.validateUsing(userSearchValidator)

    return User.query()
      .withScopes((scopes) => scopes.search(search, type, status))
      .preload('roles')
      .paginate(page ?? 1, limit ?? 20)
  }

  async deleteToken({ response, params }: HttpContext) {
    const user = await User.query().where('uid', params.uid).firstOrFail()
    await db.query().from('auth_access_tokens').where('tokenable_id', user.id).delete()

    return response.redirect().back()
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)
    const uid = StringHelper.generateRandom(10)

    const user = await User.create({
      ...data,
      uid,
      avatar: data.avatar
        ? await this.assetsService.upload({
            location: `users/${uid}/avatar`,
            file: data.avatar,
            transformer: User.transformAvatar,
          })
        : null,
    })

    if (data.permissions) {
      await user.related('permissions').sync(data.permissions)
    }

    if (data.roles) {
      await user.related('roles').sync(data.roles)
    }

    return response.redirect().toRoute('manager.users.index')
  }

  async update({ request, params }: HttpContext) {
    const data = await request.validateUsing(updateUserValidator(params.uid))
    const user = await User.findByOrFail('uid', params.uid)

    await user
      .merge({
        ...data,
        avatar: data.avatar
          ? await this.assetsService.upload({
              location: `users/${user.uid}/avatar`,
              file: data.avatar,
              transformer: User.transformAvatar,
            })
          : user.avatar,
      })
      .save()

    if (data.permissions) {
      await user.related('permissions').sync(data.permissions)
    }

    if (data.roles) {
      await user.related('roles').sync(data.roles)
    }
    return user
  }

  async delete({ params }: HttpContext) {
    const user = await User.findByOrFail('uid', params.uid)

    await user.related('permissions').detach()
    await user.related('roles').detach()

    await user.delete()
  }
}
