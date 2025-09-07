import express from "express";
import {
  logIn,
  logOut,
  requestResetPassword,
  resetPassword,
} from "../controller/auth/index.js";

import authMiddleware from "../middleware/auth.middleware.js";

const authRouter = express.Router();

// Login / Logout
authRouter.post("/login", logIn);
authRouter.post("/logout", authMiddleware, logOut);

// Password reset
authRouter.post("/password/forgot", requestResetPassword); // send reset email
authRouter.post("/password/reset/:token", resetPassword); // reset with token

export default authRouter;
