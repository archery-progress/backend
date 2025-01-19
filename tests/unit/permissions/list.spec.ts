import { test } from '@japa/runner'
import { Permissions, PermissionService } from '#app/commons/services/permission_service'
import app from '@adonisjs/core/services/app'

test.group('Permissions list', () => {
  test('verify with multiple permissions', async ({ assert }) => {
    const permissionService = await app.container.make(PermissionService)
    const permissions = Permissions.MANAGE_NOTIFICATIONS | Permissions.VIEW_LOGS

    let [permissionViewLogs, permissionManageNotifications] =
      await permissionService.fromBitfield(permissions)

    assert.equal(permissionViewLogs, Permissions.VIEW_LOGS)
    assert.equal(permissionManageNotifications, Permissions.MANAGE_NOTIFICATIONS)
  })
})
