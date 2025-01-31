import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const SessionsController = () => import('#app/domains/practices/controllers/sessions_controller')
const PracticesController = () => import('#domains/practices/controllers/practices_controller')
const PracticeFiringSequencesController = () =>
  import('#app/domains/practices/controllers/practice_firing_sequences_controller')
const PracticeCountedShotPresetsController = () =>
  import('#app/domains/practices/controllers/practice_counted_shot_presets_controller')
const PracticeMessagesController = () =>
  import('#app/domains/practices/controllers/practice_messages_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('', [PracticesController, 'index']).as('index')
        router.post('', [PracticesController, 'store']).as('store')
        router.put(':uid', [PracticesController, 'update']).as('update')
        router.delete(':uid', [PracticesController, 'destroy']).as('delete')
        router
          .group(() => {
            router.get('', [PracticeMessagesController, 'index']).as('index')
            router.post('', [PracticeMessagesController, 'store']).as('store')
            router.put(':uid', [PracticeMessagesController, 'update']).as('update')
            router.delete(':uid', [PracticeMessagesController, 'destroy']).as('delete')
          })
          .prefix('/messages')
          .as('messages')

        router
          .group(() => {
            router.get('', [PracticeCountedShotPresetsController, 'index']).as('index')
            router.post('', [PracticeCountedShotPresetsController, 'store']).as('store')
            router.put(':uid', [PracticeCountedShotPresetsController, 'update']).as('update')
            router.delete(':uid', [PracticeCountedShotPresetsController, 'destroy']).as('delete')
          })
          .prefix('/counted-shot-presets')
          .as('counted_shot_presets')

        router
          .group(() => {
            router.get('', [PracticeFiringSequencesController, 'index']).as('index')
            router.post('', [PracticeFiringSequencesController, 'store']).as('store')
            router.put(':uid', [PracticeFiringSequencesController, 'update']).as('update')
            router.delete(':uid', [PracticeFiringSequencesController, 'destroy']).as('delete')
          })
          .prefix('/firing-sequences')
          .as('firing_sequences')
      })
      .prefix('/practices')
      .as('practices')

    router
      .group(() => {
        router.get('', [SessionsController, 'index']).as('index')
        router.post('', [SessionsController, 'store']).as('store')
        router.put(':uid', [SessionsController, 'update']).as('update')
        router.delete(':uid', [SessionsController, 'destroy']).as('delete')

        router
          .group(() => {
            router.put(':uid', [SessionParticipantController, 'add']).as('add')
            router.delete(':uid', [SessionParticipantController, 'remove']).as('remove')
          })
          .prefix('/participants')
          .as('participants')
      })
      .prefix('/sessions')
      .as('sessions')
  })
  .prefix('/v1/structures/:structureId')
  .middleware(middleware.auth())
