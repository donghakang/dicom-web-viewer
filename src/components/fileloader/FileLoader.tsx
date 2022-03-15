import React, { useEffect } from "react";

interface FileLoaderInterface {
  fileRef: React.RefObject<HTMLInputElement>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const FileLoader: React.FC<FileLoaderInterface> = ({
  fileRef,
  files,
  setFiles,
}) => {
  useEffect(() => {
    if (fileRef.current !== null) {
      fileRef.current.setAttribute("directory", "");
      fileRef.current.setAttribute("webkitdirectory", "");
    }
  }, [fileRef]);

  function handleOpenFolder(e: React.ChangeEvent<HTMLInputElement>) {
    console.log('e!!!!', e)
    if (e.target.files) {
      console.log("e.target.files", e.target.files)
      // 하나도 선택되지 않는다면, file들을 변경시키지 않는다.
      if ( e.target.files.length > 0 ) {

        const folder = e.target.files;
        
        let tmp_files = [];
        for (let i = 0; i < folder.length; i++) {
          tmp_files.push(folder[i]);
        }
        
        setFiles(tmp_files);
      }
    }
  }

  return (
    <div style={{ display: "none" }}>
      <input ref={fileRef} type="file" onChange={handleOpenFolder} />
    </div>
  );
};

export default FileLoader;
