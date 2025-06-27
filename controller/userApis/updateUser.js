import User from '../../models/userSchema.js';

// Edit basic user fields (e.g., username, gmail)
export const editUser = async (req, res) => {
  try {
    const { id } = req.params; // ID from the route
    const reqId = req.user._id; // ID from the authenticated user (JWT)

    if (id.toString() !== reqId.toString()) {
      return res.status(401).json({ message: "You are not authorized to edit this user" });
    }

    const { username, gmail } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { username, gmail } },
      { new: true }
    );

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        gmail: updatedUser.gmail,
        profile: updatedUser.profile
      }
    });
  } catch (error) {
    console.error("Edit user error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Edit nested profile fields
export const editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const reqId = req.user._id;

    if (id.toString() !== reqId.toString()) {
      return res.status(401).json({ message: "You are not authorized to edit this profile" });
    }

    const { country, number, street, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          'profile.country': country,
          'profile.number': number,
          'profile.street': street,
          'profile.bio': bio
        }
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedUser.profile
    });
  } catch (error) {
    console.error("Edit profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
