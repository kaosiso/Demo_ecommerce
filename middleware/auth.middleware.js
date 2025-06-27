import jwt from 'jsonwebtoken';
import User from "../models/userSchema.js";

const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies?.token;
  const jwtSecret = process.env.JWT_SECRET;

  if (!accessToken) {
    return res.status(401).json({ message: 'Please login first' });
  }

  try {
    const decoded = jwt.verify(accessToken, jwtSecret);

    const verifiedUser = await User.findById(decoded.userId).select('-password');
    if (!verifiedUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
};

export default authMiddleware;
