const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const { productsConnection } = require('../index');

const ProductSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  price: Number,
});

const productsConnection = Mongoose.createConnection(
  process.env.MONGO_URL_PRODUCTS,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const ProductModel = productsConnection.model('Product', ProductSchema);

module.exports = ProductModel;
