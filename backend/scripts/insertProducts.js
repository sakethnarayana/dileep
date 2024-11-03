const mongoose = require('mongoose');
const Product = require('../models/Product'); 
const path = require('path');

const uri = "mongodb+srv://dchinneluka1:okfCEaalLLSFiurK@cluster0.3j5qw.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
    try {
        await mongoose.connect(uri); 
        
        const dataPath = path.join(__dirname, '../assets', 'products.json');
        const jsonData = fs.readFileSync(dataPath);
        const products = JSON.parse(jsonData);

        const result = await Product.insertMany(products);
        console.log(`${result.length} documents were inserted`);
    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.connection.close();
    }
}

run().catch(console.error);
