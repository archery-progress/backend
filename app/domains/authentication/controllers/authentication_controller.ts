import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import env from '#start/env'
import router from '@adonisjs/core/services/router'
import mail from '@adonisjs/mail/services/main'
import {
  forgotPasswordValidator,
  resetPasswordValidator,
} from '#domains/authentication/validators/authentication_validator'

export default class AuthenticationController {
  async me({ auth }: HttpContext) {
    await auth.user?.load('roles')
    return auth.user
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    const oat = await User.accessTokens.create(user)

    response.cookie(env.get('AUTH_COOKIE'), oat.value!.release(), {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    })

    return {
      token: oat.value?.release(),
      user,
    }
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user as unknown as User, user.currentAccessToken.identifier)
  }

  async forgotPasswordAction({ request, response }: HttpContext) {
    const data = await request.validateUsing(forgotPasswordValidator)
    const user = await User.findBy('email', data.email)

    if (user) {
      const signedUrl = router
        .builder()
        .prefixUrl(env.get('APP_BASE_URL'))
        .params({ id: user.id })
        .makeSigned('resetPassword', {
          expiresIn: '1 hour',
        })

      await mail.send((message) => {
        message
          .to(data.email)
          .from(env.get('SMTP_EMAIL'))
          .subject('Testing email from Adonis')
          .text(signedUrl)
      })
      return response.redirect().toRoute('home')
    }
  }

  async resetPassword({ request, response }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest('Invalid or expired URL')
    }
    // const user = await User.findBy('uid', params.uid)
    // TODO re-implement reset password
  }

  async resetPasswordAction({ request, params }: HttpContext) {
    const data = await request.validateUsing(resetPasswordValidator)
    const user = await User.findByOrFail('uid', params.uid)

    await user.merge(data).save()
  }
}
