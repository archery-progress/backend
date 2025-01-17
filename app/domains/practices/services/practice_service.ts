import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import { inject } from '@adonisjs/core'
import {
  SearchPracticeSchema,
  StorePracticeSchema,
  UpdatePracticeSchema,
} from '#domains/practices/validators/practice_validator'
import Practice from '#models/practice'

@inject()
export default class PracticeService {
  async paginate(payload: SearchPracticeSchema): Promise<ModelPaginatorContract<Practice>> {
    return Practice.query()
      .withScopes((scopes) => scopes.search(payload.search))
      .paginate(payload.page ?? 1, payload.limit ?? 20)
  }

  async findByUid(uid: string) {
    return Practice.findByOrFail('uid', uid)
  }

  async store(payload: StorePracticeSchema) {
    return await Practice.create(payload)
  }

  async update(payload: UpdatePracticeSchema) {
    const practice = await this.findByUid(payload.uid)
    return await practice.merge(payload).save()
  }

  async delete(id: string) {
    const practice = await this.findByUid(id)
    return await practice.delete()
  }
}
