import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createStructureValidator = vine.compile(
  vine.object({
    name: vine.string().trim().escape(),
    description: vine.string().trim().escape().optional(),
  })
)

export type CreateStructureSchema = Infer<typeof createStructureValidator>
