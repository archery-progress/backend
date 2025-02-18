import User from '#app/commons/models/user'

export type LoginUserBody = {
  avatarUrl: string
  firstname: string
  lastname: string
  email: string
}
export type CreateUserBody = LoginUserBody & {
  oidcId: string
}

export default class AuthenticationService {
  async loginUser(id: string, { avatarUrl, firstname, lastname, email }: LoginUserBody) {
    const user = await User.query().where('oidc_id', id).first()

    if (!user) {
      const newUser = await this.createUser({
        avatarUrl,
        firstname,
        lastname,
        email,
        oidcId: id,
      })

      const oat = await User.accessTokens.create(newUser)
      return { user: newUser, oat }
    }

    const oat = await User.accessTokens.create(user)
    return { user, oat }
  }

  async createUser({ avatarUrl, firstname, lastname, email, oidcId }: CreateUserBody) {
    return User.create({
      avatar: avatarUrl,
      firstname,
      lastname,
      email,
      oidcId,
      permissions: 0,
    })
  }
}
