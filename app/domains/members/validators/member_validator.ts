import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const getMembersValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
  })
)

export const createMemberValidator = vine.compile(
  vine.object({
    userId: vine.string().trim().escape(),
    permissions: vine.number().optional(),
  })
)

export const updateMemberValidator = vine.compile(
  vine.object({
    permissions: vine.number().optional(),
  })
)

export type GetMembersSchema = Infer<typeof getMembersValidator> & {
  structureId: string
}

export type CreateMemberSchema = Infer<typeof createMemberValidator> & {
  structureId: string
}

export type UpdateMemberSchema = Infer<typeof updateMemberValidator> & {
  memberId: string
}

export type MemberRoleSchema = {
  structureId: string
  userId: string
  roleId: string
}
