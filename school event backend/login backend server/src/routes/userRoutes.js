const express = require("express");
const verifyToken = require('../middleware/authMiddleware')
const router=express.Router();

//only admin can access this route


router.get("/admin", verifyToken,(req,res)=>{
    res.json({message:"Welcome Admin"})
})
//only  user can access this route



router.get("/user", verifyToken, (req,res)=>{
    res.json({message:"Welcome User"})
})


module.exports=router;