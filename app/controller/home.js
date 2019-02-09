'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index () {
    await this.ctx.render('oauth/authorize.ejs')
  }

  async token () {
    const { ctx } = this
    let result
    try {
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
      if (result.data.error) {
        ctx.body = result.data
      }
    } catch (e) {
      console.log(e)
      await ctx.render('error.ejs')
    }
  }
}

module.exports = HomeController;
