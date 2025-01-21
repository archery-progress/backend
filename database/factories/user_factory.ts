import factory from '@adonisjs/lucid/factories'
import User, { UserStatus } from '#models/user'

export function UserFactory(status?: UserStatus) {
  return factory
    .define(User, async ({ faker }) => {
      return User.create({
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        status: status ?? UserStatus.disabled,
        permissions: 0,
      })
    })
    .build()
}
