import React, { useEffect, useState } from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import {
  getDicomPatientName,
  getDicomStudyId,
  getDicomStudyDate,
  getDicomStudyTime,
  getDicomStudyDescription,
  getDicomSeriesDate,
  getDicomSeriesTime,
  getDicomSeriesDescription,
  getDicomSeriesNumber,
  getDicomInstanceNumber,
  getDicomSliceDistance,
  getDicomEchoNumber,
  getDicomSliceLocation,
  getDicomColumns,
  getDicomRows,
  dicomDateTimeToLocale,
} from "../helper/dicom_reader";
import { setImages } from "../../redux/reducers/imageSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as Styled from "./style";
import { convertToFalseColorImage } from "cornerstone-core";
import { useSeriesDispatch } from "../../context/series/SeriesContext";

interface ProgressInterface {
  files: File[];
}

const ProgressBar: React.FC<ProgressInterface> = ({ files }) => {
  const [progress, setProgress] = useState<number>(0);
  const step = 100 / files.length;
  const dispatch = useAppDispatch();
  const seriesDispatch = useSeriesDispatch();

  async function loadWADOImages(files: File[]) {
    let imageIds: any[] = [];
    let items: any[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      imageIds.push(cornerstoneWADOImageLoader.wadouri.fileManager.add(file));
    }
    for (let i = 0; i < files.length; i++) {
      const image = await cornerstone.loadImage(imageIds[i]);
      const patientName = getDicomPatientName(image);

      const studyId = getDicomStudyId(image);
      const studyDate = getDicomStudyDate(image);
      const studyTime = getDicomStudyTime(image);
      const studyDescription = getDicomStudyDescription(image);

      const seriesDate = getDicomSeriesDate(image);
      const seriesTime = getDicomSeriesTime(image);
      const seriesDescription = getDicomSeriesDescription(image);
      const seriesNumber = getDicomSeriesNumber(image);

      const instanceNumber = getDicomInstanceNumber(image);
      const sliceDistance = getDicomSliceDistance(image);
      const echoNumber = getDicomEchoNumber(image);
      const sliceLocation = getDicomSliceLocation(image);
      const columns = getDicomColumns(image);
      const rows = getDicomRows(image);

      const studyDateTime =
        studyDate === undefined
          ? undefined
          : dicomDateTimeToLocale(`${studyDate}.${studyTime}`);

      const dicomInfo = {
        imageId: imageIds[i],
        instanceNumber: instanceNumber,
        name: files[i].name,
        image: image,
        rows: rows,
        columns: columns,
        sliceDistance: sliceDistance,
        sliceLocation: sliceLocation,
        patient: {
          patientName: patientName,
        },
        study: {
          studyId: studyId,
          studyDate: studyDate,
          studyTime: studyTime,
          studyDateTime: studyDateTime,
          studyDescription: studyDescription,
        },
        series: {
          seriesDate: seriesDate,
          seriesTime: seriesTime,
          seriesDescription: seriesDescription,
          seriesNumber: seriesNumber,
          echoNumber: echoNumber,
        },
      };

      items.push(dicomInfo);
      setProgress((prev) => prev + step);
    }
    items.sort((l, r) => {
      return l.instanceNumber - r.instanceNumber;
    });

    // series sort
    const allSeriesInfo = items
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.series.seriesNumber === value.series.seriesNumber
          )
      )
      .sort((a, b) => a.series.seriesNumber - b.series.seriesNumber);

    const currentSeries =
      allSeriesInfo.length > 0 ? allSeriesInfo[0].series.seriesNumber : 0;
    const seriesInfo = allSeriesInfo.map((series) => {
      return {
        seriesNumber: series.series.seriesNumber,
        seriesDescription: series.series.seriesDescription,
        countImages: items.filter(
          (item) => item.series.seriesNumber === series.series.seriesNumber
        ).length,
      };
    });

    seriesDispatch({
      type: "SET_CURRENT_SERIES",
      currentSeries: currentSeries,
    });
    seriesDispatch({ type: "SET_SERIES", series: seriesInfo });

    dispatch(setImages(items));

    setProgress(0);
  }

  useEffect(() => {
    loadWADOImages(files);
  }, [files]);

  return <Styled.ProgressBar progress={progress}></Styled.ProgressBar>;
};

export default ProgressBar;
