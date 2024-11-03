const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
});

const Wishlist = mongoose.model('Wishlist', wishlistItemSchema);

module.exports = Wishlist;
