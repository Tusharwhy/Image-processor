import React from "react";
import { useImageProcessing } from "../context/ImageProcessingContext";

const ImageUpload: React.FC = () => {
  const { setImage } = useImageProcessing();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default ImageUpload;
