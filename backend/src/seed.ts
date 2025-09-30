import mongoose from "mongoose";
import argon2 from "argon2";
import { User } from "./models/User.js";

const MONGO_URI = "mongodb+srv://task-management-assignment:UOMID8p98UtM3APJ@hexaonline.yjaj9ln.mongodb.net/task-management-assignment?retryWrites=true&w=majority&appName=hexaOnline";

async function seedUser() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const passwordHash = await argon2.hash("password123");

    const admin = await User.create({
      email: "admin@example.com",
      password: passwordHash,
      role: "ADMIN",
    });

    console.log("✅ Seeded user:", admin.email);

  } catch (err) {
    console.error("❌ Error seeding user:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

seedUser();
