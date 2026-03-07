import mongoose from "mongoose";
import app from "./app.js";

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/taskmanager";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    if (process.env.NODE_ENV !== "test") {
      const port = process.env.PORT || 5000;
      app.listen(port, () => console.log(`Server running on port ${port}`));
    }
  })
  .catch((err) => console.error("MongoDB connection error:", err));