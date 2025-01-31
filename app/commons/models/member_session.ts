import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Member from '#models/member'
import Session from '#models/session'

export default class MemberSession extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare memberId: string

  @column()
  declare sessionId: string

  @column()
  declare details: string | null

  @column()
  declare status: 'pending' | 'accepted' | 'rejected'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Member)
  declare member: BelongsTo<typeof Member>

  @belongsTo(() => Session)
  declare session: BelongsTo<typeof Session>

  @beforeCreate()
  static generateUuid(session: MemberSession) {
    session.id = randomUUID()
  }
}
