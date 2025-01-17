import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, scope } from '@adonisjs/lucid/orm'
import StringHelper from '@adonisjs/core/helpers/string'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uid: string

  @column()
  declare userId: number | null

  @column()
  declare structureId: number | null

  @column.dateTime()
  declare targetDatetime: DateTime

  @column()
  declare order: Record<string, any>

  @column()
  declare annotation: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(session: Session) {
    if (!session.uid) {
      session.uid = StringHelper.generateRandom(10)
    }
  }

  static search = scope((query, search?: string) => {
    query.if(search, (builder) => {
      const columns = ['uid', 'targetDatetime', 'order', 'annotation']
      columns.forEach((field) => {
        builder.orWhere(field, 'like', `%${search}%`)
      })
    })
  })
}
