'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1549278706751_6930'

  // add your config here
  config.middleware = []

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

  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  }

  config.ejs = {}

  return config
}
