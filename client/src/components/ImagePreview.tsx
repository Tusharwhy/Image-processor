import React, { useEffect, useState } from "react";
import { useImageProcessing } from "../context/ImageProcessingContext";

const ImagePreview: React.FC = () => {
  const { image, brightness, contrast, saturation, rotation } =
    useImageProcessing();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      // Send image and processing parameters to backend
      // Update previewUrl with the response
      // This is a placeholder and needs to be implemented
      setPreviewUrl(URL.createObjectURL(image));
    }
  }, [image, brightness, contrast, saturation, rotation]);

  if (!previewUrl) {
    return <div>No image uploaded</div>;
  }

  return <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%" }} />;
};

export default ImagePreview;
