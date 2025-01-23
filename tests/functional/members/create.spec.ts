import { UserStatus } from '#app/commons/models/user'
import { Permissions } from '#app/commons/services/permission_service'
import { MemberFactory } from '#database/factories/member_factory'
import { RoleFactory } from '#database/factories/role_factory'
import { StructureFactory } from '#database/factories/structure_factory'
import { UserFactory } from '#database/factories/user_factory'
import { test } from '@japa/runner'

test.group('Members create', () => {
  test('should return 201 if the member is created by the structure owner', async ({
    client,
    assert,
  }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory(user).make()

    const userToBeAdded = await UserFactory(UserStatus.verified).make()
    const response = await client
      .post(`/v1/structures/${structure.id}/members`)
      .loginAs(user)
      .json({
        userId: userToBeAdded.id,
        permissions: 0,
      })
      .send()

    response.assertStatus(201)
    assert.properties(response.body(), ['id', 'structureId', 'userId', 'permissions'])
    assert.equal(response.body().userId, userToBeAdded.id)
    assert.equal(response.body().structureId, structure.id)
  }).tags(['members', 'create'])

  test('should return 201 if the member is created by a user who has the right permissions', async ({
    client,
    assert,
  }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()
    const member = await MemberFactory(user, structure).make()
    await RoleFactory(structure, [Permissions.MANAGE_MEMBERS], member).make()

    const userToBeAdded = await UserFactory(UserStatus.verified).make()
    const response = await client
      .post(`/v1/structures/${structure.id}/members`)
      .loginAs(user)
      .json({
        userId: userToBeAdded.id,
        permissions: 0,
      })
      .send()

    response.assertStatus(201)
    assert.properties(response.body(), ['id', 'structureId', 'userId', 'permissions'])
    assert.equal(response.body().userId, userToBeAdded.id)
    assert.equal(response.body().structureId, structure.id)
  }).tags(['members', 'create'])

  test('should return 401 if the user is not authenticated', async ({ client }) => {
    const structure = await StructureFactory().make()

    const response = await client
      .post(`/v1/structures/${structure.id}/members`)
      .json({
        userId: '123',
        permissions: 0,
      })
      .send()

    response.assertStatus(401)
  }).tags(['members', 'create'])

  // verify if the permission is valid
  test('doit retourner 201 si le membre est créé et que le membre créé a les bonnes permissions', async ({
    client,
    assert,
  }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory(user).make()

    const userToBeAdded = await UserFactory(UserStatus.verified).make()
    const permissions = Permissions.VIEW_LOGS | Permissions.VIEW_ROLES

    const response = await client
      .post(`/v1/structures/${structure.id}/members`)
      .loginAs(user)
      .json({
        userId: userToBeAdded.id,
        permissions,
      })
      .send()

    response.assertStatus(201)
    assert.equal(response.body().permissions & Permissions.VIEW_LOGS, Permissions.VIEW_LOGS)
    assert.equal(response.body().permissions & Permissions.VIEW_ROLES, Permissions.VIEW_ROLES)
  }).tags(['members', 'create'])

  test('should return 403 if the member is created by a user who is not the owner of the structure', async ({
    client,
  }) => {
    const user = await UserFactory(UserStatus.verified).make()
    const structure = await StructureFactory().make()

    const userToBeAdded = await UserFactory(UserStatus.verified).make()
    const response = await client
      .post(`/v1/structures/${structure.id}/members`)
      .loginAs(user)
      .json({
        userId: userToBeAdded.id,
        permissions: 0,
      })
      .send()

    response.assertStatus(403)
  }).tags(['members', 'create'])
})
