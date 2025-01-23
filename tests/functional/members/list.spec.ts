import Member from '#app/commons/models/member'
import { UserStatus } from '#app/commons/models/user'
import { MemberFactory } from '#database/factories/member_factory'
import { StructureFactory } from '#database/factories/structure_factory'
import { UserFactory } from '#database/factories/user_factory'
import { test } from '@japa/runner'

test.group('Members list', () => {
  test('must return the list of members if the user is owner of the structure', async ({
    client,
    assert,
  }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory(user).make()
    await MemberFactory(await UserFactory(UserStatus.verified).make(), structure).make()

    const response = await client.get(`/v1/structures/${structure.id}/members`).loginAs(user).send()

    response.assertStatus(200)
    assert.isEmpty(response.body().data.filter((member: Member) => member.userId === user.id))
  }).tags(['members', 'index'])

  test('must return the list of members if the user is present in the structure', async ({
    client,
    assert,
  }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()

    await MemberFactory(user, structure).make()

    const response = await client.get(`/v1/structures/${structure.id}/members`).loginAs(user).send()

    response.assertStatus(200)
    assert.isEmpty(
      response.body().data.filter((member: Member) => member.userId === structure.ownerId)
    )
  }).tags(['members', 'index'])

  test('must return an error (403) if the user is not present in the structure', async ({
    client,
  }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()

    const response = await client.get(`/v1/structures/${structure.id}/members`).loginAs(user).send()

    response.assertStatus(403)
  }).tags(['members', 'index'])

  test('must return an error (401) if the user is not authenticated', async ({ client }) => {
    const response = await client.get(`/v1/structures/1/members`).send()

    response.assertStatus(401)
  }).tags(['members', 'index'])
})
