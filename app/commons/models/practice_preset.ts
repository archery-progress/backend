import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, scope } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class PracticePreset extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare content: string

  @column()
  declare metadata: Record<string, any>

  @column()
  declare structureId: string

  @column()
  declare flags: Record<string, any>

  @column()
  declare type: string

  @beforeCreate()
  static generateUuid(practiceMessage: PracticeCountedShotPreset) {
    practiceMessage.id = randomUUID()
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static search = scope((query, search?: string) => {
    query.if(search, (builder) => {
      const columns = ['name', 'description', 'content', 'metadata', 'flags']
      columns.forEach((field) => {
        builder.orWhere(field, 'like', `%${search}%`)
      })
    })
  })
}
