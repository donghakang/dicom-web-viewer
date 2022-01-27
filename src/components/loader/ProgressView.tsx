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
import { CornerstoneImageInterface } from "../../@types/CornerstoneImageInterface";

interface ProgressInterface {
  files: File[];
}


const ProgressView: React.FC<ProgressInterface> = ({ files }) => {
  const [progress, setProgress] = useState<number>(0);

  let imageIds: any[] = [];
  let items: any[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    imageIds.push(cornerstoneWADOImageLoader.wadouri.fileManager.add(file));
  }

  for (let i = 0; i < files.length; i++) {
    cornerstone.loadImage(imageIds[i]).then((image: any) => {
      console.log(image);
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

      // console.log("👷🏼‍♂️ DICOM INFO");
      // console.log(patientName);
      // console.log(studyId);
      // console.log(studyDate);
      // console.log(studyTime);
      // console.log(studyDescription);
      // console.log(seriesDate);
      // console.log(seriesTime);
      // console.log(seriesDescription);
      // console.log(seriesNumber);
      // console.log(instanceNumber);
      // console.log(sliceDistance);
      // console.log(echoNumber);
      // console.log(sliceLocation);
      // console.log(columns);
      // console.log(rows);

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
          patientName: patientName
        },
        study: {
          studyId: studyId,
          studyDate: studyDate,
          studyTime: studyTime,
          studyDateTime: studyDateTime,
          studyDescription: studyDescription
        },
        series: {
          seriesDate: seriesDate,
          seriesTime: seriesTime,
          seriesDescription: seriesDescription,
          seriesNumber: seriesNumber,
          echoNumber: echoNumber
        }
      }

      items.push(dicomInfo)
    });
  }

  // images.map((image) => {
  //   cornerstone.loadImage(image).then((img: any) => {
  //     console.log("⚠️", img);

  //     // const patientName = getDicomPatientName(image)

  //     // const studyId = getDicomStudyId(image)
  //     // const studyDate = getDicomStudyDate(image)
  //     // const studyTime = getDicomStudyTime(image)
  //     // const studyDescription = getDicomStudyDescription(image)

  //     // const seriesDate = getDicomSeriesDate(image)
  //     // const seriesTime = getDicomSeriesTime(image)
  //     // const seriesDescription = getDicomSeriesDescription(image)
  //     // const seriesNumber = getDicomSeriesNumber(image)

  //     // const instanceNumber = getDicomInstanceNumber(image)
  //     // const sliceDistance = getDicomSliceDistance(image)
  //     // const echoNumber = getDicomEchoNumber(image)
  //     // const sliceLocation = getDicomSliceLocation(image)
  //     // const columns = getDicomColumns(image)
  //     // const rows = getDicomRows(image)

  //     // const studyDateTime = studyDate === undefined ? undefined : dicomDateTimeToLocale(`${studyDate}.${studyTime}`)
  //   });
  // });

  return <div>Loading {progress}</div>;
};

export default ProgressView;
