import factory from '@adonisjs/lucid/factories'
import PracticeFiringSequence from '#models/practice_firing_sequence'
import Practice from '#models/practice'

export function PracticeFiringSequenceFactory(practice?: Practice) {
  return factory
    .define(PracticeFiringSequence, async ({ faker }) => {
      return PracticeFiringSequence.create({
        practiceId: practice?.id ?? undefined,
        results: faker.getMetadata(),
        annotation: faker.lorem.paragraph(2),
        total: faker.number.int({ min: 0, max: 300 }),
      })
    })
    .build()
}
