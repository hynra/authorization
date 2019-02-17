'use strict'

const Controller = require('egg').Controller
const OAuth2Server = require('oauth2-server')

class AuthController extends Controller {

  checkAuthorizeParam (client, query) {
    if (query.redirect_uri && !client.redirectUris.includes(query.redirect_uri)) {
      throw new OAuth2Server.InvalidRequestError()
    }
    if (!query.redirect_uri) {
      query.redirect_uri = client.redirectUris[0]
    }
  }

  async renderLoginOrAuthorize () {
    const { ctx, service } = this
    const { userId } = ctx.session
    try {
      if (userId) {
        const requestQueryParam = { ...ctx.request.query }
        const user = await service.user.getUserById(userId)
        const client = await service.client.getClientById(requestQueryParam.client_id)
        this.checkAuthorizeParam(client, requestQueryParam)
        await ctx.render('auth/authorize', { user, client, query: requestQueryParam })
    } else {
        await ctx.render('session/create')
    }
    } catch (e) {
      await ctx.render('error', e)
    }
  }


}

module.exports = AuthController
