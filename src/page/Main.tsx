import * as React from 'react';
import { useState, useRef } from 'react';
import '../App.css';
import Viewer from '../components/viewer/Viewer';
import ProgressBar from '../components/loader';
import FileLoader from '../components/fileloader';
import { SeriesProvider } from '../context/series/SeriesContext';
import { MenubarProvider } from '../context/menubar/MenubarContext';
import { StatusProvider } from '../context/status/StatusContext';
import { usePasscodeState } from '../context/code/CodeContext';
import { Navigate } from 'react-router-dom';

const Main = () => {
  const state = usePasscodeState();

  const fileRef = useRef<HTMLInputElement>(null);
  const folderRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  return (
    <>
      {state.isLog ? (
        <SeriesProvider>
          <StatusProvider>
            <MenubarProvider>
              <ProgressBar files={files} />
              <Viewer fileRef={fileRef} folderRef={folderRef} />
              <FileLoader
                fileRef={fileRef}
                folderRef={folderRef}
                files={files}
                setFiles={setFiles}
              />
            </MenubarProvider>
          </StatusProvider>
        </SeriesProvider>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Main;
