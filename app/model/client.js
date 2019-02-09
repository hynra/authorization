/**
 * client  Object  The return value.
 * client.id  String  A unique string identifying the client.
 * [client.redirectUris]  Array<String>  Redirect URIs allowed for the client. Required for the authorization_code grant.
 * client.grants  Array<String>  Grant types allowed for the client.
 * [client.accessTokenLifetime]  Number  Client-specific lifetime of generated access tokens in seconds.
 * [client.refreshTokenLifetime]  Number  Client-specific lifetime of generated refresh tokens in seconds.
 */
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const ClientSchema = new Schema({
    id: Schema.Types.ObjectId,
    clientSecret: String,
    redirectUris: [String],
    grants: [String],
    accessTokenLifetime: Number,
    refreshTokenLifetime: Number
  })

  return mongoose.model('Client', ClientSchema)
}
