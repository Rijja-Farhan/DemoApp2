import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { response } from "express";




dotenv.config();





export const signup = async (req, res) => {
  try {
    const { email, password, username, role } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashPassword,
      role
    });
    await user.save();
    return res.status(201).json({ status: true, message: "Record registered" });
  } catch (error) {
    console.error("Signup Error:", error);
    return res
      .status(500)
      .json({ status: false, message: "An error occurred" });
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
      return res.status(401).json({ message: "Password is not valid" });
    }

    const token = jwt.sign({ userid: user._id.toString() }, process.env.PRIVATE_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    return res
      .status(200)
      .json({ status: true, message: "Login successful", id: user._id, role: user.role});
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "An error occurred during login" });
  }
}



export const logout = async (req, res) => {
  res.clearCookie("token"); 
  res.status(200).json({ message: "Logged out successfully" });
};

