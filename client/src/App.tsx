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
              <div className=" h-[60%] w-[60%] flex justify-center ">
                <ImagePreview />
              </div>
            </div>
            <div className=" h-full w-1/2  p-10  ">
              <div className=" flex  justify-center">
                <div className="mt-8 flex-col">
                  <ImageUpload />
                  <ImageControl />
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
