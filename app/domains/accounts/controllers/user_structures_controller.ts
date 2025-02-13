import StructureService from '#app/domains/structures/services/structure_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserStructuresController {
  constructor(protected structureService: StructureService) {}

  async index({ auth }: HttpContext) {
    return this.structureService.findByUserId(auth.user!.id)
  }
}
