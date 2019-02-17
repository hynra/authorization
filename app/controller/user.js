'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async index () {
    const { ctx } = this
    await ctx.render('user/index')
  }

  async new (){
    const { ctx } = this
    await ctx.render('user/new')
  }

  async show () {
    const { ctx, service } = this
    const { id } = ctx.params
    const { userId } = ctx.session
    const user = await service.user.getUser({ username: id })
    await ctx.render('user/user', { user })

  }

}

module.exports = UserController
