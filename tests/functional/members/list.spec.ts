import Member from '#app/commons/models/member'
import { UserStatus } from '#app/commons/models/user'
import { MemberFactory } from '#database/factories/member_factory'
import { StructureFactory } from '#database/factories/structure_factory'
import { UserFactory } from '#database/factories/user_factory'
import { test } from '@japa/runner'

test.group('Members list', () => {
  test("doit retourner la liste des membres si l'utilisateur est présent dans la structure", async ({
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

  test("doit retourner une erreur (403) si l'utilisateur n'est pas présent dans la structure", async ({
    client,
  }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()

    const response = await client.get(`/v1/structures/${structure.id}/members`).loginAs(user).send()

    response.assertStatus(403)
  }).tags(['members', 'index'])

  test("doit retourner une erreur (401) si l'utilisateur n'est pas authentifié", async ({
    client,
  }) => {
    const response = await client.get(`/v1/structures/1/members`).send()

    response.assertStatus(401)
  }).tags(['members', 'index'])
})
