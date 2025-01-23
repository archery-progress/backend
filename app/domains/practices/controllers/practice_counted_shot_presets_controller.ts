import type { HttpContext } from '@adonisjs/core/http'
import {
  searchPracticeCountedShotPresetValidator,
  storePracticeCountedShotPresetValidator,
  updatePracticeCountedShotPresetValidator,
} from '#domains/practices/validators/practice_counted_shot_preset_validator'
import { inject } from '@adonisjs/core'
import PracticeCountedShotPresetService from '#domains/practices/services/practice_counted_shot_preset_service'
import PracticeCountedShotPresetPolicy from '#domains/practices/policies/practice_counted_shot_preset_policy'

@inject()
export default class PracticeCountedShotPresetsController {
  constructor(private practiceCountedShotPresetService: PracticeCountedShotPresetService) {}

  async index({ request, params, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(searchPracticeCountedShotPresetValidator)
    await bouncer.with(PracticeCountedShotPresetPolicy).authorize('view', structureId)

    return this.practiceCountedShotPresetService.paginate(payload)
  }

  async store({ request, params, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(storePracticeCountedShotPresetValidator)
    await bouncer.with(PracticeCountedShotPresetPolicy).authorize('create', structureId)

    return this.practiceCountedShotPresetService.store(payload)
  }

  async update({ params, request, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(updatePracticeCountedShotPresetValidator)
    await bouncer.with(PracticeCountedShotPresetPolicy).authorize('update', structureId)

    return this.practiceCountedShotPresetService.update({
      ...payload,
      uid: params.uid,
    })
  }

  async destroy({ params, bouncer }: HttpContext) {
    const { structureId } = params
    await bouncer.with(PracticeCountedShotPresetPolicy).authorize('delete', structureId)

    return await this.practiceCountedShotPresetService.delete(params.uid)
  }
}
