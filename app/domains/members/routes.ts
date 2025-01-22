import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const MembersController = () => import('#domains/members/controllers/members_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [MembersController, 'index'])
        router.post('/', [MembersController, 'store'])
        router.get('/:id', [MembersController, 'show'])
        router.put('/:id', [MembersController, 'update'])
        router.delete('/:id', [MembersController, 'delete'])
      })
      .prefix('/structures/:structureId/members')
  })
  .prefix('v1')
  .middleware(middleware.auth())
