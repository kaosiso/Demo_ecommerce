import bcrypt from 'bcryptjs';
import User from '../../models/userSchema.js';
import generateTokenAndSetCookie from '../../jwt/genTokenandsetCookies.js';

export const createUser = async (req, res) => {
  try {
    const { username, gmail, password, profile } = req.body;

    if (!username || !gmail || !password || !profile) {
      return res.status(400).json({ message: "Please provide all required fields, including profile" });
    }

    const { country, Number, Street, Bio } = profile;
    if (!country || !Number || !Street || !Bio) {
      return res.status(400).json({ message: "Incomplete profile information" });
    }

    const userExists = await User.findOne({ gmail });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      gmail,
      password: hashedPassword,
      profile: {
        country,
        Number,
        Street,
        Bio
      }
    });

    // Set JWT cookie here
    generateTokenAndSetCookie(res, newUser._id);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        _id: newUser._id,
        username: newUser.username,
        gmail: newUser.gmail,
        profile: newUser.profile
      }
    });
  } catch (error) {
    console.error("Error in createUser:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
