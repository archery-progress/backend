import vine from '@vinejs/vine'
import { UserStatus } from '#models/user'
import { searchComposable } from '#app/commons/validators/searchable'
import { unique } from '#app/commons/validators/helpers/db'
import { Infer } from '@vinejs/vine/types'

export const userSearchValidator = vine.compile(
  vine.object({
    ...searchComposable.getProperties(),
    status: vine.enum(UserStatus).optional(),
  })
)

export const createUserValidator = vine.compile(
  vine.object({
    firstname: vine.string().trim().minLength(3),
    lastname: vine.string().trim().minLength(3),
    email: vine.string().email().unique(unique('users', 'email')),
    password: vine.string().trim().minLength(3).confirmed(),
    permissions: vine.number().optional(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    firstname: vine.string().trim().minLength(3).optional(),
    lastname: vine.string().trim().minLength(3).optional(),
    status: vine.enum(UserStatus).optional(),
    roles: vine.array(vine.number()).optional(),
    permissions: vine.number().optional(),
    avatar: vine
      .file({
        size: '8mb',
        extnames: ['jpg', 'jpeg', 'png'],
      })
      .optional(),
  })
)

export type UserSearchSchema = Infer<typeof userSearchValidator>
export type StoreUserSchema = Infer<typeof createUserValidator>
export type UpdateUserSchema = Infer<typeof updateUserValidator> & {
  id: string
}
