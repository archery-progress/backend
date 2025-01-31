import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import {
  SearchPracticePresetSchema,
  StorePracticePresetSchema,
  UpdatePracticePresetSchema,
} from '#domains/practices/validators/practice_preset_validator'
import PracticePreset from '#models/practice_preset'

export default class PracticePresetService {
  async paginate(
    payload: SearchPracticePresetSchema
  ): Promise<ModelPaginatorContract<PracticePreset>> {
    return PracticePreset.query()
      .withScopes((scopes) => scopes.search(payload.search))
      .paginate(payload.page ?? 1, payload.limit ?? 20)
  }

  async findByUid(uid: string) {
    return PracticePreset.findByOrFail('uid', uid)
  }

  async store(payload: StorePracticePresetSchema) {
    return PracticePreset.create(payload)
  }

  async update(payload: UpdatePracticePresetSchema) {
    const practicePresetPreset = await this.findByUid(payload.uid)
    return practicePresetPreset.merge(payload).save()
  }

  async delete(uid: string) {
    const practicePresetPreset = await this.findByUid(uid)
    return practicePresetPreset.delete()
  }
}
