'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const oauth2 = app.oauth2

  router.get('/', 'home.index')

  router.get('/register', 'register.renderRegister')
  router.post('/register', 'register.registerUser')

  // oauth2专用接口
  router.get('/oauth2/authorize', 'auth.renderLoginOrAuthorize')
  router.post('/oauth2/authorize', oauth2.authorize())
  router.post('/oauth2/token', oauth2.token())
  router.get('/oauth2/authenticate', oauth2.authenticate())

  router.resources('/session', controller.session)
  router.resources('/user', controller.user)
  router.resources('/client', controller.client)
}
