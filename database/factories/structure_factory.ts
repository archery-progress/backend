import factory from '@adonisjs/lucid/factories'
import Structure from '#models/structure'
import User from '#models/user'
import { UserFactory } from '#database/factories/user_factory'

export function StructureFactory(owner?: User) {
  return factory
    .define(Structure, async ({ faker }) => {
      return Structure.create({
        ownerId: owner?.id ?? (await UserFactory().make()).id,
        name: faker.company.name(),
        siret: faker.string.numeric(14),
        isDeactivated: faker.datatype.boolean(),
        //logo: faker.internet.url(),
      })
    })
    .build()
}
