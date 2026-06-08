import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "./config/db.js";
import User from "./models/user.model.js";

dotenv.config();

const ADMIN_EMAIL = "chirag@thesocial99.com";
const ADMIN_PASSWORD = "Chirag@Social99";
const ADMIN_NAME = "Chirag";

const run = async () => {
  await connectDB();
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 12);

  const admin = await User.findOneAndUpdate(
    { email: ADMIN_EMAIL },
    {
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashed,
      role: "admin",
      isVerified: true,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log("✅ Admin ready:");
  console.log("   email:   ", admin.email);
  console.log("   password:", ADMIN_PASSWORD);
  console.log("   role:    ", admin.role);
  process.exit(0);
};

run();
