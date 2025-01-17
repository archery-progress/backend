import type { HttpContext } from '@adonisjs/core/http'
import {
  createPracticeFiringSequenceValidator,
  searchPracticeFiringSequenceValidator,
  updatePracticeFiringSequenceValidator,
} from '#domains/practices/validators/practice_firing_sequence_validator'
import { inject } from '@adonisjs/core'
import PracticeFiringSequenceService from '#domains/practices/services/practice_firing_sequence_service'

@inject()
export default class PracticeFiringSequencesController {
  constructor(private practiceFiringSequenceService: PracticeFiringSequenceService) {}

  async index({ request }: HttpContext) {
    const payload = await request.validateUsing(searchPracticeFiringSequenceValidator)
    return this.practiceFiringSequenceService.paginate(payload)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createPracticeFiringSequenceValidator)
    return this.practiceFiringSequenceService.store(payload)
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updatePracticeFiringSequenceValidator)
    return this.practiceFiringSequenceService.update({ ...payload, uid: params.uid })
  }

  async destroy({ params }: HttpContext) {
    await this.practiceFiringSequenceService.delete(params.uid)
  }
}
