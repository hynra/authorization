'use strict'
const OAuth2Server = require('oauth2-server')
const UnauthorizedRequestError = require('oauth2-server/lib/errors/unauthorized-request-error')
const ServerError = require('oauth2-server/lib/errors/server-error')

class Oauth2 {
  constructor (model) {
    this.model = model
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
           * retrieve the user associated with the request
           * @param request
           * @param response
           * @returns {string}
           */
          handle: (request, response) => ctx.session.userId
        }
      }
      const oauthRequest = new OAuth2Server.Request(ctx.request)
      const oauthResponse = new OAuth2Server.Response(ctx.response)
      try {
        await this.oauth.authorize(oauthRequest, oauthResponse, options)
        ctx.body = oauthResponse.body
        ctx.status = oauthResponse.status
      } catch (e) {
        console.log(ctx.request.body, ctx.request.query)
        if (e instanceof OAuth2Server.AccessDeniedError) {
          console.log('ERROR')
          const param = new URLSearchParams()
          param.append('error', e.name)
          param.append('error_description', e.message)
          ctx.redirect(ctx.request.body.redirect_uri)
        } else {
          this.handleError(ctx, e)
        }
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
      console.log('error.code', error, error.code)
      if(error.code){
        ctx.status = error.code
      }
    }
    return ctx.app.emit('error', error, ctx)
  }
}

module.exports = Oauth2
