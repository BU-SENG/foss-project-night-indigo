import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const router = express.Router();


// route to register user
router.post("/register", async (req,res)=>{
    try{
  const  {username, password, role,email } = req.body;
     const hashedPassword = await bcrypt.hash(password,10);
     const newUser = new User({username, password:hashedPassword, role, email})
         await newUser.save();
         res.status(201).json({message: `User registered successfully ${username}`});
  console.log("Successfully registered user" );
    }catch(err){
  
     res.status(500).json({message: 'Registration failed', error: err.message});
    }
     
 });



//route to get user info based on id of user
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'User info fetched successfully',
            user
        });
        console.log(`Fetched info for user ID: ${id}`);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user info', error: err.message });
    }
});






// route to login user
router.post("/login", async (req,res)=>{
    const {username, email, password} = req.body;
    try{
const user = await User.findOne({email})
if(!user){
    return res.status(404).json({message: `Invalid username ${username} or password`});
}
const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch){
    return res.status(404).json({message: `Invalid username ${username} or password`});
}

const token =jwt.sign({userId: user._id, role: user.role},process.env.JWT_SECRET,{expiresIn:'1h'});

res.status(200).json({message: 'Login successful', token});
 console.log("Successfully logged in user" );
    }
    catch(err){
    console.log(err)
    res.status(500).json({message: 'Login failed', error: err.message});
   }
});

export default router;