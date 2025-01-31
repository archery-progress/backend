import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, scope } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare structureId: string

  @column.dateTime()
  declare targetDatetime: DateTime

  @column()
  declare order: Record<string, any>

  @column()
  declare description: string

  @beforeCreate()
  public static generateUuid(session: Session) {
    session.id = randomUUID()
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static search = scope((query, search?: string) => {
    query.if(search, (builder) => {
      const columns = ['id', 'annotation']
      columns.forEach((field) => {
        builder.orWhere(field, 'like', `%${search}%`)
      })
    })
  })
}
