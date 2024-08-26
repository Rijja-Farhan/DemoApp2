import bcrypt from "bcrypt"; // Ensure the correct package name
import { User } from "../models/User.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();
const connectionString = process.env.MONGO_URI;

// Wrap connection in an async function or IIFE
(async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

export const signup = async (req, res) => {
  const { email, password, username, role } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hashing the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Creating a new user
    const user = new User({
      username,
      email,
      password: hashPassword,
      role,
    });
    
    await user.save();
    return res.json({ status: true, message: "User registered" });
  } catch (error) {
    return res.status(500).json({ status: false, message: "An error occurred", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    return res.json({
      status: true,
      message: "Login Successful",
      role: user.role,
      userId:user._id
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: "An error occurred", error: error.message });
  }


};
