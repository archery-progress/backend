import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare structureId: string

  @column.dateTime()
  declare target_datetime: DateTime

  @column()
  declare order: Record<string, any>

  @column()
  declare annotation: string

  @beforeCreate()
  public static generateUuid(session: Session) {
    session.id = randomUUID()
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
