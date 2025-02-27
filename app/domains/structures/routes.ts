import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const StructuresController = () => import('#domains/structures/controllers/structures_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('/', [StructuresController, 'create'])
      })
      .prefix('/structures')
  })
  .prefix('v1')
  .middleware(middleware.auth())
