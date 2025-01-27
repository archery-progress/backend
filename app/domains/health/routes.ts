import router from '@adonisjs/core/services/router'

const HealthCheckController = () => import('#domains/health/controllers/health_check_controller')

router
  .group(() => {
    router.get('/live', [HealthCheckController, 'live'])
    router.get('/ready', [HealthCheckController, 'ready'])
  })
  .prefix('/health')
