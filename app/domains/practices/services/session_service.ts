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
    return Session.query()
      .where('id', id)
      .preload('presets')
      .preload('participants', (builder) =>
        builder.preload('member', (query) => query.preload('user'))
      )
      .firstOrFail()
  }

  async store(payload: StoreSessionSchema) {
    return Session.create({ ...payload, order: payload.order ?? {} })
  }

  async update(sessionId: string, payload: UpdateSessionSchema) {
    const session = await this.findById(sessionId)
    return session.merge(payload).save()
  }

  async delete(id: string) {
    const session = await this.findById(id)
    return session.delete()
  }
}
