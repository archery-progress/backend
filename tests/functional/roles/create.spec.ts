import { test } from '@japa/runner'
import app from '@adonisjs/core/services/app'
import RoleService from '#domains/roles/services/role_service'
import { Permissions } from '#app/commons/services/permission_service'
import { UserFactory } from '#database/factories/user_factory'
import { UserStatus, UserType } from '#models/user'

test.group('Roles create', () => {
  test('example test', async ({ assert }) => {
    const roleService = await app.container.make(RoleService)

    const permissions = Permissions.MANAGE_MEMBERS | Permissions.VIEW_LOGS

    const role = await roleService.create({
      name: 'Admin',
      permissions,
    })

    console.log(role.id)

    assert.equal(role.permissions & Permissions.MANAGE_MEMBERS, Permissions.MANAGE_MEMBERS)
    assert.equal(role.permissions & Permissions.VIEW_LOGS, Permissions.VIEW_LOGS)
  })

  test('retourner 201 si le role est créé avec succès', async ({ client }) => {
    const user = await UserFactory(UserType.staff, UserStatus.verified).make()
    const response = await client
      .post('/v1/structures/1/roles')
      .json({
        name: 'Admin',
        permissions: Permissions.MANAGE_MEMBERS | Permissions.VIEW_LOGS,
      })
      .loginAs(user)
      .send()

    response.assertStatus(201)

    console.log(response.body())
  })
})
