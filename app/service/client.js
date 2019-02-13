const Service = require('egg').Service

class ClientService extends Service {
  async getClientById (clientId) {
    const { Client } = this.app.model
    const client = await Client.findById(clientId)
    return client
  }

  async getClient (clientObject) {
    const { Client } = this.app.model
    const client = await Client.findOne(clientObject)
    return client
  }

  async getClientList (pageNumber = 0, pageSize = 10) {
    const { Client } = this.app.model
    const clientList = await Client.findOne(clientObject)
    return clientList
  }

  async createClient (clientObject) {
    const { Client } = this.app.model
    const createClientResult = await Client.create(clientObject)
    return createClientResult
  }
}

module.exports = ClientService
