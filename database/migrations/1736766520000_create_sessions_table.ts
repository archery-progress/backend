import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sessions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('structure_id').references('id').inTable('structures').nullable()
      table.timestamp('target_datetime').notNullable()
      table.jsonb('order').notNullable()
      table.string('description').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
