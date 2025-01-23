import type { HttpContext } from '@adonisjs/core/http'
import {
  searchPracticeValidator,
  storePracticeValidator,
  updatePracticeValidator,
} from '#domains/practices/validators/practice_validator'
import PracticeService from '#domains/practices/services/practice_service'
import { inject } from '@adonisjs/core'
import PracticePolicy from '#domains/practices/policies/practice_policy'

@inject()
export default class PracticesController {
  constructor(private practiceService: PracticeService) {}

  async index({ request, params, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(searchPracticeValidator)
    await bouncer.with(PracticePolicy).authorize('view', structureId)

    return this.practiceService.paginate(payload)
  }

  async store({ request, params, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(storePracticeValidator)
    await bouncer.with(PracticePolicy).authorize('create', structureId)

    return this.practiceService.store(payload)
  }

  async update({ params, request, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(updatePracticeValidator)
    await bouncer.with(PracticePolicy).authorize('update', structureId)

    return this.practiceService.update({ ...payload, uid: params.uid })
  }

  async destroy({ params, bouncer }: HttpContext) {
    const { structureId } = params
    await bouncer.with(PracticePolicy).authorize('delete', structureId)

    await this.practiceService.delete(params.uid)
  }
}
