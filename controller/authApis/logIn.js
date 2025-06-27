import User from '../../models/userSchema.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../../jwt/genTokenandsetCookies.js'; // Make sure this exists

export const logIn = async (req, res) => {
  const { gmail, password } = req.body;

  if (!gmail || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const user = await User.findOne({ gmail });
    if (!user) {
      return res.status(400).json({ message: "User not found. Please register first." });
    }

    const compared = await bcrypt.compare(password, user.password);
    if (!compared) {
      return res.status(401).json({ message: "Gmail or password is incorrect" });
    }

    // Set JWT token as cookie
    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        gmail: user.gmail,
        profile: user.profile
      }
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
