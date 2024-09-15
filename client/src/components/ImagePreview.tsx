import React, { useEffect, useState } from "react";
import { useImageProcessing } from "../context/ImageProcessingContext";
import axios from "axios";

const ImagePreview: React.FC = () => {
  const { image, brightness, contrast, saturation, rotation, outputFormat } =
    useImageProcessing();
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (image) {
      createPreviewImage(image);
    }
  }, [image]);

  const createPreviewImage = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const MAX_WIDTH = 800; // Max width for the preview image
        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const previewFile = new File([blob], "preview.jpg", {
                type: "image/jpeg",
              });
              setPreviewImage(previewFile);
            }
          },
          "image/jpeg",
          0.7
        ); // Adjust quality as needed
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const updatePreview = async () => {
      if (previewImage) {
        const formData = new FormData();
        formData.append("image", previewImage);
        formData.append("brightness", brightness.toString());
        formData.append("contrast", contrast.toString());
        formData.append("saturation", saturation.toString());
        formData.append("rotation", rotation.toString());
        formData.append("outputFormat", outputFormat);

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
  }, [previewImage, brightness, contrast, saturation, rotation, outputFormat]);

  const processAndDownloadImage = async () => {
    if (image) {
      setIsProcessing(true);
      const formData = new FormData();
      formData.append("image", image); // Use the original high-quality image
      formData.append("brightness", brightness.toString());
      formData.append("contrast", contrast.toString());
      formData.append("saturation", saturation.toString());
      formData.append("rotation", rotation.toString());
      formData.append("outputFormat", outputFormat);

      try {
        const response = await axios.post(
          "http://localhost:5000/process-image",
          formData,
          {
            responseType: "blob",
          }
        );
        const url = URL.createObjectURL(response.data);
        const a = document.createElement("a");
        a.href = url;
        a.download = `processed_image.${outputFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error processing final image:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  if (!previewUrl) {
    return <div>No image uploaded</div>;
  }

  return (
    <div>
      <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%" }} />
      <button onClick={processAndDownloadImage} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Process and Download Image"}
      </button>
    </div>
  );
};

export default ImagePreview;
