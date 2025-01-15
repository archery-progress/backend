import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'practice_firing_sequences'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.bigint('practice_id').unsigned().references('id').inTable('practices').notNullable()
      table.jsonb('results').notNullable()
      table.string('annotation').nullable()
      table.bigint('total').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
