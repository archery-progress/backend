import MemberSession from '#models/member_session'
import { inject } from '@adonisjs/core'
import SessionService from '#domains/practices/services/session_service'
import Practice from '#models/practice'
import db from '@adonisjs/lucid/services/db'
import PracticeMessage from '#models/practice_message'

@inject()
export default class SessionParticipantService {
  constructor(private sessionService: SessionService) {}

  async store(sessionId: string, memberId: string) {
    const session = await this.sessionService.findById(sessionId)
    const participant = await MemberSession.create({
      memberId,
      sessionId,
      status: 'pending',
    })

    await participant.related('practices').createMany(
      session.presets.map((preset): Partial<Practice> => {
        return {
          structureId: session.structureId,
          name: preset.name,
          description: preset.description,
          content: preset.content,
          type: preset.type,
          metadata: preset.metadata,
        }
      })
    )
  }

  async delete(sessionId: string, memberId: string) {
    const participant = await MemberSession.query()
      .where('session_id', sessionId)
      .where('member_id', memberId)
      .where('status', 'pending')
      .first()

    if (participant) {
      return db.transaction(async (trx) => {
        await participant.useTransaction(trx).delete()
        await Practice.query().where('member_session_id', participant.id).del()
        await PracticeMessage.query().where('member_session_id', participant.id).del()
      })
    }
  }
}
