const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
