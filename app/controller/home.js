'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {

  async index () {
    const { ctx, service } = this
    const { id } = ctx.params
    const { userId } = ctx.session
    const user = await service.user.getUserById(userId)

    await ctx.render('home', { user })
  }

}

module.exports = HomeController
