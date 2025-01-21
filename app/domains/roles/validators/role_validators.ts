import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createRoleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    permissions: vine.number(),
  })
)

export type CreateRoleSchema = Infer<typeof createRoleValidator> & {
  structureId: string
}
