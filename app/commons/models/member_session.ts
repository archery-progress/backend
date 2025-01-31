import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Member from '#models/member'
import Session from '#models/session'
import Practice from '#models/practice'

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

  @hasMany(() => Practice)
  declare practices: HasMany<typeof Practice>

  @beforeCreate()
  static generateUuid(session: MemberSession) {
    session.id = randomUUID()
  }
}
