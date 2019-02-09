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
  enable: true,
  package: 'egg-view-ejs',
}
