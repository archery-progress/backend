import { DateTime } from 'luxon'
import {
  afterFind,
  BaseModel,
  beforeCreate,
  belongsTo,
  column,
  manyToMany,
  scope,
} from '@adonisjs/lucid/orm'
import drive from '@adonisjs/drive/services/main'
import { Sharp } from 'sharp'
import User from '#models/user'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class Structure extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare ownerId: string

  @column()
  declare siret: string

  @column()
  declare isDeactivated: boolean

  @column()
  declare logo: string | undefined

  @belongsTo(() => User)
  declare owner: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @afterFind()
  static async resolveSignedUrls(structure: Structure) {
    if (structure.logo) {
      structure.logo = await drive.use().getSignedUrl(structure.logo)
    }
  }

  @beforeCreate()
  public static generateUuid(structure: Structure) {
    if (!structure.id) {
      structure.id = randomUUID()
    }
  }

  @manyToMany(() => User)
  declare members: ManyToMany<typeof User>

  static search = scope((query, search?: string) => {
    query.if(search, (builder) => {
      const columns = ['name', 'siret', 'is_deactivated', 'id']
      columns.forEach((field) => {
        builder.orWhere(field, 'like', `%${search}%`)
      })
    })
  })

  static transformLogo(sharp: Sharp) {
    return sharp.resize(256, 256)
  }
}
