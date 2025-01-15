import { DateTime } from 'luxon'
import { afterFind, BaseModel, beforeCreate, column, manyToMany, scope } from '@adonisjs/lucid/orm'
import StringHelper from '@adonisjs/core/helpers/string'
import drive from '@adonisjs/drive/services/main'
import { Sharp } from 'sharp'
import User from '#models/user'
import { type ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Structure extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare ownerId: number | null

  @column()
  declare siret: string

  @column()
  declare isDeactivated: boolean

  @column()
  declare logo: string | undefined

  @column()
  declare uid: string

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
  public static assignUuid(structure: Structure) {
    if (!structure.uid) {
      structure.uid = StringHelper.generateRandom(10)
    }
  }

  @manyToMany(() => User)
  declare members: ManyToMany<typeof User>

  static search = scope((query, search?: string) => {
    query.if(search, (builder) => {
      const columns = ['name', 'siret', 'is_deactivated', 'uid']
      columns.forEach((field) => {
        builder.orWhere(field, 'like', `%${search}%`)
      })
    })
  })

  static transformLogo(sharp: Sharp) {
    return sharp.resize(256, 256)
  }
}
