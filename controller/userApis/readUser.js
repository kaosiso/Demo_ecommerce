import User from '../../models/userSchema.js'


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


export const getUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


export const getByqueryParams = async (req, res) => {
  const { username, gmail, id } = req.query;
  const filter = {};

  if (username) filter.username = username;
  if (gmail) filter.gmail = gmail;
  if (id) filter._id = id; 

  try {
    const users = await User.find(filter).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
