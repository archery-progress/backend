import type { HttpContext } from '@adonisjs/core/http'
import {
  searchPracticeMessageValidator,
  storePracticeMessageValidator,
  updatePracticeMessageValidator,
} from '#domains/practices/validators/practice_message_validator'
import PracticeMessageService from '#domains/practices/services/practice_message_service'
import { inject } from '@adonisjs/core'
import PracticeMessagePolicy from '#domains/practices/policies/practice_message_policy'

@inject()
export default class PracticeMessagesController {
  constructor(private practiceMessageService: PracticeMessageService) {}

  async index({ request, params, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(searchPracticeMessageValidator)
    await bouncer.with(PracticeMessagePolicy).authorize('view', structureId)

    return this.practiceMessageService.paginate(payload)
  }

  async store({ request, params, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(storePracticeMessageValidator)
    await bouncer.with(PracticeMessagePolicy).authorize('create', structureId)

    return this.practiceMessageService.store(payload)
  }

  async update({ params, request, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(updatePracticeMessageValidator)
    await bouncer.with(PracticeMessagePolicy).authorize('update', structureId)

    return this.practiceMessageService.update({ ...payload, uid: params.uid })
  }

  async destroy({ params, bouncer }: HttpContext) {
    const { structureId } = params
    await bouncer.with(PracticeMessagePolicy).authorize('delete', structureId)
    await this.practiceMessageService.delete(params.uid)
  }
}
