const express = require("express");
const User = require("../models/user.model")
const router = express.Router();


router.get("",async(req,res)=>{
    try {
        const user = await User.find().lean().exec()
        return res.send(user)
    } catch (error) {
        return res.send({message: error.message})
    }
})








module.exports = router;