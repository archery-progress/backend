import vine from '@vinejs/vine'
import { searchComposable } from '#app/commons/validators/searchable'
import { Infer } from '@vinejs/vine/types'

export const searchPracticeMessageValidator = vine.compile(
  vine.object(searchComposable.getProperties())
)

export const storePracticeMessageValidator = vine.compile(
  vine.object({
    practiceId: vine.string().optional(),
    content: vine.string().minLength(2).maxLength(255),
    userId: vine.string(),
  })
)

export const updatePracticeMessageValidator = vine.compile(
  vine.object({
    practiceId: vine.string().optional(),
    content: vine.string().minLength(2).maxLength(255).optional(),
    userId: vine.string(),
  })
)

export type SearchPracticeMessageSchema = Infer<typeof searchPracticeMessageValidator>
export type StorePracticeMessageSchema = Infer<typeof storePracticeMessageValidator>
export type UpdatePracticeMessageSchema = Infer<typeof updatePracticeMessageValidator> & {
  uid: string
}
