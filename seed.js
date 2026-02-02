const mongoose = require('mongoose');

// USE YOUR WORKING CONNECTION STRING HERE
const mongoURI = "mongodb+srv://manaswinisasmal5597:Manaswini5597@tasknest.qgtgrph.mongodb.net/SasmalStore?retryWrites=true&w=majority&appName=TaskNest";

mongoose.connect(mongoURI);

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    category: String,
    featured: Boolean
});

const Product = mongoose.model('Product', productSchema);

const seedData = [
    {
        name: "Modern Laptop",
        price: 99999,
        image: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
        category: "electronics",
        featured: true
    },
    {
        name: "Wireless Headphones",
        price: 5000,
        image: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg",
        category: "accessories",
        featured: true
    }
];

const seedDB = async () => {
    await Product.deleteMany({}); // Clears existing data
    await Product.insertMany(seedData);
    console.log("✅ Database Seeded Successfully!");
    process.exit();
};

seedDB();