import { inject } from '@adonisjs/core'
import RoleService from '#domains/roles/services/role_service'
import { HttpContext } from '@adonisjs/core/http'
import { createRoleValidator } from '#domains/roles/validators/role_validators'
import logger from '@adonisjs/core/services/logger'
import RolePolicy from '#domains/roles/policies/role_policy'

@inject()
export default class RolesController {
  constructor(protected roleService: RoleService) {}

  async index({}: HttpContext) {}
  async show({}: HttpContext) {}

  async store({ request, response, params, bouncer }: HttpContext) {
    const { structureId } = params
    await bouncer.with(RolePolicy).authorize('create' as never, structureId)
    const data = await request.validateUsing(createRoleValidator)

    const role = await this.roleService.create({
      ...data,
      structureId,
    })
    logger.info(`Role created: ${role.id} to structure: ${structureId}`)

    return response.created(role)
  }
  async update({}: HttpContext) {}
  async delete({}: HttpContext) {}
}
