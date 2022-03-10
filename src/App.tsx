import * as React from "react";
import { useState, useRef } from "react";
import "./App.css";
import Viewer from "./components/viewer/Viewer";
import ProgressBar from "./components/loader";
import FileLoader from "./components/fileloader";
import { SeriesProvider } from "./context/series/SeriesContext";
import { MenubarProvider } from "./context/menubar/MenubarContext";

const App: React.FC = () => {
  // File Loader
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <SeriesProvider>
      <ProgressBar files={files} />
      <MenubarProvider>
        <Viewer fileRef={fileRef} />
      </MenubarProvider>
      <FileLoader fileRef={fileRef} files={files} setFiles={setFiles} />
    </SeriesProvider>
  );
};

export default App;
