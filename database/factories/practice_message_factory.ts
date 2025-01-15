import factory from '@adonisjs/lucid/factories'
import PracticeMessage from '#models/practice_message'
import Practice from '#models/practice'
import User from '#models/user'

export function PracticeMessageFactory(practice?: Practice, user?: User) {
  return factory
    .define(PracticeMessage, async ({ faker }) => {
      return PracticeMessage.create({
        practiceId: practice?.id ?? undefined,
        content: faker.lorem.paragraph(2),
        userId: user?.id ?? undefined,
      })
    })
    .build()
}
