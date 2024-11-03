// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

// GET route to fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});


module.exports = router;
