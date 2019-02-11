module.exports = app => {
  return {
    /**
     * request authentication
     * @param accessToken
     */
    getAccessToken: async (accessToken) => {
      console.log('getAccessToken', accessToken)
      const { Token, User, Code, Client } = app.model
      return await Token.findOne({ accessToken })
        .populate('user')
    },

    // /**
    //  * refresh_token grant
    //  * @param refreshToken
    //  */
    // getRefreshToken: async (refreshToken) => {
    //
    //
    // },

    /**
     * authorization_code grant
     * @param authorizationCode
     */
    getAuthorizationCode: async (authorizationCode) => {
      console.log('getAuthorizationCode')
      const { Token, User, Code, Client } = app.model
      const code = await Code.findOne({ authorizationCode: authorizationCode })
        .populate('client')
        .populate('user')
      console.log(code)
      return {
        code: code.authorizationCode,
        expiresAt: code.expiresAt,
        redirectUri: code.redirectUri,
        scope: code.scope,
        client: code.client,
        user: code.user
      }
    },

    /**
     *  authorization_code grant
     *  client_credentials grant
     *  refresh_token grant
     *  password grant
     * @param clientId
     * @param clientSecret
     * @returns {Promise<{id: string, redirectUris: string[], grants: string[], accessTokenLifetime: number, refreshTokenLifetime: number}>}
     */
    getClient: async (clientId, clientSecret) => {
      console.log('getClient', clientId, clientSecret)
      const { Token, User, Code, Client } = app.model
      return await Client.findById(clientId)
    },

    /**
     * password grant
     * @param username
     * @param password
     */
    getUser: async (username, password) => {
      console.log('getUser')
      const { Token, User, Code, Client } = app.model
      return await User.findOne({ username, password })
    },

    // /**
    //  * client_credentials grant
    //  * @param client
    //  */
    // getUserFromClient: async (client) => {
    //
    // },

    /**
     * authorization_code grant
     * client_credentials grant
     * refresh_token grant
     * password grant
     * @param token
     * @param client
     * @param user
     * @returns {Promise<void>}
     */
    saveToken: async (token, client, user) => {
      console.log('saveToken')
      const { Token, User, Code, Client } = app.model
      const tokenDto = new Token({ ...token, client, user })
      return await tokenDto.save()
    },

    /**
     * authorization_code grant
     * @param code
     * @param client
     * @param user
     * @returns {Promise<void>}
     */
    saveAuthorizationCode: async (code, client, user) => {
      console.log('saveAuthorizationCode', code, client, user)
      const { Token, User, Code, Client } = app.model
      const codeDto = new Code({ ...code, client, user })
      return await codeDto.save()
    },

    /**
     * authorization_code grant
     * @param code
     * @returns {Promise<void>}
     */
    revokeAuthorizationCode: async (code) => {
      console.log('revokeAuthorizationCode')
      console.log('code', code)
      const { Token, User, Code, Client } = app.model
      const result = await Code.remove({ authorizationCode: code.code })
      return result.ok

    },

    // /**
    //  * request authentication
    //  * @param accessToken
    //  * @param scope
    //  */
    // verifyScope: (accessToken, scope) => {
    //
    //
    // },
  }
}
