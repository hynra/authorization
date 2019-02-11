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

  config.view = {
    mapping: {
      '.nj': 'nunjucks',
      '.html': 'nunjucks'
    },
    defaultExtension: '.html',
    defaultViewEngine: 'nunjucks'
  }

  config.ejs = {}

  return config
}
