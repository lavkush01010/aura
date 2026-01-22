const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

// Dashboard stats
router.get("/stats", auth, admin, async (req,res)=>{
    try{
        const usersCount = await User.countDocuments();
        const productsCount = await Product.countDocuments();
        const ordersCount = await Order.countDocuments();
        res.json({ usersCount, productsCount, ordersCount });
    }catch(err){ res.status(500).json({ msg: err.message }); }
});

module.exports = router;
