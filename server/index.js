const express = require("express");
const sharp = require("sharp");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server welcomes you 🙏" });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server runing on ${port}`);
});
