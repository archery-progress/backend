import vine from '@vinejs/vine'
import { searchComposable } from '#app/commons/validators/searchable'
import { Infer } from '@vinejs/vine/types'

export const searchPracticeFiringSequenceValidator = vine.compile(
  vine.object(searchComposable.getProperties())
)

export const storePracticeFiringSequenceValidator = vine.compile(
  vine.object({
    practiceId: vine.number().optional(),
    results: vine.any(),
    annotation: vine.string().minLength(2).maxLength(255),
    total: vine.number().min(0),
  })
)

export const updatePracticeFiringSequenceValidator = vine.compile(
  vine.object({
    practiceId: vine.number().optional(),
    results: vine.any().optional(),
    annotation: vine.string().minLength(2).maxLength(255).optional(),
    total: vine.number().min(0).optional(),
  })
)

export type SearchPracticeFiringSequenceSchema = Infer<typeof searchPracticeFiringSequenceValidator>
export type StorePracticeFiringSequenceSchema = Infer<typeof storePracticeFiringSequenceValidator>
export type UpdatePracticeFiringSequenceSchema = Infer<
  typeof updatePracticeFiringSequenceValidator
> & { uid: string }
