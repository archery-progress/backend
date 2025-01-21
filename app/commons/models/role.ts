import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, manyToMany, scope } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import { roleSearchValidator } from '#domains/accounts/validators/roles_validator'
import { Infer } from '@vinejs/vine/types'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare permissions: number

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static generateUuid(role: Role) {
    role.id = randomUUID()
  }

  static search = scope((query, search: Infer<typeof roleSearchValidator>['search']) => {
    query.if(search, (builder) => {
      const columns = ['id', 'name']
      columns.forEach((field) => {
        builder.orWhere(field, 'like', `%${search}%`)
      })
    })
  })
}
