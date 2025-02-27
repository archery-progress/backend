import User from '#app/commons/models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { inject } from '@adonisjs/core'
import StructureService from '#app/domains/structures/services/structure_service'

@inject()
export default class StructurePolicy extends BasePolicy {
  constructor(protected structureService: StructureService) {
    super()
  }

  async create(user: User) {
    const structures = await this.structureService.findAllByOwnerId(user.id)

    if (structures.length >= 5) return false

    return true
  }
}
