import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, scope } from '@adonisjs/lucid/orm'
import StringHelper from '@adonisjs/core/helpers/string'

export default class PracticeFiringSequence extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uid: string

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

  @beforeCreate()
  public static assignUuid(practiceFiringSequence: PracticeFiringSequence) {
    if (!practiceFiringSequence.uid) {
      practiceFiringSequence.uid = StringHelper.generateRandom(10)
    }
  }

  static search = scope((query, search?: string) => {
    query.if(search, (builder) => {
      const columns = ['results', 'annotation', 'total']
      columns.forEach((field) => {
        builder.orWhere(field, 'like', `%${search}%`)
      })
    })
  })
}
