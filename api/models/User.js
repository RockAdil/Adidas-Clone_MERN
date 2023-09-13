const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = Mongoose.model('User', UserSchema);

module.exports = UserModel;
