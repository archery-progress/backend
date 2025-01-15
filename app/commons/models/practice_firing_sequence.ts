import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PracticeFiringSequence extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare practiceId: number

  @column()
  declare results: Record<string, any>

  @column()
  declare annotation: string

  @column()
  declare total: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
