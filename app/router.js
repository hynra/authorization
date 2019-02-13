'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const oauth2 = app.oauth2

  // oauth2专用接口
  router.get('/oauth2/authorize', 'auth.renderLoginOrAuthorize')
  router.post('/oauth2/login', 'auth.loginSession')
  router.post('/oauth2/logout', 'auth.logoutSession')
  router.post('/oauth2/authorize', oauth2.authorize())
  router.post('/oauth2/token', oauth2.token())
  router.get('/oauth2/authenticate', oauth2.authenticate())
}
