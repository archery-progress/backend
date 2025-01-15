import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Practice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uid: string

  @column()
  declare structureId: number

  @column()
  declare userId: number

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
  declare sessionId: number

  @column()
  declare type: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
