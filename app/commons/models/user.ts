import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import {
  afterFind,
  BaseModel,
  beforeCreate,
  column,
  hasMany,
  manyToMany,
  scope,
} from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import Structure from '#models/structure'
import { Sharp } from 'sharp'
import { randomUUID } from 'node:crypto'
import drive from '@adonisjs/drive/services/main'
import Member from '#models/member'

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
  declare permissions: number

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

  @afterFind()
  static async resolveSignedUrl(user: User) {
    if (user.avatar) {
      user.avatar = await drive.use().getSignedUrl(user.avatar)
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
