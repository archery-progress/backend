import { Authenticators } from '@adonisjs/auth/types'
import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import { errors as authErrors } from '@adonisjs/auth'

export default class MonitoringMiddleware {
  async handle(
    { request }: HttpContext,
    next: NextFn,
    _options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    if (request.header('x-monitoring-secret') === '') {
      return next()
    }

    throw new authErrors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
      guardDriverName: 'api',
    })
  }
}
