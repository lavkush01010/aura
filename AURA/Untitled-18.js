const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true })
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.error(err));

const sampleProducts = [
    {
        title: "Matte Shock Case",
        description: "Premium matte shockproof case for protection and style.",
        price: 699,
        stock: 50,
        images: ["https://via.placeholder.com/300x300?text=Matte+Shock+Case"]
    },
    {
        title: "Silicone Flex Case",
        description: "Soft silicone flexible case for easy grip and protection.",
        price: 599,
        stock: 50,
        images: ["https://via.placeholder.com/300x300?text=Silicone+Flex+Case"]
    },
    {
        title: "Clear MagSafe Case",
        description: "Transparent MagSafe compatible case for your device.",
        price: 799,
        stock: 50,
        images: ["https://via.placeholder.com/300x300?text=Clear+MagSafe+Case"]
    }
];

const seed = async () => {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("Sample products seeded!");
    mongoose.disconnect();
};

seed();
