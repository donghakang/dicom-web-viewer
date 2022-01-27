import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import ProgressView from './ProgressView';

function App() {
  const [files, setFiles] = useState([]);
  function handleOpenFolder(e) {
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
     <input directory="" webkitdirectory="" type="file" onChange={handleOpenFolder} />
      <ProgressView files={files}/>
    </div>
  );
}

export default App;
