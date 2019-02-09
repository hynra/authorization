'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const oauth2 = app.oauth2
  router.get('/', controller.home.index)
  router.post('/token',controller.home.token)

  router.get('/authorize', oauth2.authorize(), controller.oauth.authorize)
  router.get('/oauth2/authorize', oauth2.authorize())
  router.get('/oauth2/authenticate', oauth2.authenticate())
  router.post('/oauth2/token', oauth2.token())
}
