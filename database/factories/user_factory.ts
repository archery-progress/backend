import factory from '@adonisjs/lucid/factories'
import User, { UserStatus, UserType } from '#models/user'

export function UserFactory(type?: UserType, status?: UserStatus) {
  return factory
    .define(User, async ({ faker }) => {
      return User.create({
        uid: faker.string.uuid(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        type: type ?? UserType.user,
        status: status ?? UserStatus.disabled,
      })
    })
    .build()
}
