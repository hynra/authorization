/**
 * username    String    The username of the user to retrieve.
 * password    String    The user’s password.
 */

module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const userSchema = new Schema({

    id: Schema.Types.ObjectId,
    username: { type: String },
    password: { type: String },
    phone: String,
    email: String

  })
  return mongoose.model('User', userSchema)
}
