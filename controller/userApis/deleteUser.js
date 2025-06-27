import User from '../../models/userSchema.js'

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { _id, admin } = req.user;

  // Authorization check: Only self or admin can delete
  if (id === _id || admin === true) {
    try {
      // Attempt to delete the user
      const deletedUser = await User.findByIdAndDelete(id);

      // Handle case where user does not exist
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Success
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // Unauthorized attempt
    return res.status(401).json({ message: 'You are not authorized to delete this user' });
  }
};
