import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'practices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('uid').notNullable()
      table.bigint('structure_id').unsigned().references('id').inTable('structures').notNullable()
      table.bigint('user_id').unsigned().references('id').inTable('users').notNullable()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('content').notNullable()
      table.jsonb('metadata').notNullable()
      table.string('status').notNullable()
      table.jsonb('results').notNullable()
      table.bigint('session_id').unsigned().references('id').inTable('sessions').notNullable()
      table.string('type').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
