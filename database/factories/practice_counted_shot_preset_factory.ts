import factory from '@adonisjs/lucid/factories'
import PracticeCountedShotPreset from '#models/practice_counted_shot_preset'
import Structure from '#models/structure'

export function PracticeCountedShotPresetFactory(structure?: Structure) {
  return factory
    .define(PracticeCountedShotPreset, async ({ faker }) => {
      return PracticeCountedShotPreset.create({
        name: faker.lorem.word(),
        description: faker.lorem.paragraph(2),
        content: faker.lorem.paragraph(1),
        metadata: faker.getMetadata(),
        structureId: structure?.id ?? undefined,
        flags: faker.getMetadata(),
        type: faker.string.alpha(10),
      })
    })
    .build()
}
