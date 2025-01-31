import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'member_sessions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.text('details').nullable()
      table.string('status').defaultTo('pending').notNullable()
      table.string('member_id').references('id').inTable('members').notNullable()
      table.string('session_id').references('id').inTable('sessions').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
