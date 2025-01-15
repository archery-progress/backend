import factory from '@adonisjs/lucid/factories'
import Structure from '#models/structure'
import User from '#models/user'

export function StructureFactory(owner?: User) {
  return factory
    .define(Structure, async ({ faker }) => {
      return Structure.create({
        ownerId: owner?.id ?? undefined,
        name: faker.company.name(),
        siret: faker.string.numeric(14),
        isDeactivated: faker.datatype.boolean(),
        logo: faker.internet.url(),
        uid: faker.string.uuid(),
      })
    })
    .build()
}
