import type { HttpContext } from '@adonisjs/core/http'
import {
  searchPracticeMessageValidator,
  storePracticeMessageValidator,
  updatePracticeMessageValidator,
} from '#domains/practices/validators/practice_message_validator'
import PracticeMessageService from '#domains/practices/services/practice_message_service'
import { inject } from '@adonisjs/core'

@inject()
export default class PracticeMessagesController {
  constructor(private practiceMessageService: PracticeMessageService) {}

  async index({ request }: HttpContext) {
    const payload = await request.validateUsing(searchPracticeMessageValidator)
    return this.practiceMessageService.paginate(payload)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(storePracticeMessageValidator)
    return this.practiceMessageService.store(payload)
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updatePracticeMessageValidator)
    return this.practiceMessageService.update({ ...payload, uid: params.uid })
  }

  async destroy({ params }: HttpContext) {
    await this.practiceMessageService.delete(params.uid)
  }
}
