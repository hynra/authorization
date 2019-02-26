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
    const { Client, User } = this.app.model
    Client.deleteMany()
      .then(res => {
        console.log('clear db')
        console.log(res)
      })
    const self = new Client({
      _id: '5c5a5d1e56aec1cc1cb9c61d',
      clientName: '管理员后台',
      redirectUris: ['http://www.baidu.com'],
      grants: ['authorization_code',
        'client_credentials',
        'refresh_token',
        'password'],
      accessTokenLifetime: 3600,
      refreshTokenLifetime: 7200,
    })
    self.save()
      .then(res => {
        console.log('初始化完毕')
        console.log(res)
      })
    User.deleteOne({ _id: '5c5ad7ad4f8a4ed38c303a50' })
      .then(res => {
        console.log('删除User', res)
      })
    User.create({
      _id: '5c5ad7ad4f8a4ed38c303a50',
      username: 'admin',
      password: 'chuanpeng@zhu',
      nickname: '管理员',
      phone: '15566968763',
      email: 'lossa@gmail.com',
      profilePicture: '/public/assets/profile.jpeg',
    })
  }

  async beforeClose () {
    // Do some thing before app close.
  }
}

module.exports = AppBootHook
