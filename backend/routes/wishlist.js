// routes/wishlist.js
const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// GET all items in the wishlist
router.get('/', async (req, res) => {
    try {
        const wishlistItems = await Wishlist.find().populate('productId'); // Populate to get product details
        res.json(wishlistItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST add a product to the wishlist
router.post('/', async (req, res) => {
    const { productId } = req.body;

    try {
        // Check if the product is already in the wishlist
        const existingItem = await Wishlist.findOne({ productId });

        if (existingItem) {
            return res.status(200).json({ message: 'Product is already in the wishlist' });
        }

        const wishlistItem = new Wishlist({ productId });
        await wishlistItem.save();
        res.status(201).json(wishlistItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a product from the wishlist
router.delete('/:id', async (req, res) => {
    try {
        const wishlistItem = await Wishlist.findByIdAndDelete(req.params.id);

        if (!wishlistItem) {
            return res.status(404).json({ message: 'Wishlist item not found' });
        }

        res.json({ message: 'Wishlist item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
