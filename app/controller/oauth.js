'use strict'

const Controller = require('egg').Controller

class AuthController extends Controller {
  async authorize () {
    await this.ctx.render('oauth/authorize.ejs')
  }

  async token () {
    await this.curl()
  }
}

module.exports = AuthController
