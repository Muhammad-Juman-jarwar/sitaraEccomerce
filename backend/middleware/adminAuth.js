import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token has admin role (for hardcoded admin or db admin)
    if (decoded.role === "admin") {
      // For hardcoded admin (no id in token)
      if (!decoded.id) {
        req.user = { email: decoded.email, role: "admin" };
        return next();
      }

      // For database admin
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Invalid token." });
      }

      if (user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin only." });
      }

      req.user = user;
      return next();
    }

    return res.status(403).json({ message: "Access denied. Admin only." });
  } catch (error) {
    console.error("Admin auth error:", error);
    res.status(401).json({ message: "Invalid token." });
  }
};
