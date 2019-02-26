'use strict'
const Controller = require('egg').Controller

class ClientController extends Controller {

  async new () {
    const { ctx, service } = this
    const { id } = ctx.params
    const { userId } = ctx.session
    const user = await service.user.getUserById(userId)

    await ctx.render('/client/new', { user })
  }

  async create () {
    const { ctx, service } = this
    const client = await service.client.createClient(ctx.request.body)
    ctx.redirect(`/user/${user.username}`)
  }
}

module.exports = ClientController
