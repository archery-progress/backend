import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'practice_preset_session'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('practice_preset_id').references('id').inTable('practice_presets').notNullable()
      table.string('session_id').references('id').inTable('sessions').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
