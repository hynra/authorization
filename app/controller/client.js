'use strict'
const Controller = require('egg').Controller
const crypto = require('crypto')


class ClientController extends Controller {

  async index () {
    const { ctx, service } = this
    const { id } = ctx.params
    const { userId } = ctx.session
    const user = await service.user.getUserById(userId)
    const clientList = await service.client.getClientList()
    await ctx.render('/client/index', { user, clientList })
  }

  async new () {
    const { ctx, service } = this
    const { id } = ctx.params
    const { userId } = ctx.session
    const user = await service.user.getUserById(userId)

    await ctx.render('/client/new', { user })
  }

  async create () {
    const { ctx, service } = this
    const clientSecret = crypto.randomBytes(32)
      .toString('hex')
    const {
      logo = ctx.helper.getDefaultApplicationLogo(),
      grants = ['authorization_code', 'client_credentials', 'refresh_token', 'password'],
      clientName,
      description,
      redirectUri,
    } = ctx.request.body
    const redirectUris = redirectUri.split(',')
    console.log('redirectUri',redirectUri)
    const client = await service.client.createClient({
      logo,
      clientName,
      clientSecret,
      grants,
      description,
      redirectUris,
    })
    ctx.redirect(`/client/${client.id}`)
  }

  async show () {
    const { ctx, service } = this
    const { id } = ctx.params
    const { userId } = ctx.session

    const user = await service.user.getUserById(userId)
    const client = await service.client.getClientById(id)
    await ctx.render('/client/show', { user, client })
  }

  async update () {
    const { ctx, service } = this
    const { id } = ctx.params
    const {
      logo,
      clientName,
      grants,
      description,
      redirectUris,
    } = ctx.request.body
    console.log('in.....')
    ctx.body = await service.client.getClientById(id)
  }
}

module.exports = ClientController
