import { healthChecks } from '#start/health'
import { HttpContext } from '@adonisjs/core/http'

export default class HealthCheckController {
  async live({ response }: HttpContext) {
    return response.status(200).json({ status: 'UP' })
  }

  async ready({ response }: HttpContext) {
    const report = await healthChecks.run()

    if (report.isHealthy) {
      return response.ok(report)
    }

    return response.serviceUnavailable(report)
  }
}
