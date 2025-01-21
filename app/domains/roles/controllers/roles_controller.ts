import { inject } from '@adonisjs/core'
import RoleService from '#domains/roles/services/role_service'
import { HttpContext } from '@adonisjs/core/http'
import { createRoleValidator } from '#domains/roles/validators/role_validators'

@inject()
export default class RolesController {
  constructor(protected roleService: RoleService) {}

  async index({}: HttpContext) {}
  async show({}: HttpContext) {}

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createRoleValidator)

    const role = await this.roleService.create(data)

    return response.created(role)
  }
  async update({}: HttpContext) {}
  async delete({}: HttpContext) {}
}
