import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

import {
  SearchPracticeCountedShotPresetSchema,
  CreatePracticeCountedShotPresetSchema,
  UpdatePracticeCountedShotPresetSchema,
} from '#domains/practices/validators/practice_counted_shot_preset_validator'
import PracticeCountedShotPreset from '#models/practice_counted_shot_preset'

export default class PracticeCountedShotPresetService {
  async paginate(
    payload: SearchPracticeCountedShotPresetSchema
  ): Promise<ModelPaginatorContract<PracticeCountedShotPreset>> {
    return PracticeCountedShotPreset.query()
      .withScopes((scopes) => scopes.search(payload.search))
      .paginate(payload.page ?? 1, payload.limit ?? 20)
  }

  async findByUid(uid: string) {
    return PracticeCountedShotPreset.findByOrFail('uid', uid)
  }

  async store(payload: CreatePracticeCountedShotPresetSchema) {
    return PracticeCountedShotPreset.create(payload)
  }

  async update(payload: UpdatePracticeCountedShotPresetSchema) {
    const practiceCountedShotPreset = await this.findByUid(payload.uid)
    return practiceCountedShotPreset.merge(payload).save()
  }

  async delete(uid: string) {
    const practiceCountedShotPreset = await this.findByUid(uid)
    return practiceCountedShotPreset.delete()
  }
}
