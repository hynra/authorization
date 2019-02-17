'use strict'

const Controller = require('egg').Controller

class RegisterController extends Controller {

  async renderRegister () {
    const { ctx } = this
    await ctx.render('register/register')
  }

  async registerUser () {
    const { ctx } = this
    try {
      await ctx.render()
    } catch (e) {
      await ctx.render('error', e)
    }
  }

}

module.exports = RegisterController
