import express from 'express';
import {signup,login,logout} from '../Controllers/AuthControllers.js'


const AuthRoutes = express.Router();


AuthRoutes.post('/signup',signup)
AuthRoutes.post('/login',login)
AuthRoutes.post('/logout',logout)


export{AuthRoutes}