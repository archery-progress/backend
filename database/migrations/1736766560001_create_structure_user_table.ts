import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'structure_user'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('structure_id').references('id').inTable('structures').notNullable()
      table.string('user_id').references('id').inTable('users').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
