import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, scope } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class PracticeMessage extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare practiceId: string

  @column()
  declare content: string

  @column()
  declare userId: string

  @beforeCreate()
  static generateUuid(practiceMessage: PracticeMessage) {
    practiceMessage.id = randomUUID()
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static search = scope((query, search?: string) => {
    query.if(search, (builder) => {
      const columns = ['content']
      columns.forEach((field) => {
        builder.orWhere(field, 'like', `%${search}%`)
      })
    })
  })
}
