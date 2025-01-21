import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class PracticeFiringSequence extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare practiceId: string

  @column()
  declare results: Record<string, any>

  @column()
  declare annotation: string

  @column()
  declare total: number

  @beforeCreate()
  static generateUuid(practiceMessage: PracticeFiringSequence) {
    practiceMessage.id = randomUUID()
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
