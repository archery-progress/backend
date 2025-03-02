import StructureService from '#app/domains/structures/services/structure_service'
import { HttpContext } from '@adonisjs/core/http'
import { createStructureValidator } from '../validators/structure_validator.js'
import StructurePolicy from '../policies/structure_policy.js'
import { inject } from '@adonisjs/core'

@inject()
export default class StructuresController {
  constructor(protected structureService: StructureService) {}

  async show({ params }: HttpContext) {
    const { structureId } = params

    return await this.structureService.findById(structureId)
  }

  async create({ request, bouncer, auth, response }: HttpContext) {
    await bouncer.with(StructurePolicy).authorize('create')
    const data = await request.validateUsing(createStructureValidator)

    const structure = await this.structureService.create(data, auth.user!.id)

    return response.created(structure)
  }
}
