import { UserStatus } from '#app/commons/models/user'
import { MemberFactory } from '#database/factories/member_factory'
import { StructureFactory } from '#database/factories/structure_factory'
import { UserFactory } from '#database/factories/user_factory'
import { test } from '@japa/runner'

test.group('Members show', () => {
  test('must return 200 if the structure owner tries to retrieve a member', async ({ client }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory(user).make()

    const userToBeAdded = await UserFactory(UserStatus.verified).make()

    const member = await MemberFactory(userToBeAdded, structure).make()

    const response = await client
      .get(`/v1/structures/${structure.id}/members/${member.id}`)
      .loginAs(user)
      .send()

    response.assertStatus(200)
  }).tags(['members', 'show'])

  test('must return 403 if the user does not have the necessary permissions', async ({
    client,
  }) => {
    const user = await UserFactory(UserStatus.verified).make()

    const structure = await StructureFactory().make()
    const userToBeAdded = await UserFactory(UserStatus.verified).make()
    const member = await MemberFactory(userToBeAdded, structure).make()

    const response = await client
      .get(`/v1/structures/${structure.id}/members/${member.id}`)
      .loginAs(user)
      .send()

    response.assertStatus(403)
  }).tags(['members', 'show'])

  test('must return 401 if the user is not authenticated', async ({ client }) => {
    const structure = await StructureFactory().make()
    const userToBeAdded = await UserFactory(UserStatus.verified).make()
    const member = await MemberFactory(userToBeAdded, structure).make()

    const response = await client.get(`/v1/structures/${structure.id}/members/${member.id}`).send()

    response.assertStatus(401)
  }).tags(['members', 'show'])

  test('must return 200 if the user tries to view their own profile', async ({ client }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()

    const member = await MemberFactory(user, structure).make()

    const response = await client
      .get(`/v1/structures/${structure.id}/members/${member.id}`)
      .loginAs(user)
      .send()

    response.assertStatus(200)
  }).tags(['members', 'show'])
})
