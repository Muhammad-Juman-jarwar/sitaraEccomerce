// Run this script to create an admin user in your MongoDB database
// Usage: node createAdmin.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Admin credentials
    const adminEmail = "admin@example.com";
    const adminPassword = "Admin123!";
    const adminName = "Admin User";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("⚠️  Admin user already exists with email:", adminEmail);

      // Update existing user to admin
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.log("✅ Updated existing user to admin role");
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      // Create admin user
      const adminUser = new User({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        phone: "1234567890",
        role: "admin",
      });

      await adminUser.save();
      console.log("✅ Admin user created successfully!");
    }

    console.log("\n📋 Admin Credentials:");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);
    console.log("\n🔗 Login at: http://localhost:5173/login");
    console.log("🔗 Admin Panel: http://localhost:5173/admin");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
