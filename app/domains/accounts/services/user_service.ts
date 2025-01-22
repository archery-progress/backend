import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import User, { UserStatus } from '#models/user'
import {
  StoreUserSchema,
  UpdateUserSchema,
  UserSearchSchema,
} from '#domains/accounts/validators/user_validator'
import AssetsService from '#app/commons/services/assets_service'
import { inject } from '@adonisjs/core'

@inject()
export default class UserService {
  constructor(private assetsService: AssetsService) {}

  async paginate(payload: UserSearchSchema): Promise<ModelPaginatorContract<User>> {
    return User.query()
      .withScopes((scopes) => scopes.search(payload.search, payload.status))
      .paginate(payload.page ?? 1, payload.limit ?? 20)
  }

  async findById(id: string) {
    return User.findOrFail(id)
  }

  async store(payload: StoreUserSchema) {
    return User.create({
      ...payload,
      status: UserStatus.pending,
    })
  }

  async update(payload: UpdateUserSchema) {
    const user = await this.findById(payload.id)

    await user
      .merge({
        ...payload,
        avatar: payload.avatar
          ? await this.assetsService.upload({
              location: `users/${user.id}/avatar`,
              file: payload.avatar,
              transformer: User.transformAvatar,
            })
          : user.avatar,
      })
      .save()

    if (payload.roles) {
      await user.related('roles').sync(payload.roles)
    }

    return user
  }

  async delete(uid: string) {
    const user = await this.findById(uid)
    await user.delete()
  }
}
