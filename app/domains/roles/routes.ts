import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const RolesController = () => import('#domains/roles/controllers/roles_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('/', [RolesController, 'store'])
      })
      .prefix('/structures/:structure_id/roles')
  })
  .prefix('v1')
  .middleware(middleware.auth())
