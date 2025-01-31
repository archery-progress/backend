import vine from '@vinejs/vine'
import { searchComposable } from '#app/commons/validators/searchable'
import { Infer } from '@vinejs/vine/types'

export const searchPracticePresetValidator = vine.compile(vine.object(searchComposable.getProperties()))

export const storePracticePresetValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(255),
    description: vine.string().minLength(2).maxLength(255),
    content: vine.string().minLength(2).maxLength(255),
    metadata: vine.any(),
    flags: vine.any(),
    type: vine.string().minLength(2).maxLength(255),
    structureId: vine.string().optional(),
  })
)

export const updatePracticePresetValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(255).optional(),
    description: vine.string().minLength(2).maxLength(255).optional(),
    content: vine.string().minLength(2).maxLength(255).optional(),
    metadata: vine.any().optional(),
    flags: vine.any().optional(),
    type: vine.string().minLength(2).maxLength(255).optional(),
    structureId: vine.string().optional(),
  })
)

export type SearchPracticePresetSchema = Infer<typeof searchPracticePresetValidator>
export type StorePracticePresetSchema = Infer<typeof storePracticePresetValidator>
export type UpdatePracticePresetSchema = Infer<typeof updatePracticePresetValidator> & { uid: string }
