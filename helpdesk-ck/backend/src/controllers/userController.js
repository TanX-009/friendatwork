const Ticket = require("../models/Ticket");
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { id, name, email, role } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    if (req.user.role === "Admin") {
      user.role = role || user.role;
    }

    await user.save();

    const userObj = {
      name: user.name,
      email: user.email,
      id: user._id,
      role: user.role,
    };

    res.json({ message: "Profile updated successfully", user: userObj });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    user.role = role || user.role;
    await user.save();

    res.json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.addUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate role
  if (!["Agent", "Customer", "Admin"].includes(role)) {
    return res.status(400).json({
      message: 'Invalid role. Must be "Agent" or "Customer" or "Admin"',
    });
  }

  // Check if the user is an Admin
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username: email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  // Check if the user is an Admin
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // remove user
    await User.findByIdAndDelete(id);
    // remove all tickets related to user
    await Ticket.deleteMany({ customer: id });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
