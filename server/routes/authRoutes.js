import express from 'express'
import { login, logout, register,getMe } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

export const authRoutes=express.Router();


authRoutes.post('/login',login);
authRoutes.post('/register',register);
authRoutes.post('/logout',isAuthenticated,logout);
authRoutes.get('/me',isAuthenticated,getMe);