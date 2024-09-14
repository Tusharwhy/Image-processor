import "./App.css";
import ImageControl from "./components/ImageControl";
import ImageUpload from "./components/ImageUpload";
import ImagePreview from "./components/ImagePreview";
import { ImageProcessingProvider } from "./context/ImageProcessingContext";

function App() {
  return (
    <>
      <ImageProcessingProvider>
        <div className="App h-screen w-screen  flex justify-center items-center">
          <div className="bg-slate-200  h-[80%] w-[80%] flex">
            <div className=" h-full w-1/2  p-10  ">
              <div className=" flex  justify-center">
                <h3 className="font-medium text-2xl">Upload image</h3>
              </div>
              <div className="mt-8 flex-col"></div>
              <ImageUpload />
              <ImageControl />
            </div>
            <div className=" h-full w-1/2  p-10  ">
              <div className=" flex  justify-center">
                <h3 className="font-medium text-2xl">Image preview</h3>
              </div>
              <div className="mt-8 h-[40%] w-[40%] flex justify-center ">
                <ImagePreview />
              </div>
            </div>
          </div>
        </div>
      </ImageProcessingProvider>
    </>
  );
}

export default App;
