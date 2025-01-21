import factory from '@adonisjs/lucid/factories'
import Role from '#models/role'

export function RoleFactory() {
  return factory
    .define(Role, async ({ faker }) => {
      return Role.create({
        name: faker.word.adjective(),
      })
    })
    .build()
}
