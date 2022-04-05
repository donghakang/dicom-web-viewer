import * as React from "react";
import { useState, useRef } from "react";
import "./App.css";
import Viewer from "./components/viewer/Viewer";
import ProgressBar from "./components/loader";
import FileLoader from "./components/fileloader";
import { SeriesProvider } from "./context/series/SeriesContext";
import { MenubarProvider } from "./context/menubar/MenubarContext";
import { StatusProvider } from "./context/status/StatusContext";
import Viewport from "./components/viewport";
import initCornerstone from "./components/cornerstone/init";

const App: React.FC = () => {
  // File Loader
  initCornerstone();
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <SeriesProvider>
      <StatusProvider>
        <ProgressBar files={files} />
        <MenubarProvider>
          <Viewer fileRef={fileRef} />
        </MenubarProvider>
        <FileLoader fileRef={fileRef} files={files} setFiles={setFiles} />
      </StatusProvider>
    </SeriesProvider>
  );
};

export default App;
