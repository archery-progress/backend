import { BaseSchema } from '@adonisjs/lucid/schema'
import { UserStatus } from '#models/user'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('oidc_id').notNullable().unique()
      table.date('birthdate')
      table.string('avatar').nullable()
      table.integer('permissions').notNullable()
      table.enum('status', Object.keys(UserStatus)).notNullable().defaultTo('pending')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
