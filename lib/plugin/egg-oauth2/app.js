const Oauth2 = require('./lib/oauth2')
const path = require('path')

class AppBootHook {
  constructor (app) {
    this.app = app
  }

  configWillLoad () {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad () {
    // Config, plugin files have been loaded.
    const { loader, config } = this.app
    const model = loader.loadFile(path.join(config.baseDir, 'app/extend/oauth2_model.js'))
    const handler = loader.loadFile(path.join(config.baseDir, 'app/extend/oauth2_handler.js'))
    this.app.oauth2 = new Oauth2(model,handler)
  }

  async didLoad () {
    // All files have loaded, start plugin here.
  }

  async willReady () {
    // All plugins have started, can do some thing before app ready
  }

  async didReady () {
    // Worker is ready, can do some things
    // don't need to block the app boot.
  }

  async serverDidReady () {
    // Server is listening.
  }

  async beforeClose () {
    // Do some thing before app close.
  }
}

module.exports = AppBootHook
