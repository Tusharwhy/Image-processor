import "./App.css";
import ImageControl from "./components/ImageControl";
import ImageUpload from "./components/ImageUpload";
import ImagePreview from "./components/ImagePreview";
import { ImageProcessingProvider } from "./context/ImageProcessingContext";

function App() {
  return (
    <>
      <ImageProcessingProvider>
        <div className="App h-screen w-screen flex flex-col items-center justify-start bg-gray-900">
          {/* Title */}
          <h1 className="text-3xl font-semibold text-white mt-8 mb-4">
            Tushar's Image Processing Application
          </h1>

          <div className="bg-[#1f2029] h-[80%] w-[85%] flex rounded-lg shadow-lg overflow-hidden">
            {/* Left Section - Image Preview */}
            <div className="h-full w-1/2 p-10 flex flex-col items-center justify-center border-r border-gray-700">
              <div className="bg-gray-800 h-[50%] w-[50%] flex items-center justify-center rounded-md shadow-inner">
                <ImagePreview />
              </div>
            </div>

            {/* Right Section - Image Controls */}
            <div className="h-full w-1/2 p-10 flex flex-col items-center justify-between">
              <div className="w-full">
                {/* Image Controls */}
                <div className="bg-[#2d2f3b] p-6 rounded-lg shadow-md">
                  <ImageControl />
                </div>
              </div>

              {/* Image Upload */}
              <div className="w-full">
                <div className="flex justify-center mt-4">
                  <div className="w-full bg-[#2d2f3b] p-6 rounded-lg shadow-md">
                    <ImageUpload />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ImageProcessingProvider>
    </>
  );
}

export default App;
