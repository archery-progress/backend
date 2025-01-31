import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, scope } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import MemberSession from '#models/member_session'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Practice extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare structureId: string | null

  @column()
  declare memberSessionId: string | null

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare content: string

  @column()
  declare metadata: Record<string, any>

  @column()
  declare status: string

  @column()
  declare results: Record<string, any>

  @column()
  declare type: string

  @beforeCreate()
  static generateUuid(practiceMessage: Practice) {
    practiceMessage.id = randomUUID()
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => MemberSession)
  declare member: BelongsTo<typeof MemberSession>

  static search = scope((query, search?: string) => {
    // If search is given, followed is executed
    query.if(search, (builder) => {
      // Columns returned by query
      const columns = ['id', 'name', 'description', 'content', 'status', 'type']
      // Does a verification on each column
      columns.forEach((field) => {
        builder.orWhere(field, 'like', `%${search}%`)
      })
    })
  })
}
