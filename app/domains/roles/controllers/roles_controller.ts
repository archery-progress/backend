import { inject } from '@adonisjs/core'
import RoleService from '#domains/roles/services/role_service'
import { HttpContext } from '@adonisjs/core/http'
import { createRoleValidator, updateRoleValidator } from '#domains/roles/validators/role_validators'
import logger from '@adonisjs/core/services/logger'
import RolePolicy from '#domains/roles/policies/role_policy'

@inject()
export default class RolesController {
  constructor(protected roleService: RoleService) {}

  async index({ params, bouncer }: HttpContext) {
    const { structureId } = params
    await bouncer.with(RolePolicy).authorize('view', structureId)

    return this.roleService.findByStructureId(structureId)
  }

  async show({ params, bouncer }: HttpContext) {
    const { id, structureId } = params
    await bouncer.with(RolePolicy).authorize('view', structureId)

    return this.roleService.findById(id)
  }

  async store({ request, response, params, bouncer }: HttpContext) {
    const { structureId } = params
    await bouncer.with(RolePolicy).authorize('create', structureId)
    const data = await request.validateUsing(createRoleValidator)

    const role = await this.roleService.create({
      ...data,
      structureId,
    })
    logger.info(`Role created: ${role.id} to structure: ${structureId}`)

    return response.created(role)
  }

  async update({ request, params, bouncer }: HttpContext) {
    const { id, structureId } = params
    await bouncer.with(RolePolicy).authorize('update', structureId)
    const data = await request.validateUsing(updateRoleValidator)

    return this.roleService.updateById({ ...data, roleId: id })
  }

  async delete({ params, bouncer }: HttpContext) {
    const { id, structureId } = params
    await bouncer.with(RolePolicy).authorize('delete', structureId)

    return this.roleService.deleteById(id)
  }
}
