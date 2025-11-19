require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;

// Basic required env checks
if (!process.env.MONGO_URI) {
  console.error("Missing required environment variable: MONGO_URI");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("Missing required environment variable: JWT_SECRET");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Sample route
app.get("/", (req, res) => {
  res.json({ message: "Server running with Express, CORS, and dotenv!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
