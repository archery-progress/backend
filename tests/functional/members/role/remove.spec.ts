import { Permissions } from '#app/commons/services/permission_service'
import { MemberFactory } from '#database/factories/member_factory'
import { RoleFactory } from '#database/factories/role_factory'
import { StructureFactory } from '#database/factories/structure_factory'
import { UserFactory } from '#database/factories/user_factory'
import { test } from '@japa/runner'

test.group('Members role remove', () => {
  test('must return 200 if the structure owner removes a role from a member', async ({
    assert,
    client,
  }) => {
    const user = await UserFactory().make()
    const structure = await StructureFactory(user).make()

    const targetUser = await UserFactory().make()
    const member = await MemberFactory(targetUser, structure).make()

    const role = await RoleFactory(structure, [Permissions.VIEW_LOGS], member).make()

    const response = await client
      .delete(`/v1/structures/${structure.id}/members/${targetUser.id}/roles/${role.id}`)
      .loginAs(user)

    response.assertStatus(200)

    const responseMember = await client
      .get(`/v1/structures/${structure.id}/members/${member.id}`)
      .loginAs(user)

    responseMember.assertStatus(200)
    assert.equal(responseMember.body().roles.length, 0)
  }).tags(['members', 'roles'])

  test('must return 200 if an administrator removes a role from a member', async ({ client }) => {
    const structure = await StructureFactory().make()

    const user = await UserFactory().make()
    await MemberFactory(user, structure, [Permissions.MANAGE_MEMBERS]).make()

    const targetUser = await UserFactory().make()
    const member = await MemberFactory(targetUser, structure).make()
    const role = await RoleFactory(structure, [Permissions.VIEW_LOGS], member).make()

    const response = await client
      .delete(`/v1/structures/${structure.id}/members/${targetUser.id}/roles/${role.id}`)
      .loginAs(user)

    response.assertStatus(200)
  }).tags(['members', 'roles'])

  test('must return 403 if a user does not have permissions to remove a role from a member', async ({
    client,
  }) => {
    const structure = await StructureFactory().make()
    const user = await UserFactory().make()
    await MemberFactory(user, structure).make()

    const member = await MemberFactory(await UserFactory().make(), structure).make()
    const role = await RoleFactory(structure, [Permissions.VIEW_LOGS], member).make()

    const response = await client
      .delete(`/v1/structures/${structure.id}/members/${member.userId}/roles/${role.id}`)
      .loginAs(user)

    response.assertStatus(403)
  }).tags(['members', 'roles'])

  test('must return 401 if the user is not authenticated', async ({ client }) => {
    const response = await client.delete(`/v1/structures/1/members/1/roles/1`).send()

    response.assertStatus(401)
  }).tags(['members', 'roles'])
})
