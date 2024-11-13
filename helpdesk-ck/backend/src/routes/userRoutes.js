const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  updateUserRole,
  addUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", authMiddleware, getAllUsers);

// Route for user profile
router.get("/profile", authMiddleware, getUserProfile);

// Route for updating user profile
router.patch("/profile", authMiddleware, updateUserProfile);

// Route for updating user role
router.put("/role/:id", authMiddleware, updateUserRole);

// Route for adding a new user
router.put("/", authMiddleware, addUser);

// Route for deleting a user
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
