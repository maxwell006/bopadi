const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const waitlistRoutes = require("./routes/waitlist");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected✅"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/waitlist", waitlistRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Bopadi Waitlist API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
