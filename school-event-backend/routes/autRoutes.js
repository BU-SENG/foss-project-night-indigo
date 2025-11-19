import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import User from '../models/userModel.js';

// Load environment variables
dotenv.config();

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Allow only image files
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});


// route to register user
router.post("/register", upload.single('profilePicture'), async (req,res)=>{
    try{
      const { fullName, email, password } = req.body;

      // Validate required fields
      if (!fullName || !email || !password) {
        return res.status(400).json({message: 'Full name, email, and password are required'});
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({message: 'Email already registered'});
      }

      // Generate username from email
      const username = email.split('@')[0];

      const hashedPassword = await bcrypt.hash(password, 10);

      const profilePictureUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const newUser = new User({
        username,
        fullName,
        password: hashedPassword,
        email,
        profilePictureUrl,
        role: 'user'
      });

      await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1h' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          phone: newUser.phone || '',
          profilePictureUrl: newUser.profilePictureUrl
        }
      });
    } catch(err) {
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
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user info', error: err.message });
    }
});






// route to login user
router.post("/login", async (req,res)=>{
    const { email, password } = req.body;
    try{
      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({message: 'Email and password are required'});
      }

      const user = await User.findOne({ email });

      if(!user){
        return res.status(404).json({message: 'Invalid email or password'});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch){
        return res.status(404).json({message: 'Invalid email or password'});
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone || '',
          profilePictureUrl: user.profilePictureUrl
        }
      });

      console.log("Successfully logged in user:", email);
    } catch(err) {
      console.log(err);
      res.status(500).json({message: 'Login failed', error: err.message});
    }
});

export default router;