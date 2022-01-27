import * as React from "react";
import { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import Viewer from "./components/Viewer";
import ProgressView from "./components/loader";
const App: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute("directory", "");
      ref.current.setAttribute("webkitdirectory", "");
    }
  }, [ref]);

  function handleOpenFolder(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
    if (e.target.files) {
      const folder = e.target.files;

      console.log(folder[0].webkitRelativePath.split("/")[0]);

      let tmp_files = []
      for (let i = 0; i < folder.length; i ++) {
        tmp_files.push(folder[i])
      };

      setFiles(tmp_files)
    }
  }


  return (
    <div className="App">
      <input ref={ref} type="file" onChange={handleOpenFolder} />
      <ProgressView files={files}/>
      <Viewer />
    </div>
  );
};

export default App;
