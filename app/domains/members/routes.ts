import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const MembersController = () => import('#domains/members/controllers/members_controller')
const MemberRolesController = () => import('#domains/members/controllers/member_roles_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [MembersController, 'index'])
        router.post('/', [MembersController, 'store'])

        router
          .group(() => {
            router.put('/', [MemberRolesController, 'create'])
            router.delete('/', [MemberRolesController, 'delete'])
          })
          .prefix('/:userId/roles/:roleId')
        router.get('/:memberId', [MembersController, 'show'])
        router.put('/:memberId', [MembersController, 'update'])
        router.delete('/:memberId', [MembersController, 'delete'])
      })
      .prefix('/structures/:structureId/members')
  })
  .prefix('v1')
  .middleware(middleware.auth())
