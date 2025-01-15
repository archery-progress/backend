import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'practice_counted_shot_presets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('content').notNullable()
      table.jsonb('metadata').notNullable()
      table.bigint('structure_id').unsigned().references('id').inTable('structures').nullable()
      table.jsonb('flags').notNullable()
      table.string('type').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
