import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column, scope} from '@adonisjs/lucid/orm'
import StringHelper from "@adonisjs/core/helpers/string";

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

  @beforeCreate()
  public static assignUuid(practice: Practice) {
    if (!practice.uid) {
      practice.uid = StringHelper.generateRandom(10)
    }
  }

  static search = scope((query, search?: string) => {
    // If search is given, followed is executed
    query.if(search, (builder) => {
      // Columns returned by query
      const columns = ['uid', 'name', 'description', 'content', 'status', 'type']
      // Does a verification on each column
      columns.forEach((field) => {
        builder.orWhere(field, 'like', `%${search}%`)
      })
    })
  })
}
