import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUser,
  getByqueryParams,
  editUser,
  editProfile,
  deleteUser
} from '../controller/userApis/index.js';

import authMiddleware from '../middleware/auth.middleware.js';

const userRouter = Router();

// Optional: extract this later into adminMiddleware.js
const adminCheck = async (req, res, next) => { 
  const user = req.user;
  if (user?.Admin) {
    return next();
  }
  res.status(401).json({ message: "You are not authorized to access this route" });
};

// Routes
userRouter
  // Create user
  .post('/user/create', createUser)

  // Read users
  .get('/users', authMiddleware, getAllUsers)
  .get('/user/:id', getUser)
  .get('/usersbyquery', getByqueryParams)

  // Update user
  .put('/user/update/:id', authMiddleware, editUser)
  .put('/profile/update/:id', authMiddleware, editProfile)
 
  // Delete user
  .delete('/user/delete/:id', authMiddleware, deleteUser);

export default userRouter;
