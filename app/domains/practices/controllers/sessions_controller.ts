import type { HttpContext } from '@adonisjs/core/http'
import {
  searchSessionValidator,
  storeSessionValidator,
  updateSessionValidator,
} from '#domains/practices/validators/session_validator'
import SessionService from '#domains/practices/services/session_service'
import { inject } from '@adonisjs/core'

@inject()
export default class SessionsController {
  constructor(private sessionService: SessionService) {}

  async index({ request }: HttpContext) {
    const payload = await request.validateUsing(searchSessionValidator)
    return this.sessionService.paginate(payload)
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(storeSessionValidator)
    return this.sessionService.store(payload)
  }

  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updateSessionValidator)
    return this.sessionService.update({
      ...payload,
      uid: params.uid,
    })
  }

  async destroy({ params }: HttpContext) {
    return this.sessionService.delete(params.uid)
  }
}
