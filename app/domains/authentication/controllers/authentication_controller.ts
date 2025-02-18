import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthenticationController {
  async me({ auth }: HttpContext) {
    await auth.user?.load('members', (query) => {
      query.preload('structure')
      query.preload('roles')
    })
    return auth.user
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user as unknown as User, user.currentAccessToken.identifier)
  }
}
