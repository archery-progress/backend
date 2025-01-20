import vine from '@vinejs/vine'
import { searchComposable } from '#app/commons/validators/searchable'
import { Infer } from '@vinejs/vine/types'
import { DateTime } from 'luxon'

export const searchSessionValidator = vine.compile(vine.object(searchComposable.getProperties()))

export const storeSessionValidator = vine.compile(
  vine.object({
    uid: vine.string().minLength(2).optional(),
    targetDatetime: vine.string().transform((date) => DateTime.fromISO(date)),
    order: vine.any(),
    annotation: vine.string().minLength(2).maxLength(255),
  })
)

export const updateSessionValidator = vine.compile(
  vine.object({
    uid: vine.string().minLength(2).optional(),
    targetDatetime: vine
      .string()
      .transform((date) => DateTime.fromISO(date))
      .optional(),
    order: vine.any().optional(),
    annotation: vine.string().minLength(2).maxLength(255).optional(),
  })
)

export type SearchSessionSchema = Infer<typeof searchSessionValidator>
export type StoreSessionSchema = Infer<typeof storeSessionValidator>
export type UpdateSessionSchema = Infer<typeof updateSessionValidator> & {
  uid: string
}
