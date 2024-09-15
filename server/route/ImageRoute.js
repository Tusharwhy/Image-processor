const express = require("express");
const { processImageHandler } = require("../controller/ImageController");
const upload = require("../middleware/ImageMiddleware");

const router = express.Router();

router.post("/process-image", upload.single("image"), processImageHandler);

module.exports = router;
