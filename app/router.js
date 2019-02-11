'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const oauth2 = app.oauth2

  // authorization前端用接口
  router.get('/', controller.home.index)
  router.post('/token',controller.home.token)

  // oauth2专用接口
  router.post('/oauth2/session', 'oauth.session')
  router.get('/oauth2/authorize', oauth2.authorize(), 'oauth.authorize')
  router.get('/oauth2/authenticate', oauth2.authenticate())
  router.post('/oauth2/token', oauth2.token())
}
