const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
router.post("/register", async (req,res)=>{
    const { name,email,phone,password } = req.body;
    try{
        const existing = await User.findOne({ email });
        if(existing) return res.status(400).json({ msg:"Email exists" });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password,salt);

        const newUser = new User({ name,email,phone,passwordHash });
        await newUser.save();

        const token = jwt.sign({ id:newUser._id, isAdmin:newUser.isAdmin }, process.env.JWT_SECRET, { expiresIn:"7d" });
        res.json({ token, user:{ name,newUser,email,phone } });
    }catch(err){ res.status(500).json({ msg:err.message }); }
});

// Login
router.post("/login", async (req,res)=>{
    const { email,password } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ msg:"User not found" });

        const isMatch = await bcrypt.compare(password,user.passwordHash);
        if(!isMatch) return res.status(400).json({ msg:"Invalid credentials" });

        const token = jwt.sign({ id:user._id, isAdmin:user.isAdmin }, process.env.JWT_SECRET, { expiresIn:"7d" });
        res.json({ token, user:{ name:user.name,email:user.email,phone:user.phone } });
    }catch(err){ res.status(500).json({ msg:err.message }); }
});

module.exports = router;
