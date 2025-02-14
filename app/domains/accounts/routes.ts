import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#domains/accounts/controllers/users_controller')
const UserStructuresController = () =>
  import('#domains/accounts/controllers/user_structures_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/structures', [UserStructuresController, 'index'])
      })
      .prefix('/users/@me')
    router
      .group(() => {
        router.get('', [UsersController, 'index']).as('index')
        router.get(':id', [UsersController, 'show']).as('show')
        router.delete('/:id/delete-token', [UsersController, 'deleteToken']).as('deleteToken')
        router.post('', [UsersController, 'store']).as('store')
        router.put(':id', [UsersController, 'update']).as('update')
        router.delete(':id', [UsersController, 'delete']).as('delete')
      })
      .prefix('/users')
      .as('users')
  })
  .prefix('v1')
  .middleware(middleware.auth())
