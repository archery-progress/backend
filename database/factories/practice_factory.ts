import factory from '@adonisjs/lucid/factories'
import Practice from '#models/practice'
import Session from '#models/session'
import User from '#models/user'
import Structure from '#models/structure'

export function PracticeFactory(structure?: Structure, user?: User, session?: Session) {
  return factory
    .define(Practice, async ({ faker }) => {
      return Practice.create({
        uid: faker.string.uuid(),
        structureId: structure?.id ?? undefined,
        userId: user?.id ?? undefined,
        name: faker.word.words(),
        description: faker.lorem.paragraph(2),
        content: faker.lorem.paragraph(4),
        metadata: faker.getMetadata(),
        status: faker.word.adverb(),
        results: faker.getMetadata(),
        sessionId: session?.id ?? undefined,
      })
    })
    .build()
}
