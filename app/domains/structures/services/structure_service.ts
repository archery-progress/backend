import Structure from '#app/commons/models/structure'

export default class StructureService {
  async findById(structureId: string) {
    return Structure.query().where('id', structureId).firstOrFail()
  }
}
