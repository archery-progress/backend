import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import {
  SearchSessionSchema,
  StoreSessionSchema,
  UpdateSessionSchema,
} from '#domains/practices/validators/session_validator'
import Session from '#models/session'

export default class SessionService {
  async paginate(payload: SearchSessionSchema): Promise<ModelPaginatorContract<Session>> {
    return Session.query()
      .withScopes((scopes) => scopes.search(payload.search))
      .paginate(payload.page ?? 1, payload.limit ?? 20)
  }

  async findByUid(uid: string) {
    return Session.findByOrFail('uid', uid)
  }

  async store(payload: StoreSessionSchema) {
    return Session.create(payload)
  }

  async update(payload: UpdateSessionSchema) {
    const practice = await this.findByUid(payload.uid)
    return practice.merge(payload).save()
  }

  async delete(uid: string) {
    const user = await this.findByUid(uid)
    return user.delete()
  }
}
