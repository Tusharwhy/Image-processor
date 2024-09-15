const express = require("express");
const cors = require("cors");
const imageRoutes = require("./route/ImageRoute");

const app = express();

app.use(cors());
app.use(express.json());

// Testing route for server
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server welcomes you 🙏" });
});

// Use image routes
app.use("/api", imageRoutes);

module.exports = app;
