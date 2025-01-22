import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createRoleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    permissions: vine.number(),
  })
)

export const updateRoleValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    permissions: vine.number().optional(),
  })
)

export type CreateRoleSchema = Infer<typeof createRoleValidator> & {
  structureId: string
}

export type UpdateRoleSchema = Infer<typeof updateRoleValidator> & {
  roleId: string
}
