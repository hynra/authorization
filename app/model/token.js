/**
 * token    Object    The token(s) to be saved.
 * token.accessToken    String    The access token to be saved.
 * token.accessTokenExpiresAt    Date    The expiry time of the access token.
 * [token.refreshToken]    String    The refresh token to be saved.
 * [token.refreshTokenExpiresAt]    Date    The expiry time of the refresh token.
 * [token.scope]
 * token.client    Object    The client associated with the access token.
 * token.client.id    String    A unique string identifying the client.
 * token.user    Object    The user associated with the access token.
 */
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const { ObjectId, String } = Schema.Types

  const tokenSchema = new Schema({
    accessToken: { type: String },
    accessTokenExpiresAt: { type: Date },
    refreshToken: { type: String },
    refreshTokenExpiresAt: { type: Date },
    scope: { type: Number },
    client: { type: ObjectId, ref: 'Client' },
    user: { type: ObjectId, ref: 'User' }
  })
  return mongoose.model('Token', tokenSchema)
}
