const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  menuItemId: {
    type: String,
    required: true 
  },
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3
  },
  recipe: String,
  image: String, 
  price: {
    type: Number,
    required: true 
  },
  quantity: {
    type: Number,
    required: true 
  },
  email: {
    type: String,
    required: true
  }
});

const Carts = mongoose.model("Cart", cartSchema);

module.exports = Carts;
