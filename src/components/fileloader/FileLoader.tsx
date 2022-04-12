import React, { useEffect } from 'react';
import { useSeriesDispatch } from '../../context/series/SeriesContext';
import { useStatusDispatch } from '../../context/status/StatusContext';
import { useAppDispatch } from '../../redux/hooks';
import { reset } from '../../redux/reducers/imageSlice';

interface FileLoaderInterface {
  fileRef: React.RefObject<HTMLInputElement>;
  folderRef: React.RefObject<HTMLInputElement>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const FileLoader: React.FC<FileLoaderInterface> = ({
  fileRef,
  folderRef,

  setFiles,
}) => {
  useEffect(() => {
    if (folderRef.current !== null) {
      folderRef.current.setAttribute('directory', '');
      folderRef.current.setAttribute('webkitdirectory', '');
    }
  }, [folderRef]);

  const seriesDispatch = useSeriesDispatch();
  const statusDispatch = useStatusDispatch();
  const imageDispatch = useAppDispatch();

  function handleOpenFileFolder(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      // 하나도 선택되지 않는다면, file들을 변경시키지 않는다.
      if (e.target.files.length > 0) {
        // RESET ?
        seriesDispatch({
          type: 'RESET_SERIES',
        });
        imageDispatch(reset());
        statusDispatch({ type: 'NEXT' });

        const folder = e.target.files;

        const tmp_files = [];
        for (let i = 0; i < folder.length; i++) {
          const filename = folder[i].name;
          const fileSplitter = filename.split('.');
          const fileFormat = fileSplitter[fileSplitter.length - 1]
            ? fileSplitter[fileSplitter.length - 1].toLowerCase()
            : '';

          // console.log(e.target.files)
          if (fileFormat === 'dcm' || fileSplitter.length === 1) {
            tmp_files.push(folder[i]);
          }
        }

        setFiles(tmp_files);
      } else {
        console.log('cancel');
      }
    }
  }

  return (
    <div style={{ display: 'none' }}>
      <input
        ref={fileRef}
        onChange={handleOpenFileFolder}
        type="file"
        id="file_directory"
        name="file_directory"
        multiple
      />
      <input
        ref={folderRef}
        onChange={handleOpenFileFolder}
        type="file"
        id="folder_directory"
        name="folder_directory"
      />
    </div>
  );
};

export default FileLoader;
