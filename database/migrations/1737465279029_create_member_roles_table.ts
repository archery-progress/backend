import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'member_role'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()

      table.string('member_id').references('id').inTable('members').onDelete('CASCADE')
      table.string('role_id').references('id').inTable('roles').onDelete('CASCADE')

      table.unique(['member_id', 'role_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
