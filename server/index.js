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
  setting up or api for image processing.
  - First we'll check if the image we recieved are in '
    jpeg and png format.
  - Then we can provide the image details to 
    our sharp.

*/
app.post("/process-image", upload.single("image"), async (req, res) => {
  const AcceptedImageTypes = ["image/jpeg", "image/png"];

  //
  if (!req.file || !AcceptedImageTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      error: req.file
        ? "Invalid file type. Only JPEG and PNG are allowed."
        : "No image file uploaded",
    });
  }

  const {
    brightness,
    contrast,
    saturation,
    rotation,
    outputFormat = "png",
  } = req.body;

  try {
    // According to sharp documentation gamma value should be between 1.0 - 3.0
    let gammaValue = 1.0 + (parseFloat(contrast) / 100) * 2.0;
    gammaValue = Math.max(1.0, Math.min(gammaValue, 3.0));

    // On the client side i have scale with negative as well as positive values
    // So w have to Convert -100 to 100 range to 0 to 2 range
    let processedImage = sharp(req.file.buffer)
      .rotate(parseInt(rotation))
      .modulate({
        brightness: (parseFloat(brightness) + 100) / 100,
        saturation: (parseFloat(saturation) + 100) / 100,
      })
      .gamma(gammaValue);

    //setting up outvalue accordingly
    if (outputFormat === "jpeg") {
      processedImage = processedImage.jpeg({ quality: 50 });
    } else {
      processedImage = processedImage.png();
    }

    const buffer = await processedImage.toBuffer();

    res.set("Content-Type", `image/${outputFormat}`);
    res.send(buffer);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Error processing image" });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server runing on ${port}`);
});
