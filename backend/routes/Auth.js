import express from 'express';
import {signup,login} from '../Controllers/AuthControllers.js'


const AuthRoutes = express.Router();


AuthRoutes.post('/signup',signup)
AuthRoutes.post('/login',login)

export{AuthRoutes}