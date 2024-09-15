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
    <>
      <div className="space-y-6 bg-[#252a41] p-6 rounded-lg shadow-md">
        {/* Brightness Control */}
        <div className="flex items-center space-x-4">
          <label className="text-[#acb1cc] font-medium w-32">Brightness:</label>
          <input
            type="range"
            min="-100"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-[#acb1cc] font-medium w-12 text-right">
            {brightness}
          </span>
        </div>
        {/* Contrast Control */}
        <div className="flex items-center space-x-4">
          <label className="text-[#acb1cc] font-medium w-32">Contrast:</label>
          <input
            type="range"
            min="-100"
            max="100"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-[#acb1cc] font-medium w-12 text-right">
            {contrast}
          </span>
        </div>
        {/* Saturation Control */}
        <div className="flex items-center space-x-4">
          <label className="text-[#acb1cc] font-medium w-32">Saturation:</label>
          <input
            type="range"
            min="-100"
            max="100"
            value={saturation}
            onChange={(e) => setSaturation(Number(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-[#acb1cc] font-medium w-12 text-right">
            {saturation}
          </span>
        </div>
        {/* Rotation Control */}
        <div className="flex items-center space-x-4">
          <label className="text-[#acb1cc] font-medium w-32">Rotation:</label>
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-[#acb1cc] font-medium w-12 text-right">
            {rotation}°
          </span>
        </div>
        {/* Output Format Control */}
        <div className="flex items-center space-x-4">
          <label className="text-[#acb1cc] font-medium w-32">Format:</label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as "png" | "jpeg")}
            className="w-full py-2 px-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default ImageControl;
