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

  const tokenSchema = new Schema({
    accessToken: String,
    accessTokenExpiresAt: Date,
    refreshToken: String,
    refreshTokenExpiresAt: Date,
    scope: Number,
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  })
  return mongoose.model('Token', tokenSchema)
}
