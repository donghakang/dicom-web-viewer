import React from 'react';
import { GridLoader } from 'react-spinners';
import * as Styled from './style';
import { theme } from '../../assets/styles/theme';
import { BsFileEarmark, BsFolder2 } from 'react-icons/bs';

const StartViewer: React.FC<{
  fileRef: React.RefObject<HTMLInputElement>;
  folderRef: React.RefObject<HTMLInputElement>;
}> = ({ fileRef, folderRef }) => {
  function handleFileLoadClick() {
    if (fileRef.current !== null) {
      fileRef.current.click();
    }
  }
  function handleFolderLoadClick() {
    if (folderRef.current !== null) {
      folderRef.current.click();
    }
  }

  return (
    <Styled.StartViewer>
      <div className="container">
        <div className={'grid-loader'}>
          <GridLoader size={15} margin={2} color={theme.color.primary} />
        </div>
        <div className={'loader-text'}>
          <h1>
            Welcome to <span>DICOM</span> Viewer
          </h1>
          <span>The most simple DICOM Web viewer. Click buttons to start</span>
        </div>
        <div className="button-container">
          <button onClick={handleFileLoadClick}>
            <span>Open files</span>
            <BsFileEarmark size={20} />
          </button>
          <button onClick={handleFolderLoadClick}>
            <span>Open Folder</span>
            <BsFolder2 size={20} />
          </button>
        </div>
      </div>
    </Styled.StartViewer>
  );
};

export default StartViewer;
