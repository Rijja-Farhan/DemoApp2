import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
dotenv.config();
const connectionString = process.env.MONGO_URI;

import { AuthRoutes } from "./routes/Auth.js";
import { CourseRoutes } from "./routes/Course.js";
import { StudentRoutes } from "./routes/Student.js";

// Wrapping the server start in an async function
async function startServer() {
  try {
    // Await the connection inside this function
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");


  
    // Define the routes
    app.use("/auth", AuthRoutes);
    app.use("/course", CourseRoutes);
    app.use("/student", StudentRoutes); // dynamic routing
    

    // Sample routes
    app.get("/", (req, res) => {
      res.json({ message: "get request" });
    });

    app.get("/signup", (req, res) => {
      res.json({ message: "get request of sign up" });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

// Call the async function to start the server
startServer();
