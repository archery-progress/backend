import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#domains/accounts/controllers/users_controller')

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
  })
  .prefix('v1')
  .middleware(middleware.auth())
  .as('v1')
