import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'practices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('structure_id').references('id').inTable('structures').nullable()
      table.string('member_session_id').references('id').inTable('members').nullable()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('content').notNullable()
      table.jsonb('metadata').notNullable()
      table.string('status').notNullable()
      table.jsonb('results').notNullable()
      table.string('type').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
