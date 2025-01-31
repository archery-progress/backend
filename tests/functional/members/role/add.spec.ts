import { Permissions } from '#app/commons/services/permission_service'
import { MemberFactory } from '#database/factories/member_factory'
import { RoleFactory } from '#database/factories/role_factory'
import { StructureFactory } from '#database/factories/structure_factory'
import { UserFactory } from '#database/factories/user_factory'
import { test } from '@japa/runner'

test.group('Members add role', () => {
  test('must return 200 if the structure owner adds a role to a member', async ({
    assert,
    client,
  }) => {
    const user = await UserFactory().make()
    const structure = await StructureFactory(user).make()

    const targetUser = await UserFactory().make()
    const member = await MemberFactory(targetUser, structure).make()

    const role = await RoleFactory(structure, [Permissions.VIEW_LOGS]).make()
    const response = await client
      .put(`/v1/structures/${structure.id}/members/${targetUser.id}/roles/${role.id}`)
      .loginAs(user)

    response.assertStatus(200)

    const responseMember = await client
      .get(`/v1/structures/${structure.id}/members/${member.id}`)
      .loginAs(user)

    assert.equal(responseMember.body().roles.length, 1)
    assert.equal(responseMember.body().roles[0].id, role.id)
  }).tags(['members', 'roles'])

  test('must return 200 if an administrator adds a role to a member', async ({
    client,
    assert,
  }) => {
    const structure = await StructureFactory().make()
    const user = await UserFactory().make()
    await MemberFactory(user, structure, [Permissions.ADMINISTRATOR]).make()

    const member = await MemberFactory(await UserFactory().make(), structure).make()

    const role = await RoleFactory(structure, [Permissions.VIEW_LOGS]).make()

    const response = await client
      .put(`/v1/structures/${structure.id}/members/${member.userId}/roles/${role.id}`)
      .loginAs(user)
    response.assertStatus(200)

    const responseMember = await client
      .get(`/v1/structures/${structure.id}/members/${member.id}`)
      .loginAs(user)

    assert.equal(responseMember.body().roles.length, 1)
    assert.equal(responseMember.body().roles[0].id, role.id)
  }).tags(['members', 'roles', 'tete'])

  test('must return 403 if a user does not have permissions to add a role to a member', async ({
    client,
  }) => {
    const structure = await StructureFactory().make()

    const user = await UserFactory().make()
    await MemberFactory(user, structure).make()

    const role = await RoleFactory(structure, [Permissions.VIEW_LOGS]).make()

    const response = await client
      .put(`/v1/structures/${structure.id}/members/${user.id}/roles/${role.id}`)
      .loginAs(user)

    response.assertStatus(403)
  }).tags(['members', 'roles'])

  test('must return 401 if the user is not authenticated', async ({ client }) => {
    const response = await client.put(`/v1/structures/1/members/1/roles/1`)

    response.assertStatus(401)
  }).tags(['members', 'roles'])
})
