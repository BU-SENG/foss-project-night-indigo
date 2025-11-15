const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

// Register 
const register = async (req,res)=>{
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
    
};


// Login controller
const login = async (req,res)=>{
    const {username, password} = req.body;
    try{
const user = await User.findOne({username})
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
};


module.exports = {register, login};