'use strict'
const path = require('path')

// had enabled by egg
// exports.static = true;

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose'
}

exports.oauth2 = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-oauth2'),
}

exports.ejs = {
  enable: false,
  package: 'egg-view-ejs',
}

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
}

exports.validate = {
  enable: true,
  package: 'egg-validate',
}
