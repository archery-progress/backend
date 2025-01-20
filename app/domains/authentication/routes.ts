import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthenticationController = () =>
  import('#domains/authentication/controllers/authentication_controller')

router
  .group(() => {
    router.get('/me', [AuthenticationController, 'me']).middleware(middleware.auth())
    router.post('/login', [AuthenticationController, 'login'])
    router.post('/logout', [AuthenticationController, 'logout']).use(middleware.auth())
    router.post('/forgot_password', [AuthenticationController, 'forgotPasswordAction'])

    router
      .get('/reset_password/:uid', [AuthenticationController, 'resetPassword'])
      .as('resetPassword')
    router.post('/reset_password/:uid', [AuthenticationController, 'resetPasswordAction'])
  })
  .prefix('v1/authentication')
