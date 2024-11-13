const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");

    // Check for existing admin user and create one if it doesn't exist
    const existingAdmin = await User.findOne({ role: "Admin" });
    if (!existingAdmin) {
      const adminUser = new User({
        name: "Admin",
        email: "admin@email.com",
        password: "admin",
        role: "Admin",
      });

      await adminUser.save();
      console.log("Default admin user created with email: " + adminUser.email);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
