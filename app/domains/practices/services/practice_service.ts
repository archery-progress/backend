import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import {
  SearchPracticeSchema,
  StorePracticeSchema,
  UpdatePracticeSchema,
} from '#domains/practices/validators/practice_validator'
import Practice from '#models/practice'

export default class PracticeService {
  async paginate(payload: SearchPracticeSchema): Promise<ModelPaginatorContract<Practice>> {
    return Practice.query()
      .withScopes((scopes) => scopes.search(payload.search))
      .paginate(payload.page ?? 1, payload.limit ?? 20)
  }

  async findByUid(id: string) {
    return Practice.query().preload('member').where('id', id).firstOrFail()
  }

  async store(payload: StorePracticeSchema) {
    return Practice.create(payload)
  }

  async update(payload: UpdatePracticeSchema) {
    const practice = await this.findByUid(payload.uid)
    return practice.merge(payload).save()
  }

  async delete(id: string) {
    const practice = await this.findByUid(id)
    return practice.delete()
  }
}
