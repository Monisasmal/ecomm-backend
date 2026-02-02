const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: ["http://localhost:3000",
        "https://react-ecommerce-project-manaswini-sasmals-projects.vercel.app" ],
    method:["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// In your backend folder index.js
// app.use(cors({
//   origin: ["http://localhost:3000"] 
// }));
// app.use(express.json());


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
            id: p._id 
        }));
        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET Single Product 


app.get("/api/singleproduct", async (req, res) => {
    try {
        const id = req.query.id; 
        
       
        const product = await Product.findOne({ _id: id }); 
        
        if (product) {
            // Also ensure the frontend gets an 'id' field it expects
            res.status(200).json({ ...product.toObject(), id: product._id });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});