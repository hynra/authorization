'use strict'

module.exports = appInfo => {
  const config = exports = {}

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/oauth',
      options: {}
    }
  }

  config.security = {
    csrf: {
      ignore: ctx => ctx.ip === '127.0.0.1'
    }
  }

  return config
}
