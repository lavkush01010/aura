const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Razorpay = require("../utils/razorpay");

// Place order
router.post("/", auth, async (req,res)=>{
    const { products, amount, address } = req.body;
    try{
        // Create Razorpay order
        const options = {
            amount: amount * 100, // in paise
            currency: "INR",
            receipt: `order_rcpt_${Date.now()}`,
            payment_capture: 1
        };
        const razorOrder = await Razorpay.orders.create(options);

        // Save order in DB
        const newOrder = new Order({
            userId: req.user.id,
            products,
            amount,
            address,
            paymentStatus: "Pending",
            orderStatus: "Processing"
        });
        await newOrder.save();

        res.json({ orderId: newOrder._id, razorOrder });
    }catch(err){ res.status(500).json({ msg: err.message }); }
});

// Get user orders
router.get("/", auth, async (req,res)=>{
    try{
        const orders = await Order.find({ userId: req.user.id }).populate("products.productId");
        res.json(orders);
    }catch(err){ res.status(500).json({ msg: err.message }); }
});

// Admin: get all orders
router.get("/all", auth, admin, async (req,res)=>{
    try{
        const orders = await Order.find().populate("products.productId").populate("userId");
        res.json(orders);
    }catch(err){ res.status(500).json({ msg: err.message }); }
});

// Update order status (admin)
router.put("/:id/status", auth, admin, async (req,res)=>{
    const { orderStatus, paymentStatus } = req.body;
    try{
        const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus, paymentStatus }, { new:true });
        res.json(order);
    }catch(err){ res.status(500).json({ msg: err.message }); }
});

module.exports = router;
