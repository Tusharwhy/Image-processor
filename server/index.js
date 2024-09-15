//we import our dependecies first
const express = require("express");
const sharp = require("sharp");
const cors = require("cors");
const multer = require("multer");

//setting up multer for temporarily storing files
const upload = multer({ storage: multer.memoryStorage() });
const app = express();

app.use(cors());
app.use(express.json());

//first route to check if our server is working
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server welcomes you 🙏" });
});

/*
  separating processing logic from main api to a function.
  The following function accepts requestbody parameters like
   -  brightness, contrast, rotation etc.   
   - Our buffer has image which needs to be processed.
 */

const processImage = async (buffer, params) => {
  const {
    brightness,
    contrast,
    saturation,
    rotation,
    outputFormat = "png",
  } = params;

  // According to sharp documentation gamma value should be between 1.0 - 3.0
  let gammaValue = 1.0 + (parseFloat(contrast) / 100) * 2.0;
  gammaValue = Math.max(1.0, Math.min(gammaValue, 3.0));

  // On the client side i have scale with negative as well as positive values.
  // So w have to Convert -100 - 100 range to 0 to 2 range.
  let processedImage = sharp(buffer)
    .rotate(parseInt(rotation))
    .modulate({
      brightness: (parseFloat(brightness) + 100) / 100,
      saturation: (parseFloat(saturation) + 100) / 100,
    })
    .gamma(gammaValue);

  if (outputFormat === "jpeg") {
    processedImage = processedImage.jpeg({ quality: 90, progressive: true });
  } else {
    processedImage = processedImage.png({
      compressionLevel: 6,
      progressive: true,
    });
  }

  return processedImage.toBuffer();
};

/*
   setting up our api for image processing.
   - First we'll check if the image we recieved are in jpeg and png format.
  - Then we can provide the image details to our sharp.
*/

app.post("/process-image", upload.single("image"), async (req, res) => {
  const AcceptedImageTypes = ["image/jpeg", "image/png"];

  if (!req.file || !AcceptedImageTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      error: req.file
        ? "Invalid file type. Only JPEG and PNG are allowed."
        : "No image file uploaded",
    });
  }

  try {
    const buffer = await processImage(req.file.buffer, req.body);

    res.set("Content-Type", `image/${req.body.outputFormat || "png"}`);
    res.send(buffer);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Error processing image" });
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
