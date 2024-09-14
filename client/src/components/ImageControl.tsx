import React from "react";
import { useImageProcessing } from "../context/ImageProcessingContext";

const ImageControl: React.FC = () => {
  const {
    brightness,
    setBrightness,
    contrast,
    setContrast,
    saturation,
    setSaturation,
    rotation,
    setRotation,
    outputFormat,
    setOutputFormat,
  } = useImageProcessing();

  return (
    <div>
      <div>
        <label>Brightness: {brightness}</label>
        <input
          type="range"
          min="-100"
          max="100"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Contrast: {contrast}</label>
        <input
          type="range"
          min="-100"
          max="100"
          value={contrast}
          onChange={(e) => setContrast(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Saturation: {saturation}</label>
        <input
          type="range"
          min="-100"
          max="100"
          value={saturation}
          onChange={(e) => setSaturation(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Rotation: {rotation}</label>
        <input
          type="range"
          min="0"
          max="360"
          value={rotation}
          onChange={(e) => setRotation(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Output Format: </label>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value as "png" | "jpeg")}
        >
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
        </select>
      </div>
    </div>
  );
};

export default ImageControl;
