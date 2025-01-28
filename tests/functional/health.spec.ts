import env from '#start/env'
import { test } from '@japa/runner'

test.group('Health', () => {
  test('should return 200 if the secret key has been passed', async ({ client }) => {
    const response = await client
      .get('/health/live')
      .headers({ 'x-monitoring-secret': env.get('MONITORING_KEY') })

    response.assertStatus(200)
  }).tags(['health'])

  test('should return 401 if the secret key has not been passed', async ({ assert, client }) => {
    const response = await client.get('/health/live')

    response.assertStatus(401)
    assert.properties(response.body(), ['message', 'status', 'code'])
    assert.equal(response.body().code, 'E_UNAUTHORIZED_ACCESS')
  }).tags(['health'])
})
