import * as React from "react";
import { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Viewer from "./components/viewer/Viewer";
import ProgressBar from "./components/loader";
import FileLoader from "./components/fileloader";
import { SeriesProvider } from "./context/series/SeriesContext";

const App: React.FC = () => {
  // File Loader
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <SeriesProvider>
      <ProgressBar files={files} />
      <Viewer fileRef={fileRef} />
      <FileLoader fileRef={fileRef} files={files} setFiles={setFiles} />
    </SeriesProvider>
  );
};

export default App;
