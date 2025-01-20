import vine from '@vinejs/vine'
import { searchComposable } from '#app/commons/validators/searchable'
import { Infer } from '@vinejs/vine/types'

export const searchPracticeValidator = vine.compile(vine.object(searchComposable.getProperties()))

export const storePracticeValidator = vine.compile(
  vine.object({
    userId: vine.number().optional(),
    structureId: vine.number().optional(),
    sessionId: vine.number().optional(),
    name: vine.string().minLength(2).maxLength(255),
    description: vine.string().minLength(2).maxLength(255),
    content: vine.string().minLength(2).maxLength(255),
    metadata: vine.any(),
    status: vine.string().minLength(2).maxLength(255),
    results: vine.any(),
    type: vine.string().minLength(2).maxLength(255),
  })
)

export const updatePracticeValidator = vine.compile(
  vine.object({
    userId: vine.number().optional(),
    structureId: vine.number().optional(),
    sessionId: vine.number().optional(),
    name: vine.string().minLength(2).maxLength(255).optional(),
    description: vine.string().minLength(2).maxLength(255).optional(),
    content: vine.string().minLength(2).maxLength(255).optional(),
    metadata: vine.any().optional(),
    status: vine.string().minLength(2).maxLength(255).optional(),
    results: vine.any().optional(),
    type: vine.string().minLength(2).maxLength(255).optional(),
  })
)

export type SearchPracticeSchema = Infer<typeof searchPracticeValidator>
export type StorePracticeSchema = Infer<typeof storePracticeValidator>
export type UpdatePracticeSchema = Infer<typeof updatePracticeValidator> & {
  uid: string
}
