import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
  console.log("in middleware");
  const token = req.cookies.token; 
  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: 'Token is missing or invalid' });
  }
  jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
    if (err) {
      console.log("Token verification error:", err);
      return res.status(403).json({ message: 'Token is invalid or expired' });
    }
   
    req.user = user; 
    next();
  });
};
