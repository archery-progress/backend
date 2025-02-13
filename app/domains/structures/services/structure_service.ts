import Structure from '#app/commons/models/structure'

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
}
