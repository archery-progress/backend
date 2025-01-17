import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import { inject } from '@adonisjs/core'
import {
  SearchPracticeMessageSchema,
  StorePracticeMessageSchema,
  UpdatePracticeMessageSchema,
} from '#domains/practices/validators/practice_message_validator'
import PracticeMessage from '#models/practice_message'

@inject()
export default class PracticeMessageService {
  async paginate(
    payload: SearchPracticeMessageSchema
  ): Promise<ModelPaginatorContract<PracticeMessage>> {
    return PracticeMessage.query()
      .withScopes((scopes) => scopes.search(payload.search))
      .paginate(payload.page ?? 1, payload.limit ?? 20)
  }

  async findByUid(uid: string) {
    return PracticeMessage.findByOrFail('uid', uid)
  }

  async store(payload: StorePracticeMessageSchema) {
    return await PracticeMessage.create(payload)
  }

  async update(payload: UpdatePracticeMessageSchema) {
    const practice = await this.findByUid(payload.uid)
    return await practice.merge(payload).save()
  }

  async delete(uid: string) {
    const practice = await this.findByUid(uid)
    return await practice.delete()
  }
}
