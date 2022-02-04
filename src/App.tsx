import * as React from "react";
import { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Viewer from "./components/viewer/Viewer";
import ProgressBar from "./components/loader";
import FileLoader from "./components/fileloader";

const App: React.FC = () => {
  // File Loader
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div>
      <ProgressBar files={files} />
      <Viewer fileRef={fileRef} />
      <FileLoader fileRef={fileRef} files={files} setFiles={setFiles} />
    </div>
  );
};

export default App;
