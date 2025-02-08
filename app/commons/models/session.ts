import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany, manyToMany, scope } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import PracticePreset from '#models/practice_preset'
import { type HasMany, type ManyToMany } from '@adonisjs/lucid/types/relations'
import MemberSession from '#models/member_session'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string | null

  @column()
  declare structureId: string

  @column.dateTime()
  declare targetDatetime: DateTime

  @column()
  declare order: Record<string, any>

  @column()
  declare description: string | null

  @beforeCreate()
  public static generateUuid(session: Session) {
    session.id = randomUUID()
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => PracticePreset)
  declare presets: ManyToMany<typeof PracticePreset>

  @hasMany(() => MemberSession)
  declare participants: HasMany<typeof MemberSession>

  static search = scope((query, search?: string) => {
    query.if(search, (builder) => {
      const columns = ['id', 'annotation']
      columns.forEach((field) => {
        builder.orWhere(field, 'like', `%${search}%`)
      })
    })
  })
}
