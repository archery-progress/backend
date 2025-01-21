import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, manyToMany, scope } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import Structure from '#models/structure'
import { Sharp } from 'sharp'
import { randomUUID } from 'node:crypto'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare type: UserType

  @column()
  declare status: UserStatus

  @column()
  declare avatar: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  declare currentAccessToken?: AccessToken

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @manyToMany(() => Role)
  declare roles: ManyToMany<typeof Role>

  @manyToMany(() => Structure)
  declare structures: ManyToMany<typeof Structure>

  @beforeCreate()
  public static assignUuid(user: User) {
    if (!user.id) {
      user.id = randomUUID()
    }
  }

  static search = scope((query, search?: string, type?: UserType, status?: UserStatus) => {
    query.if(search, (builder) => {
      const columns = ['firstname', 'lastname', 'email', 'id']
      columns.forEach((field) => {
        builder.orWhere(field, 'like', `%${search}%`)
      })
    })

    query.if(type, (builder) => builder.andWhere('type', type!))
    query.if(status !== undefined, (builder) => builder.andWhere('status', status!))
  })

  static transformAvatar(sharp: Sharp) {
    return sharp.resize(256, 256)
  }
}

export enum UserType {
  user,
  practitioner,
  staff,
}

export enum UserStatus {
  pending = 'pending',
  verified = 'verified',
  disabled = 'disabled',
}
