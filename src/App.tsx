import * as React from "react";
import { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Viewer from "./components/viewer/Viewer";
import ProgressBar from "./components/loader";
import Header from "./components/header";
const App: React.FC = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (fileRef.current !== null) {
      console.log(fileRef)
      fileRef.current.setAttribute("directory", "");
      fileRef.current.setAttribute("webkitdirectory", "");
    }
  }, [fileRef]);

  function handleOpenFolder(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
    if (e.target.files) {
      const folder = e.target.files;

      console.log(folder[0].webkitRelativePath.split("/")[0]);

      let tmp_files = [];
      for (let i = 0; i < folder.length; i++) {
        tmp_files.push(folder[i]);
      }

      setFiles(tmp_files);
    }
  }

  return (
    <div>
      <ProgressBar files={files} />
      <Header useRef={fileRef}/>
      <Viewer />

      <div style={{display: 'none'}}>

      <input ref={fileRef} type="file" onChange={handleOpenFolder} />
      </div>
    </div>
  );
};

export default App;
