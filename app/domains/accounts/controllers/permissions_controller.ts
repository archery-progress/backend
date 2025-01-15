import type { HttpContext } from '@adonisjs/core/http'
import Permission from '#models/permission'
import {
  createPermissionValidator,
  permissionSearchValidator,
  updatePermissionValidator,
} from '#domains/accounts/validators/permissions_validator'

export default class PermissionController {
  async index({ request }: HttpContext) {
    const { page, limit, search, forAdmin } = await request.validateUsing(permissionSearchValidator)

    return Permission.query()
      .withScopes((scopes) => scopes.search(search, forAdmin))
      .paginate(page ?? 1, limit ?? 20)
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(createPermissionValidator)
    return Permission.create(data)
  }

  async update({ request, params }: HttpContext) {
    const data = await request.validateUsing(updatePermissionValidator)
    const permission = await Permission.findByOrFail('uid', params.uid)

    return permission.merge(data).save()
  }

  async delete({ params }: HttpContext) {
    const permission = await Permission.query().where('uid', params.uid).firstOrFail()
    await permission.delete()
  }
}
