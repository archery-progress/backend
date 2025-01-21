import factory from '@adonisjs/lucid/factories'
import Session from '#models/session'
import User from '#models/user'
import Structure from '#models/structure'
import { DateTime } from 'luxon'

export function SessionFactory(user: User, structure: Structure) {
  return factory
    .define(Session, async ({ faker }) => {
      return Session.create({
        userId: user.id,
        structureId: structure?.id,
        target_datetime: DateTime.fromJSDate(faker.date.birthdate()),
        order: faker.getMetadata(),
        annotation: faker.lorem.paragraph(2),
      })
    })
    .build()
}
