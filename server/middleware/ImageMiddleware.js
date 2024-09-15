const multer = require("multer");

// Configure multer for temporary file storage
const upload = multer({ storage: multer.memoryStorage() });

module.exports = upload;
