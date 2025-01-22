import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const RolesController = () => import('#domains/roles/controllers/roles_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [RolesController, 'index'])
        router.post('/', [RolesController, 'store'])
        router.get('/:id', [RolesController, 'show'])

        router.put('/:id', [RolesController, 'update'])
        router.delete('/:id', [RolesController, 'delete'])
      })
      .prefix('/structures/:structureId/roles')
  })
  .prefix('v1')
  .middleware(middleware.auth())
