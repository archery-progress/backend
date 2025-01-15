import factory from '@adonisjs/lucid/factories'
import Permission from '#models/permission'

export function PermissionFactory() {
  return factory
    .define(Permission, async ({ faker }) => {
      return Permission.create({
        uid: faker.string.uuid(),
        label: faker.word.verb(),
        description: faker.lorem.paragraph(1),
        forAdmin: faker.datatype.boolean(),
        deletable: faker.datatype.boolean(),
      })
    })
    .build()
}
