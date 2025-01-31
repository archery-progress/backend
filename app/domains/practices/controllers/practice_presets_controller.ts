import type { HttpContext } from '@adonisjs/core/http'
import {
  searchPracticePresetValidator, storePracticePresetValidator, updatePracticePresetValidator,
} from '#domains/practices/validators/practice_preset_validator'
import { inject } from '@adonisjs/core'
import PracticePresetPolicy from '#domains/practices/policies/practice_counted_shot_preset_policy'
import PracticePresetService from '#domains/practices/services/practice_preset_service'

@inject()
export default class PracticePresetsController {
  constructor(private practicePresetService: PracticePresetService) {}

  async index({ request, params, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(searchPracticePresetValidator)
    await bouncer.with(PracticePresetPolicy).authorize('view', structureId)

    return this.practicePresetService.paginate(payload)
  }

  async store({ request, params, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(storePracticePresetValidator)
    await bouncer.with(PracticePresetPolicy).authorize('create', structureId)

    return this.practicePresetService.store(payload)
  }

  async update({ params, request, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(updatePracticePresetValidator)
    await bouncer.with(PracticePresetPolicy).authorize('update', structureId)

    return this.practicePresetService.update({
      ...payload,
      uid: params.uid,
    })
  }

  async destroy({ params, bouncer }: HttpContext) {
    const { structureId } = params
    await bouncer.with(PracticePresetPolicy).authorize('delete', structureId)

    return await this.practicePresetService.delete(params.uid)
  }
}
