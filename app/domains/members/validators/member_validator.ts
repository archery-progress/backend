import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const getMembersValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
  })
)

export type GetMembersSchema = Infer<typeof getMembersValidator> & {
  structureId: string
}
