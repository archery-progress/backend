import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#domains/accounts/controllers/users_controller')
const RolesController = () => import('#domains/accounts/controllers/roles_controller')
const PermissionController = () =>
  import('#domains/accounts/controllers/permissions_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('', [UsersController, 'index']).as('index')
        router.delete('/:uid/delete-token', [UsersController, 'deleteToken']).as('deleteToken')
        router.post('', [UsersController, 'store']).as('store')
        router.put(':uid', [UsersController, 'update']).as('update')
        router.delete(':uid', [UsersController, 'delete']).as('delete')
      })
      .prefix('/users')
      .as('users')

    router
      .group(() => {
        router.get('/', [PermissionController, 'index']).as('index')
        router.post('/', [PermissionController, 'store']).as('store')
        router.put('/:uid', [PermissionController, 'update']).as('update')
        router.delete('/:uid', [PermissionController, 'delete']).as('delete')
      })
      .prefix('/permissions')
      .as('permissions')

    router
      .group(() => {
        router.get('/', [RolesController, 'index']).as('index')
        router.post('/', [RolesController, 'store']).as('store')
        router.put('/:uid', [RolesController, 'update']).as('update')
        router.delete('/:uid', [RolesController, 'delete']).as('delete')
      })
      .prefix('/roles')
      .as('roles')
  })
  .prefix('v1')
  .middleware(middleware.auth())
  .as('v1')
