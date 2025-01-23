import type { HttpContext } from '@adonisjs/core/http'
import {
  searchPracticeFiringSequenceValidator,
  storePracticeFiringSequenceValidator,
  updatePracticeFiringSequenceValidator,
} from '#domains/practices/validators/practice_firing_sequence_validator'
import { inject } from '@adonisjs/core'
import PracticeFiringSequenceService from '#domains/practices/services/practice_firing_sequence_service'
import PracticeFiringSequencePolicy from '#domains/practices/policies/practice_firing_sequence_policy'

@inject()
export default class PracticeFiringSequencesController {
  constructor(private practiceFiringSequenceService: PracticeFiringSequenceService) {}

  async index({ request, params, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(searchPracticeFiringSequenceValidator)
    await bouncer.with(PracticeFiringSequencePolicy).authorize('view', structureId)

    return this.practiceFiringSequenceService.paginate(payload)
  }

  async store({ request, params, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(storePracticeFiringSequenceValidator)
    await bouncer.with(PracticeFiringSequencePolicy).authorize('create', structureId)

    return this.practiceFiringSequenceService.store(payload)
  }

  async update({ params, request, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(updatePracticeFiringSequenceValidator)
    await bouncer.with(PracticeFiringSequencePolicy).authorize('update', structureId)

    return this.practiceFiringSequenceService.update({ ...payload, uid: params.uid })
  }

  async destroy({ params, bouncer }: HttpContext) {
    const { structureId } = params
    await bouncer.with(PracticeFiringSequencePolicy).authorize('delete', structureId)

    await this.practiceFiringSequenceService.delete(params.uid)
  }
}
