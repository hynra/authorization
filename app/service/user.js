const Service = require('egg').Service

class UserService extends Service {
  async getUserById (userId) {
    const { User } = this.app.model
    const user = await User.findById(userId)
    return user
  }

  async getUser (userObject) {
    const { User } = this.app.model
    const user = await User.findOne(userObject)
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
