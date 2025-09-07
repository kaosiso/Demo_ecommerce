import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  getByqueryParams,
  editUser,
  editProfile,
  deleteUser,
} from "../controller/userApis/index.js";

import authMiddleware from "../middleware/auth.middleware.js";

const userRouter = Router();

// Public route
userRouter.post("/user/create", createUser);

// Admin-only route
userRouter.get("/users", authMiddleware("admin"), getAllUsers);

// Logged-in users
userRouter.get("/usersbyquery", authMiddleware(), getByqueryParams);
userRouter.get("/user/:id", authMiddleware(), getUser);

// Update/Delete routes: only user themselves or admin
userRouter.put(
  "/user/update/:id",
  authMiddleware(),
  async (req, res, next) => {
    if (req.user.admin || req.user._id.toString() === req.params.id)
      return next();
    res.status(403).json({ message: "You are not authorized" });
  },
  editUser
);

userRouter.put(
  "/profile/update/:id",
  authMiddleware(),
  async (req, res, next) => {
    if (req.user.admin || req.user._id.toString() === req.params.id)
      return next();
    res.status(403).json({ message: "You are not authorized" });
  },
  editProfile
);

userRouter.delete(
  "/user/delete/:id",
  authMiddleware(),
  async (req, res, next) => {
    if (req.user.admin || req.user._id.toString() === req.params.id)
      return next();
    res.status(403).json({ message: "You are not authorized" });
  },
  deleteUser
);

export default userRouter;
