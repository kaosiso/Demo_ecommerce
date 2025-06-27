import express from 'express'; // Use `express.Router()` not `router` package
import {  logIn, logOut } from '../controller/authApis/index.js'; // Use named import
import authMiddleware from '../middleware/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/login', logIn);
authRouter.post('/logout', authMiddleware, logOut);


export default authRouter;
