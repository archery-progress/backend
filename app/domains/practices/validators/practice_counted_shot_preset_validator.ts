import vine from '@vinejs/vine'
import { searchComposable } from '#app/commons/validators/searchable'
import { Infer } from '@vinejs/vine/types'

export const searchPracticeCountedShotPresetValidator = vine.compile(
  vine.object(searchComposable.getProperties())
)

export const storePracticeCountedShotPresetValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(255),
    description: vine.string().minLength(2).maxLength(255),
    content: vine.string().minLength(2).maxLength(255),
    metadata: vine.any(),
    flags: vine.any(),
    type: vine.string().minLength(2).maxLength(255),
    structureId: vine.number().optional(),
  })
)

export const updatePracticeCountedShotPresetValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(255).optional(),
    description: vine.string().minLength(2).maxLength(255).optional(),
    content: vine.string().minLength(2).maxLength(255).optional(),
    metadata: vine.any().optional(),
    flags: vine.any().optional(),
    type: vine.string().minLength(2).maxLength(255).optional(),
    structureId: vine.number().optional(),
  })
)

export type SearchPracticeCountedShotPresetSchema = Infer<
  typeof searchPracticeCountedShotPresetValidator
>
export type StorePracticeCountedShotPresetSchema = Infer<
  typeof storePracticeCountedShotPresetValidator
>
export type UpdatePracticeCountedShotPresetSchema = Infer<
  typeof updatePracticeCountedShotPresetValidator
> & { uid: string }
