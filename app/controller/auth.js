'use strict'

const Controller = require('egg').Controller

class AuthController extends Controller {

  checkAuthorizeParam (client, query) {

  }

  async authorize () {
    const { ctx, service } = this
    const userId = ctx.session.userId
    try {

      if (userId) {
        console.log('有session', ctx.session, ctx.request.query)
        const requestQueryParam = { ...ctx.request.query }
        const user = await service.user.getUserById(userId)
        const client = await service.client.getClientById(requestQueryParam.client_id)
        this.checkAuthorizeParam(client, requestQueryParam)
        await ctx.render('auth/authorize', { user, client, query: requestQueryParam })
    } else {
        console.log('没session', ctx.session)
        await ctx.render('auth/login')
    }
    } catch (e) {
      await ctx.render('error')
    }
  }

  async session () {
    const { ctx } = this
    const { User } = this.app.model
    const { username, password } = ctx.request.body
    try {
      const user = await User.findOne({ username, password })
      ctx.session.userId = user._id
      ctx.redirect(ctx.request.header.referer)
    } catch (e) {
      await ctx.render('error', e)
    }
  }
}

module.exports = AuthController
