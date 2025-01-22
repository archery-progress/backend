import { UserStatus } from '#app/commons/models/user'
import { Permissions } from '#app/commons/services/permission_service'
import { MemberFactory } from '#database/factories/member_factory'
import { RoleFactory } from '#database/factories/role_factory'
import { StructureFactory } from '#database/factories/structure_factory'
import { UserFactory } from '#database/factories/user_factory'
import { test } from '@japa/runner'

test.group('Roles delete', () => {
  test('must return 200 if the structure owner delete a role', async ({ client }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory(user).make()

    await MemberFactory(user, structure).make()
    const role = await RoleFactory(structure, [Permissions.MANAGE_ROLES]).make()

    const response = await client
      .delete(`/v1/structures/${structure.id}/roles/${role.id}`)
      .loginAs(user)
      .send()

    response.assertStatus(200)
  }).tags(['roles', 'delete'])

  test('must return 200 if an administrator delete a role', async ({ client }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()
    const member = await MemberFactory(user, structure).make()
    const role = await RoleFactory(structure, [Permissions.ADMINISTRATOR], member).make()

    const response = await client
      .delete(`/v1/structures/${structure.id}/roles/${role.id}`)
      .loginAs(user)
      .send()

    response.assertStatus(200)
  }).tags(['roles', 'delete'])

  test('should return 200 if a user with the right permissions delete a role', async ({
    client,
  }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()
    const member = await MemberFactory(user, structure).make()
    const role = await RoleFactory(structure, [Permissions.MANAGE_ROLES], member).make()

    const response = await client
      .delete(`/v1/structures/${structure.id}/roles/${role.id}`)
      .loginAs(user)
      .send()

    response.assertStatus(200)
  }).tags(['roles', 'delete'])

  test('should return 403 if the user does not have the right permissions', async ({ client }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()
    const member = await MemberFactory(user, structure).make()
    const role = await RoleFactory(structure, [Permissions.VIEW_MEMBERS], member).make()

    const response = await client
      .delete(`/v1/structures/${structure.id}/roles/${role.id}`)
      .loginAs(user)
      .send()

    response.assertStatus(403)
  }).tags(['roles', 'delete'])
})
