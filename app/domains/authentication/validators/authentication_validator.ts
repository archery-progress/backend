import vine from '@vinejs/vine'

export const resetPasswordValidator = vine.compile(
  vine.object({
    password: vine.string().trim().minLength(3).confirmed(),
  })
)

export const forgotPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().maxLength(255),
  })
)
