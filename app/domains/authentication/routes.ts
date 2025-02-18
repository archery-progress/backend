import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthenticationController = () =>
  import('#domains/authentication/controllers/authentication_controller')

const GoogleAuthController = () =>
  import('#domains/authentication/controllers/google_authentication_controller')

router
  .group(() => {
    router.get('/me', [AuthenticationController, 'me']).middleware(middleware.auth())
    router.post('/logout', [AuthenticationController, 'logout']).use(middleware.auth())

    router
      .group(() => {
        router.get('/redirect', [GoogleAuthController, 'redirect'])
        router.get('/callback', [GoogleAuthController, 'callback'])
      })
      .prefix('google')
  })
  .prefix('v1/authentication')
