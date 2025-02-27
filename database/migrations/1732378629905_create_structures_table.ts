import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'structures'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('owner_id').references('id').inTable('users').notNullable()
      table.string('name').notNullable()
      table.string('description').nullable()
      table.string('siret').unique().nullable()
      table.boolean('is_deactivated').defaultTo(false).notNullable()
      table.string('logo').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
