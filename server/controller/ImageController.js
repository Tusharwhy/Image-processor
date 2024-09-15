const { processImage } = require("../service/ImageService");

/*
   setting up our controller for image processing.
   - First we'll check if the image we recieved are in jpeg and png format.
  - Then we can provide the image details to our sharp.
*/

const processImageHandler = async (req, res) => {
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
};

module.exports = { processImageHandler };
