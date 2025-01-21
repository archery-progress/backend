import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_user'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.string('role_id').references('id').inTable('roles')
      table.string('user_id').references('id').inTable('users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
