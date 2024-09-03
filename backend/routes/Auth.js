import express from 'express';
import {signup,login,logout} from '../Controllers/AuthControllers.js'
import {authenticateToken}  from "../middleware/Auth.js"

const AuthRoutes = express.Router();


AuthRoutes.post('/signup',signup)
AuthRoutes.post('/login',login)
AuthRoutes.post('/logout',logout)


export{AuthRoutes}