const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. PASTE YOUR COPIED LINK HERE
// Important: Replace <db_password> with the password for 'manaswinisasmal5597'
// I added /SasmalStore before the '?' to separate this from your other project.
const mongoURI = "mongodb+srv://manaswinisasmal5597:Manaswini5597@tasknest.qgtgrph.mongodb.net/SasmalStore?retryWrites=true&w=majority&appName=TaskNest";

mongoose.connect(mongoURI)
    .then(() => console.log("✅ SUCCESS: Connected to MongoDB Atlas!"))
    .catch(err => console.log("❌ ERROR: Connection failed:", err));

// 2. Define the Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    category: String,
    featured: Boolean,
    company: String,      
    description: String,  
    stock: Number,        
    stars: Number,        
    reviews: Number,      
    colors: Array         
});

const Product = mongoose.model('Product', productSchema, 'products');



// GET All Products - Fixes the "id" vs "_id" issue for the main list
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        const formatted = products.map(p => ({
            ...p.toObject(),
            id: p._id // React expects 'id', MongoDB gives '_id'
        }));
        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET Single Product - Fixes the "undefined" page
app.get('/api/singleproduct/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Not found" });
        
        const formatted = { ...product.toObject(), id: product._id };
        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});