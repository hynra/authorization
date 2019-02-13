'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const oauth2 = app.oauth2

  // oauth2专用接口
  router.get('/oauth2/authorize', 'auth.authorize')
  router.post('/oauth2/session', 'auth.session')
  router.post('/oauth2/authorize', oauth2.authorize())
  router.post('/oauth2/token', oauth2.token())
  router.get('/oauth2/authenticate', oauth2.authenticate())
}
