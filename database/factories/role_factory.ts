import factory from '@adonisjs/lucid/factories'
import Role from '#models/role'

export function RoleFactory() {
  return factory
    .define(Role, async ({ faker }) => {
      return Role.create({
        uid: faker.string.uuid(),
        name: faker.word.adjective(),
        description: faker.lorem.paragraph(1),
        forAdmin: faker.datatype.boolean(),
      })
    })
    .build()
}
