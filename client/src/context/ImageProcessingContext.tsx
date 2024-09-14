import React, { createContext, useState, useContext, ReactNode } from "react";

interface ImageProcessingContextType {
  image: File | null;
  setImage: (file: File | null) => void;
  brightness: number;
  setBrightness: (value: number) => void;
  contrast: number;
  setContrast: (value: number) => void;
  saturation: number;
  setSaturation: (value: number) => void;
  rotation: number;
  setRotation: (value: number) => void;
  outputFormat: "png" | "jpeg";
  setOutputFormat: (format: "png" | "jpeg") => void;
}

const ImageProcessingContext = createContext<
  ImageProcessingContextType | undefined
>(undefined);

interface ImageProcessingProviderProps {
  children: ReactNode;
}

export const ImageProcessingProvider: React.FC<
  ImageProcessingProviderProps
> = ({ children }) => {
  const [image, setImage] = useState<File | null>(null);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [outputFormat, setOutputFormat] = useState<"png" | "jpeg">("png");

  return (
    <ImageProcessingContext.Provider
      value={{
        image,
        setImage,
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
      }}
    >
      {children}
    </ImageProcessingContext.Provider>
  );
};

export const useImageProcessing = () => {
  const context = useContext(ImageProcessingContext);
  if (context === undefined) {
    throw new Error(
      "useImageProcessing must be used within a ImageProcessingProvider"
    );
  }
  return context;
};
