const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require("../models/Product")

// GET all items in the cart
router.get('/', async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('productId'); 
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST add a product to the cart
router.post('/', async (req, res) => {
    const { productId } = req.body;
    const product = await Product.findById(productId);


    try {
        let cartItem = await Cart.findOne({ productId });

        if (cartItem) {
            // If product is already in cart, increase quantity
            cartItem.quantity += 1;
            await cartItem.save();
            return res.json(cartItem);
        } else {
            // If not in cart, create a new cart item with quantity 1
            cartItem = new Cart({ productId, quantity: 1 });
            await cartItem.save();
            return res.status(201).json(cartItem);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT update the quantity of a cart item
router.put('/:id', async (req, res) => {
    const { quantity } = req.body;

    try {
        const cartItem = await Cart.findByIdAndUpdate(req.params.id, { quantity }, { new: true });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a product from the cart
router.delete('/:id', async (req, res) => {
    try {
        const cartItem = await Cart.findByIdAndDelete(req.params.id);

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.json({ message: 'Cart item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
