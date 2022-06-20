import React, { useEffect, useState } from 'react';
import { setImages } from '../../redux/reducers/imageSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import * as Styled from './style';
import { useSeriesDispatch } from '../../context/series/SeriesContext';

import {
  dicomDatasetToCornerstone,
  generateDicomData,
  generateImageId,
  loadFile,
} from '../helper/dicomFileReader';
import { useSideMenuDispatch } from '../../context/menubar/MenubarContext';


interface ProgressInterface {
  files: File[];
}

const ProgressBar: React.FC<ProgressInterface> = ({ files }) => {
  const [progress, setProgress] = useState<number>(0);
  const step = 100 / files.length;
  const dispatch = useAppDispatch();
  const seriesDispatch = useSeriesDispatch();
  const menubarDispatch = useSideMenuDispatch();

  async function loadWADOImages(files: File[]) {
    const dicomImages: any[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageId = generateImageId(file);
      const image = await loadFile(imageId);
      const dataset = generateDicomData(image);

      const dicomInfo = dicomDatasetToCornerstone(imageId, dataset);

      dicomImages.push(dicomInfo);
      setProgress((prev) => prev + step);
    }

    if (dicomImages.length !== 0) {
      menubarDispatch({ type: 'LEFT_OPEN' });
      menubarDispatch({ type: 'RIGHT_OPEN' });
    }

    dicomImages.sort((l, r) => {
      return l.instanceNumber - r.instanceNumber;
    });

    const sortByPatientIDSeriesID = [] as {
      id: number;
      patient_id: string;
      series_id: string;
      isImage: boolean;
      data: any[];
    }[];

    dicomImages.map((dcm) => {
      if (dcm.meta.PixelData === undefined) {
        // 이미지 데이터가  없을시
        const imageData = {
          id: sortByPatientIDSeriesID.length,
          patient_id: dcm.meta.PatientID,
          series_id: dcm.meta.SeriesInstanceUID,
          isImage: false,
          data: [dcm],
        };
        sortByPatientIDSeriesID.push(imageData);
      } else {
        if (
          sortByPatientIDSeriesID.some(
            (x) =>
              x.patient_id === dcm.meta.PatientID &&
              x.series_id === dcm.meta.SeriesInstanceUID
          )
        ) {
          // 이미 데이터에 있으면 data array에 넣는다.
          sortByPatientIDSeriesID
            .find(
              (sorted) =>
                sorted.patient_id === dcm.meta.PatientID &&
                sorted.series_id === dcm.meta.SeriesInstanceUID
            )
            ?.data.push(dcm);
        } else {
          // 새로운 데이터면 image 데이터에 추가한다.
          const imageData = {
            id: sortByPatientIDSeriesID.length,
            patient_id: dcm.meta.PatientID,
            series_id: dcm.meta.SeriesInstanceUID,
            isImage: true,
            data: [dcm],
          };
          sortByPatientIDSeriesID.push(imageData);
        }
      }
    });

    // series sort
    // const allSeriesInfo = items
    //   .filter(
    //     (value, index, self) =>
    //       index ===
    //       self.findIndex(
    //         (t) => t.series.seriesNumber === value.series.seriesNumber
    //       )
    //   )
    //   .sort((a, b) => a.series.seriesNumber - b.series.seriesNumber);

    // const currentSeries =
    //   allSeriesInfo.length > 0 ? allSeriesInfo[0].series.seriesNumber : 0;
    // const seriesInfo = allSeriesInfo.map((series) => {
    //   return {
    //     isImage: true,
    //     seriesNumber: series.series.seriesNumber,
    //     seriesInstanceUID: series.series.seriesInstanceUID,
    //     seriesDescription: series.series.seriesDescription,
    //     countImages: items.filter(
    //       (item) =>
    //         item.series.seriesNumber === series.series.seriesNumber &&
    //         item.meta.PixelData !== undefined
    //     ).length,
    //   };
    // });

    // console.log('🧪', seriesInfo, items);
    // NonImageItems.map((nonImage) => {
    //   console.log(nonImage);
    //   seriesInfo.unshift({
    //     isImage: false,
    //     seriesNumber: nonImage.series.seriesNumber,
    //     seriesInstanceUID: nonImage.series.seriesInstanceUID,
    //     seriesDescription: nonImage.series.seriesDescription,
    //     countImages: NonImageItems.length,
    //   });
    // });

    dispatch(setImages(sortByPatientIDSeriesID));

    seriesDispatch({
      type: 'SET_CURRENT_SERIES',
      currentSeries: 0,
    });
    setProgress(0);
  }

  useEffect(() => {
    loadWADOImages(files);
  }, [files]);

  return <Styled.ProgressBar progress={progress}></Styled.ProgressBar>;
};

export default ProgressBar;
