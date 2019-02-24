'use strict'

const Controller = require('egg').Controller

class SessionController extends Controller {
  async index () {
    const { ctx, service } = this
    const { userId } = ctx.session
    const user = await service.user.getUserById(userId)
    ctx.redirect(`/user/${user.username}`)
  }

  async create () {
    const { ctx, service } = this
    const { username, password } = ctx.request.body

    try {
      const userId = await service.user.getUserId(username, password)
      console.log('user', userId, username, password)
      if (userId) {
        ctx.session.userId = userId
      }
      ctx.redirect(ctx.request.header.referer)
    } catch (e) {
      await ctx.render('error', e)
    }
  }

  async destroy () {
    const { ctx } = this
    try {
      ctx.session.userId = null
      ctx.redirect(ctx.request.header.referer)
    } catch (e) {
      await ctx.render('error', e)
    }
  }
}

module.exports = SessionController

