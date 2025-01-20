import type { HttpContext } from '@adonisjs/core/http'
import {
  searchPracticeValidator,
  storePracticeValidator,
  updatePracticeValidator,
} from '#domains/practices/validators/practice_validator'
import PracticeService from '#domains/practices/services/practice_service'
import { inject } from '@adonisjs/core'

@inject()
export default class PracticesController {
  constructor(private practiceService: PracticeService) {}

  async index({ request }: HttpContext) {
    const payload = await request.validateUsing(searchPracticeValidator)
    return this.practiceService.paginate(payload)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(storePracticeValidator)
    return this.practiceService.store(payload)
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updatePracticeValidator)
    return this.practiceService.update({ ...payload, uid: params.uid })
  }

  async destroy({ params }: HttpContext) {
    await this.practiceService.delete(params.uid)
  }
}
