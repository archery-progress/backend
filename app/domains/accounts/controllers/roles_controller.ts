import { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'
import {
  createRoleValidator,
  roleSearchValidator,
  updateRoleValidator,
} from '#domains/accounts/validators/roles_validator'

export default class RolesController {
  async index({ request }: HttpContext) {
    const { page, limit, search, forAdmin } = await request.validateUsing(roleSearchValidator)

    return Role.query()
      .withScopes((scopes) => scopes.search(search, forAdmin))
      .preload('permissions')
      .preload('users')
      .paginate(page ?? 1, limit ?? 20)
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createRoleValidator)
    const role = await Role.create(data)

    if (data.permissions) {
      await role.related('permissions').sync(data.permissions)
    }

    return role
  }

  async update({ request, params }: HttpContext) {
    const data = await request.validateUsing(updateRoleValidator)
    const role = await Role.findByOrFail('uid', params.uid)

    if (data.permissions) {
      await role.related('permissions').sync(data.permissions)
    }

    return role.merge(data).save()
  }

  async delete({ params }: HttpContext) {
    const role = await Role.findByOrFail('uid', params.uid)

    await role.related('permissions').detach()
    await role.delete()
  }
}
