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

  async findById(id: string) {
    return Session.query().where('id', id).preload('presets').firstOrFail()
  }

  async store(payload: StoreSessionSchema) {
    return Session.create(payload)
  }

  async update(payload: UpdateSessionSchema) {
    const practice = await this.findById(payload.uid)
    return practice.merge(payload).save()
  }

  async delete(uid: string) {
    const user = await this.findById(uid)
    return user.delete()
  }
}
