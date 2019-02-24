const Service = require('egg').Service

class UserService extends Service {
  async getUserById (userId) {
    const { User } = this.app.model
    const user = await User.findById(userId)
      .select('-_id')
    console.log('userGET', user)
    return user
  }

  async getUserId (username, password) {
    const { User } = this.app.model
    const user = await User.findOne({ username, password })
      .select('id')
    return user.id
  }

  async getUser (userObject) {
    const { User } = this.app.model
    const user = await User.findOne(userObject)
      .select('-_id')
    console.log('userGET', user)
    return user
  }

  async getUserList (pageNumber = 0, pageSize = 10) {
    const { User } = this.app.model
    const userList = await User.findOne(userObject)
    return userList
  }

  async createUser (userObject) {
    const { User } = this.app.model
    const createUserResult = await User.create(userObject)
    return createUserResult
  }
}

module.exports = UserService
