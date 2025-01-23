import type { HttpContext } from '@adonisjs/core/http'
import {
  searchSessionValidator,
  storeSessionValidator,
  updateSessionValidator,
} from '#domains/practices/validators/session_validator'
import SessionService from '#domains/practices/services/session_service'
import { inject } from '@adonisjs/core'
import SessionPolicy from '#domains/practices/policies/session_policy'

@inject()
export default class SessionsController {
  constructor(private sessionService: SessionService) {}

  async index({ request, bouncer, params }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(searchSessionValidator)
    await bouncer.with(SessionPolicy).authorize('view', structureId)

    return this.sessionService.paginate(payload)
  }

  async store({ request, params, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(storeSessionValidator)
    await bouncer.with(SessionPolicy).authorize('create', structureId)

    return this.sessionService.store(payload)
  }

  async update({ params, request, bouncer }: HttpContext) {
    const { structureId } = params
    const payload = await request.validateUsing(updateSessionValidator)
    await bouncer.with(SessionPolicy).authorize('update', structureId)

    return this.sessionService.update({
      ...payload,
      uid: params.uid,
    })
  }

  async destroy({ params, bouncer }: HttpContext) {
    const { structureId } = params
    await bouncer.with(SessionPolicy).authorize('delete', structureId)

    return this.sessionService.delete(params.uid)
  }
}
