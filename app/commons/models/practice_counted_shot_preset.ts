import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, scope } from '@adonisjs/lucid/orm'
import StringHelper from '@adonisjs/core/helpers/string'

export default class PracticeCountedShotPreset extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uid: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare content: string

  @column()
  declare metadata: Record<string, any>

  @column()
  declare structureId: number

  @column()
  declare flags: Record<string, any>

  @column()
  declare type: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(practiceCountedShotPreset: PracticeCountedShotPreset) {
    if (!practiceCountedShotPreset.uid) {
      practiceCountedShotPreset.uid = StringHelper.generateRandom(10)
    }
  }

  static search = scope((query, search?: string) => {
    query.if(search, (builder) => {
      const columns = ['name', 'description', 'content', 'metadata', 'flags']
      columns.forEach((field) => {
        builder.orWhere(field, 'like', `%${search}%`)
      })
    })
  })
}
