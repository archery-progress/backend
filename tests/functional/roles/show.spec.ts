import { UserStatus } from '#app/commons/models/user'
import { Permissions } from '#app/commons/services/permission_service'
import { MemberFactory } from '#database/factories/member_factory'
import { RoleFactory } from '#database/factories/role_factory'
import { StructureFactory } from '#database/factories/structure_factory'
import { UserFactory } from '#database/factories/user_factory'
import { test } from '@japa/runner'

test.group('Roles show', () => {
  test('must return 200 if the structure owner get a role', async ({ client }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory(user).make()

    const role = await RoleFactory(structure, [Permissions.MANAGE_ROLES]).make()

    const response = await client
      .get(`/v1/structures/${structure.id}/roles/${role.id}`)
      .loginAs(user)
      .send()

    response.assertStatus(200)
  }).tags(['roles', 'show'])

  test('must return 200 if an administrator get a role', async ({ client }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()
    const member = await MemberFactory(user, structure).make()
    await RoleFactory(structure, [Permissions.ADMINISTRATOR], member).make()

    const role = await RoleFactory(structure, [Permissions.MANAGE_ROLES]).make()

    const response = await client
      .get(`/v1/structures/${structure.id}/roles/${role.id}`)
      .loginAs(user)
      .send()

    response.assertStatus(200)
  }).tags(['roles', 'show'])
  test('should return 200 if a user with the right permissions get a role', async ({ client }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()
    const member = await MemberFactory(user, structure).make()
    await RoleFactory(structure, [Permissions.VIEW_ROLES], member).make()

    const role = await RoleFactory(structure, [Permissions.MANAGE_ROLES]).make()

    const response = await client
      .get(`/v1/structures/${structure.id}/roles/${role.id}`)
      .loginAs(user)
      .send()

    response.assertStatus(200)
  }).tags(['roles', 'show'])

  test('should return 403 if the user does not have the right permissions', async ({ client }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()

    const role = await RoleFactory(structure, [Permissions.VIEW_MEMBERS]).make()

    const response = await client
      .get(`/v1/structures/${structure.id}/roles/${role.id}`)
      .loginAs(user)
      .send()

    response.assertStatus(403)
  }).tags(['roles', 'show'])
})
