import { StructureFactory } from '#database/factories/structure_factory'
import { UserFactory } from '#database/factories/user_factory'
import { test } from '@japa/runner'

test.group('Structures create', () => {
  test('should return 401 if user is not authenticated', async ({ client }) => {
    const response = await client.post('/v1/structures')

    response.assertStatus(401)
  }).tags(['structures'])

  test('should return 403 if user has reached the structure limit', async ({ client }) => {
    const user = await UserFactory().make()

    await StructureFactory(user).createMany(5)
    const response = await client
      .post('/v1/structures')
      .json({
        name: 'Random name',
      })
      .loginAs(user)

    response.assertStatus(403)
  }).tags(['structures'])

  test('should return 201 and the created structure if the informations are good', async ({
    client,
  }) => {
    const user = await UserFactory().make()
    const response = await client
      .post('/v1/structures')
      .json({
        name: 'Random name',
      })
      .loginAs(user)

    response.assertStatus(201)
  }).tags(['structures'])

  test('should return 422 if the name is not provided', async ({ client }) => {
    const user = await UserFactory().make()
    const response = await client.post('/v1/structures').json({}).loginAs(user)

    response.assertStatus(422)
  }).tags(['structures'])
})
