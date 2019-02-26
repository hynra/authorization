/**
 * username    String    The username of the user to retrieve.
 * password    String    The user’s password.
 */

module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const { ObjectId, String, Buffer } = Schema.Types

  const userSchema = new Schema({
    username: { type: String },
    password: { type: String, select: false },
    nickname: { type: String },
    profilePicture: { type: String },
    phone: { type: String },
    email: { type: String },
  })
  return mongoose.model('User', userSchema)
}
