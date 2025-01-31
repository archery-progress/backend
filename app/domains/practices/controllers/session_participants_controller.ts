import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import SessionParticipantService from '#domains/practices/services/session_participant_service'
import PracticePresetPolicy from '#domains/practices/policies/practice_counted_shot_preset_policy'

@inject()
export default class SessionParticipantsController {
  constructor(private participantService: SessionParticipantService) {}

  async add({ bouncer, params }: HttpContext) {
    await bouncer.with(PracticePresetPolicy).authorize('create', params.structureId)
    return this.participantService.store(params.sessionId, params.memberId)
  }

  async remove({ bouncer, params }: HttpContext) {
    await bouncer.with(PracticePresetPolicy).authorize('delete', params.structureId)
    return this.participantService.delete(params.sessionId, params.memberId)
  }
}
