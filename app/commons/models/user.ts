import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany, scope } from '@adonisjs/lucid/orm'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Structure from '#models/structure'
import { Sharp } from 'sharp'
import { randomUUID } from 'node:crypto'
import Member from '#models/member'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare email: string

  @column()
  declare oidcId: string

  @column()
  declare permissions: number

  @column()
  declare status: UserStatus

  @column.date()
  declare birthdate: DateTime

  @column()
  declare avatar: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  declare currentAccessToken?: AccessToken

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @hasMany(() => Structure, {
    foreignKey: 'ownerId',
  })
  declare structures: HasMany<typeof Structure>

  @hasMany(() => Member)
  declare members: HasMany<typeof Member>

  @beforeCreate()
  public static assignUuid(user: User) {
    if (!user.id) {
      user.id = randomUUID()
    }
  }

  static search = scope((query, search?: string, status?: UserStatus) => {
    query
      .if(search, (builder) => {
        const columns = ['firstname', 'lastname', 'email', 'id']
        columns.forEach((field) => {
          builder.orWhere(field, 'like', `%${search}%`)
        })
      })
      .if(status !== undefined, (builder) => builder.andWhere('status', status!))
  })

  static transformAvatar(sharp: Sharp) {
    return sharp.resize(256, 256)
  }
}

export enum UserStatus {
  pending = 'pending',
  verified = 'verified',
  disabled = 'disabled',
}
