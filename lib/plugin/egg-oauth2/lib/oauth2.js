'use strict'
const OAuth2Server = require('oauth2-server')
const UnauthorizedRequestError = require('oauth2-server/lib/errors/unauthorized-request-error')
const ServerError = require('oauth2-server/lib/errors/server-error')

class Oauth2 {
  constructor (model, handler) {
    this.model = model
    this.handler = handler
    this.oauth = new OAuth2Server({
      model: model
    })
  }

  token (options, app) {
    return async (ctx, next) => {
      const oauthRequest = new OAuth2Server.Request(ctx.request)
      const oauthResponse = new OAuth2Server.Response(ctx.response)
      try {
        const token = await this.oauth.token(oauthRequest, oauthResponse)
        ctx.body = oauthResponse.body
        ctx.status = oauthResponse.status
      } catch (e) {
        this.handleError(ctx, e)
      } finally {
        ctx.set(oauthResponse.headers)
      }
      await next()
    }

  }

  authorize (options, app) {
    return async (ctx, next) => {

      const options = {
        authenticateHandler: {
          /**
           * 验证是否登录，如果登录返回一个UserObject，
           * 然后redirect过去，带着一个code和state
           * 如果没有登录赚到钱登录页面
           * @param request
           * @param response
           * @returns {string}
           */
          handle: this.handler
        }
      }
      const oauthRequest = new OAuth2Server.Request(ctx.request)
      const oauthResponse = new OAuth2Server.Response(ctx.response)
      let code
      try {
        // code = await this.oauth.authorize(oauthRequest, oauthResponse, options)
        code = await this.oauth.authorize(oauthRequest, oauthResponse)
        ctx.body = oauthResponse.body
        ctx.status = oauthResponse.status
      } catch (e) {
        this.handleError(ctx, e)
      } finally {
        ctx.set(oauthResponse.headers)
      }
      await next()
    }
  }

  authenticate (options, app) {
    return async (ctx, next) => {
      const oauthRequest = new OAuth2Server.Request(ctx.request)
      const oauthResponse = new OAuth2Server.Response(ctx.response)
      try {

        const token = await this.oauth.authenticate(oauthRequest, oauthResponse)
        ctx.body = oauthResponse.body
        ctx.status = oauthResponse.status
      } catch (e) {
        this.handleError(ctx, e)
      } finally {
        ctx.set(oauthResponse.headers)
      }
      await next()
    }
  }

  handleError (ctx, error) {
    if (error instanceof UnauthorizedRequestError) {
      ctx.status = error.code
    } else {
      ctx.body = {
        error: error.name,
        error_description: (error instanceof ServerError && ctx.app.config.env === 'prod') ? 'Server Error' : error.message,
      }
      ctx.status = error.code
    }
    return ctx.app.emit('error', error, ctx)
  }
}

module.exports = Oauth2
