import Structure from '#app/commons/models/structure'
import { CreateStructureSchema } from '../validators/structure_validator.js'

export default class StructureService {
  async findById(structureId: string) {
    return Structure.query().where('id', structureId).firstOrFail()
  }

  async findByUserId(userId: string) {
    return Structure.query()
      .whereHas('members', (query) => {
        query.where('user_id', userId)
      })
      .orWhere('owner_id', userId)
  }

  async findAllByOwnerId(ownerId: string) {
    return Structure.query().where('owner_id', ownerId)
  }

  async create(data: CreateStructureSchema, userId: string) {
    const structure = await Structure.create({
      name: data.name,
      ownerId: userId,
    })

    return structure
  }
}
