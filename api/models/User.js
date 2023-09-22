const Mongoose = require('mongoose');
const { Schema } = Mongoose;
const { usersConnection } = require('../index');

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const usersConnection = Mongoose.createConnection(process.env.MONGO_URL_USERS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserModel = usersConnection.model('User', UserSchema);

module.exports = UserModel;
