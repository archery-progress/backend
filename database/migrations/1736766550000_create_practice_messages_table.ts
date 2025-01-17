import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'practice_messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('uid').notNullable().unique()
      table.bigint('practice_id').unsigned().references('id').inTable('practices').notNullable()
      table.string('content').notNullable()
      table.bigint('user_id').unsigned().references('id').inTable('users').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
