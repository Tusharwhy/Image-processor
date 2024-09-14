import React, { useEffect, useState } from "react";
import { useImageProcessing } from "../context/ImageProcessingContext";
import axios from "axios";

const ImagePreview: React.FC = () => {
  const { image, brightness, contrast, saturation, rotation, outputFormat } =
    useImageProcessing();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [finalUrl, setFinalUrl] = useState<string | null>(null);

  useEffect(() => {
    const updatePreview = async () => {
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("brightness", brightness.toString());
        formData.append("contrast", contrast.toString());
        formData.append("saturation", saturation.toString());
        formData.append("rotation", rotation.toString());
        formData.append("outputFormat", outputFormat);
        formData.append("preview", "true");

        try {
          const response = await axios.post(
            "http://localhost:5000/process-image",
            formData,
            {
              responseType: "blob",
            }
          );
          const url = URL.createObjectURL(response.data);
          setPreviewUrl(url);
        } catch (error) {
          console.error("Error updating preview:", error);
        }
      }
    };

    const debounce = setTimeout(() => {
      updatePreview();
    }, 200);

    return () => clearTimeout(debounce);
  }, [image, brightness, contrast, saturation, rotation, outputFormat]);

  const processFinalImage = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("brightness", brightness.toString());
      formData.append("contrast", contrast.toString());
      formData.append("saturation", saturation.toString());
      formData.append("rotation", rotation.toString());
      formData.append("outputFormat", outputFormat);
      formData.append("preview", "false");

      try {
        const response = await axios.post(
          "http://localhost:5000/process-image",
          formData,
          {
            responseType: "blob",
          }
        );
        const url = URL.createObjectURL(response.data);
        setFinalUrl(url);
      } catch (error) {
        console.error("Error processing final image:", error);
      }
    }
  };

  if (!previewUrl) {
    return <div>No image uploaded</div>;
  }

  return (
    <div>
      <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%" }} />
      <button onClick={processFinalImage}>Process Final Image</button>
      {finalUrl && (
        <a href={finalUrl} download={`processed_image.${outputFormat}`}>
          Download Processed Image
        </a>
      )}
    </div>
  );
};

export default ImagePreview;
