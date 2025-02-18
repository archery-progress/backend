import factory from '@adonisjs/lucid/factories'
import User, { UserStatus } from '#models/user'

export function UserFactory(status?: UserStatus) {
  return factory
    .define(User, async ({ faker }) => {
      return User.create({
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        oidcId: faker.git.commitSha({ length: 15 }),
        email: faker.internet.email(),
        status: status ?? UserStatus.verified,
        permissions: 0,
      })
    })
    .build()
}
