'use strict'

const Controller = require('egg').Controller

class SessionController extends Controller {
  async index () {
    const { ctx } = this
    const { userId } = ctx.session
    const { User } = this.app.model
    const user = await User.findOne(({ _id: userId }))
    ctx.redirect(`/user/${user.username}`)
  }

  async create () {
    const { ctx } = this
    const { User } = this.app.model
    const { username, password } = ctx.request.body

    try {
      const user = await User.findOne({ username, password })
      if (user) {
        ctx.session.userId = user._id
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

