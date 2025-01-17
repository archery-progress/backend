import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, scope} from '@adonisjs/lucid/orm'
import StringHelper from "@adonisjs/core/helpers/string";

export default class PracticeMessage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uid: string

  @column()
  declare practiceId: number

  @column()
  declare content: string

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(practiceMessage: PracticeMessage) {
    if (!practiceMessage.uid) {
      practiceMessage.uid = StringHelper.generateRandom(10)
    }
  }

  static search = scope((query, search?: string) => {
    query.if(search, (builder) => {
      const columns = ['content']
      columns.forEach((field) => {
        builder.orWhere(field, 'like', `%${search}%`)
      })
    })
  })
}
