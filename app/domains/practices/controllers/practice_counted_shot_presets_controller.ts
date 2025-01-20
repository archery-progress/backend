import type { HttpContext } from '@adonisjs/core/http'
import {
  searchPracticeCountedShotPresetValidator,
  storePracticeCountedShotPresetValidator,
  updatePracticeCountedShotPresetValidator,
} from '#domains/practices/validators/practice_counted_shot_preset_validator'
import { inject } from '@adonisjs/core'
import PracticeCountedShotPresetService from '#domains/practices/services/practice_counted_shot_preset_service'

@inject()
export default class PracticeCountedShotPresetsController {
  constructor(private practiceCountedShotPresetService: PracticeCountedShotPresetService) {}

  async index({ request }: HttpContext) {
    const payload = await request.validateUsing(searchPracticeCountedShotPresetValidator)
    return this.practiceCountedShotPresetService.paginate(payload)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(storePracticeCountedShotPresetValidator)
    return this.practiceCountedShotPresetService.store(payload)
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updatePracticeCountedShotPresetValidator)
    return this.practiceCountedShotPresetService.update({
      ...payload,
      uid: params.uid,
    })
  }

  async destroy({ params }: HttpContext) {
    return await this.practiceCountedShotPresetService.delete(params.uid)
  }
}
