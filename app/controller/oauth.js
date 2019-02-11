'use strict'

const Controller = require('egg').Controller

class AuthController extends Controller {
  async authorize () {
    const { ctx } = this
    if (ctx.status === 401) {
      console.log('没token', ctx.status, ctx.session)
      await ctx.render('oauth/login')
    } else {
      console.log('有token', ctx.status)
      await ctx.render('error')
    }
  }

  async session () {
    const { ctx } = this
    let result
    try {
      console.log('param', ctx.request)
      result = await ctx.curl(`${ctx.request.origin}/oauth2/token`, {
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: {
          client_id: '5c5a5d1e56aec1cc1cb9c61d',
          client_secret: 'qwe',
          grant_type: 'password',
          ...ctx.request.body
        },
        dataType: 'json'
      })
      ctx.session = ctx.body = result.data
      console.log('referer', ctx.request.header)
      ctx.redirect(ctx.request.header.referer)
    } catch (e) {
      await ctx.render('error')
    }
  }
}

module.exports = AuthController
