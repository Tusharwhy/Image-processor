const sharp = require("sharp");

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
module.exports = { processImage };
