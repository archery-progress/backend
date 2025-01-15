import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'structure_user'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.bigint('structure_id').unsigned().references('id').inTable('structures').notNullable()
      table.bigint('user_id').unsigned().references('id').inTable('users').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
