import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

import PracticeFiringSequence from '#models/practice_firing_sequence'
import {
  CreatePracticeFiringSequenceSchema,
  SearchPracticeFiringSequenceSchema,
  UpdatePracticeFiringSequenceSchema,
} from '#domains/practices/validators/practice_firing_sequence_validator'

export default class PracticeFiringSequenceService {
  async paginate(
    payload: SearchPracticeFiringSequenceSchema
  ): Promise<ModelPaginatorContract<PracticeFiringSequence>> {
    return PracticeFiringSequence.query()
      .withScopes((scopes) => scopes.search(payload.search))
      .paginate(payload.page ?? 1, payload.limit ?? 20)
  }

  async findByUid(uid: string) {
    return PracticeFiringSequence.findByOrFail('uid', uid)
  }

  async store(payload: CreatePracticeFiringSequenceSchema) {
    return await PracticeFiringSequence.create(payload)
  }

  async update(payload: UpdatePracticeFiringSequenceSchema) {
    const practice = await this.findByUid(payload.uid)
    return await practice.merge(payload).save()
  }

  async delete(uid: string) {
    const practiceFiringSequence = await this.findByUid(uid)
    return practiceFiringSequence.delete()
  }
}
