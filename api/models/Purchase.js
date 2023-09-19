const Moongoose = require('mongoose');
const Schema = Moongoose.Schema;

const PurchaseSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const PurchaseModel = Moongoose.model('Purchase', PurchaseSchema);

module.exports = PurchaseModel;
