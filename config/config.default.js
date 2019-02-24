'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1549278706751_6930'

  // add your config here
  config.middleware = ['login']

  config.login = {
    whiteList: [
      '/',
      '/user/new',
    ]
  }

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

  config.security = {
    csrf: {
      useSession: true,
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    },
  }

  return config
}
