import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting with:", process.env.MONGO_URI); // debug

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection error:");
    console.error(error.message); // 👈 show real reason
    process.exit(1);
  }
};

export default connectDB;