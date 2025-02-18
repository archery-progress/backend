import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import AuthenticationService from '#domains/authentication/services/authentication_service'
import env from '#start/env'

@inject()
export default class GoogleAuthenticationController {
  constructor(protected authenticationService: AuthenticationService) {}

  async redirect({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async callback({ ally, response }: HttpContext) {
    const google = ally.use('google')

    /**
     * User has denied access by canceling
     * the login flow
     */
    if (google.accessDenied()) {
      return 'You have cancelled the login process'
    }

    /**
     * OAuth state verification failed. This happens when the
     * CSRF cookie gets expired.
     */
    if (google.stateMisMatch()) {
      return 'We are unable to verify the request. Please try again'
    }

    /**
     * GitHub responded with some error
     */
    if (google.hasError()) {
      return google.getError()
    }

    const { id, avatarUrl, email, original } = await google.user()
    const { given_name: givenName, family_name: familyName } = original as {
      given_name: string
      family_name: string
    }

    const user = await this.authenticationService.loginUser(id, {
      avatarUrl,
      email,
      firstname: givenName,
      lastname: familyName,
    })

    const token = user.oat.value!.release()

    return response
      .redirect()
      .withQs({
        token,
      })
      .toPath(`${env.get('FRONTEND_URL')}/authentication/callback`)
  }
}
