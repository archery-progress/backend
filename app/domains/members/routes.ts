import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const MembersController = () => import('#domains/members/controllers/members_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [MembersController, 'index'])
        router.post('/', [MembersController, 'store'])
        router.get('/:memberId', [MembersController, 'show'])
        router.put('/:memberId', [MembersController, 'update'])
        router.delete('/:memberId', [MembersController, 'delete'])
      })
      .prefix('/structures/:structureId/members')
  })
  .prefix('v1')
  .middleware(middleware.auth())
