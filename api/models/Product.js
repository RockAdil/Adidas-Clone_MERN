const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  price: Number,
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
