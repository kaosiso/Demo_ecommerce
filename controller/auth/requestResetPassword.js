import crypto from "crypto";
import User from "../../models/userSchema.js";
import { sendEmail } from "../../utils/nodemailer.js";

export const requestResetPassword = async (req, res) => {
  const { gmail } = req.body;

  if (!gmail)
    return res.status(400).json({ message: "Please provide your email" });

  try {
    const user = await User.findOne({ gmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    // Create reset URL
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/auth/reset-password/${resetToken}`;

    // Send email
    const message = `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password. This link expires in 15 minutes.</p>
      <a href="${resetURL}">Reset Password</a>
    `;

    await sendEmail({
      to: user.gmail,
      subject: "Password Reset Request",
      html: message,
    });

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
