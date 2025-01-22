import { test } from '@japa/runner'
import { Permissions } from '#app/commons/services/permission_service'
import { UserFactory } from '#database/factories/user_factory'
import { UserStatus } from '#models/user'
import { StructureFactory } from '#database/factories/structure_factory'
import { MemberFactory } from '#database/factories/member_factory'
import { RoleFactory } from '#database/factories/role_factory'

test.group('Roles create', () => {
  test('must return 201 if the structure owner creates a role', async ({ client }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory(user).make()
    await MemberFactory(user, structure).make()

    const response = await client
      .post(`/v1/structures/${structure.id}/roles`)
      .json({
        name: 'Admin',
        permissions: Permissions.MANAGE_MEMBERS | Permissions.VIEW_LOGS,
      })
      .loginAs(user)
      .send()

    response.assertStatus(201)
  }).tags(['roles', 'create'])

  test('must return 201 if an administrator creates a role', async ({ client }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()
    const member = await MemberFactory(user, structure).make()
    await RoleFactory(structure, [Permissions.ADMINISTRATOR], member).make()

    const response = await client
      .post(`/v1/structures/${structure.id}/roles`)
      .json({
        name: 'Admin',
        permissions: Permissions.MANAGE_MEMBERS | Permissions.VIEW_LOGS,
      })
      .loginAs(user)
      .send()

    response.assertStatus(201)
  }).tags(['roles', 'create'])

  test('should return 201 if a user with the right permissions creates a role', async ({
    client,
  }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()
    const member = await MemberFactory(user, structure).make()
    await RoleFactory(structure, [Permissions.MANAGE_ROLES], member).make()

    const response = await client
      .post(`/v1/structures/${structure.id}/roles`)
      .json({
        name: 'Admin',
        permissions: Permissions.MANAGE_MEMBERS | Permissions.VIEW_LOGS,
      })
      .loginAs(user)
      .send()

    response.assertStatus(201)
  }).tags(['roles', 'create'])

  test('must return 403 if a user without the right permissions creates a role', async ({
    client,
  }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()
    await MemberFactory(user, structure).make()

    const response = await client
      .post(`/v1/structures/${structure.id}/roles`)
      .json({
        name: 'Admin',
        permissions: Permissions.MANAGE_MEMBERS | Permissions.VIEW_LOGS,
      })
      .loginAs(user)
      .send()

    response.assertStatus(403)
  }).tags(['roles', 'create'])

  test('must return 401 if an unauthenticated user creates a role', async ({ client }) => {
    const response = await client.post(`/v1/structures/1/roles`).json({}).send()

    response.assertStatus(401)
  }).tags(['roles', 'create'])
})
